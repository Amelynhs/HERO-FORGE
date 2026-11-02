// src/store/selectors.ts
// REGLA DE ORO: ningún valor calculado vive en el State. Todo lo derivado se calcula aquí,
// cruzando statsSlice + inventorySlice (+ actionLogSlice para la consola).
//
// Los selectores usan createSelector (memoización de Reselect, incluida en RTK):
// si las entradas no cambian, devuelven el MISMO objeto y los componentes no se
// re-renderizan de más.
import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from './index';
import type { Item } from './slices/inventorySlice';
import { MAX_HP } from './slices/statsSlice';

// ───────────── Constantes de reglas del juego ─────────────
export const BASE_CAPACITY = 10; // capacidad = 10 + (Fuerza Total * 2)
export const CAPACITY_PER_STR = 2;
export const OVERLOAD_POWER_FACTOR = 0.7; // -30% de poder total si está sobrecargado
export const OVERLOAD_SPEED_FACTOR = 0.5; // -50% de velocidad si está sobrecargado
export const CLASS_THRESHOLD = 15; // stat total mínimo para que aparezca una clase
export const HEAVY_LOAD_KG = 30; // carga desde la que un Guerrero es "Tanque Pesado"
export const ENERGY_REFERENCE_MAX = 120; // solo para escalar la barra de energía

// ───────────── Tipos ─────────────
export type Level = 'ok' | 'warn' | 'danger';
export type HealthStatus = 'sano' | 'herido' | 'crítico' | 'derrotado';
export type HeroClassKey = 'villager' | 'berserker' | 'tank' | 'mage' | 'rogue';

export interface TotalStats {
  str: number;
  agi: number;
  int: number;
}

export interface HeroVisual {
  key: HeroClassKey;
  name: string;
  sprite: string;
  auraColor: string;
}

// ───────────── Selectores de entrada (baratos, sin cálculo) ─────────────
const selectStats = (state: RootState) => state.stats;
const selectCatalog = (state: RootState) => state.inventory.catalog;
const selectEquippedIds = (state: RootState) => state.inventory.equippedIds;
const selectLogEntries = (state: RootState) => state.actionLog.entries;

export const selectCurrentHp = (state: RootState) => state.stats.currentHp;
export const selectTotalDispatched = (state: RootState) => state.actionLog.totalDispatched;

const sumBy = (items: Item[], key: 'bonusStr' | 'bonusAgi' | 'bonusInt' | 'weight') =>
  items.reduce((acc, item) => acc + item[key], 0);

// ───────────── Equipamiento ─────────────
export const selectEquippedItems = createSelector(
  [selectCatalog, selectEquippedIds],
  (catalog, equippedIds) => catalog.filter((item) => equippedIds.includes(item.id)),
);

// Base (statsSlice) + bonos de los ítems equipados (inventorySlice).
export const selectTotalStats = createSelector(
  [selectStats, selectEquippedItems],
  (stats, equipped): TotalStats => ({
    str: stats.str + sumBy(equipped, 'bonusStr'),
    agi: stats.agi + sumBy(equipped, 'bonusAgi'),
    int: stats.int + sumBy(equipped, 'bonusInt'),
  }),
);

// ───────────── Peso y sobrecarga ─────────────
export const selectTotalWeight = createSelector([selectEquippedItems], (equipped) =>
  sumBy(equipped, 'weight'),
);

export const selectMaxCapacity = createSelector(
  [selectTotalStats],
  (totals) => BASE_CAPACITY + totals.str * CAPACITY_PER_STR,
);

export const selectIsOverencumbered = createSelector(
  [selectTotalWeight, selectMaxCapacity],
  (weight, capacity) => weight > capacity,
);

// Para la barra de Carga: verde (ok) → amarillo (cerca del límite) → rojo (sobrecarga).
export const selectWeightLoad = createSelector(
  [selectTotalWeight, selectMaxCapacity],
  (weight, capacity) => {
    const ratio = capacity > 0 ? weight / capacity : 0;
    const level: Level = ratio > 1 ? 'danger' : ratio >= 0.75 ? 'warn' : 'ok';
    return { weight, capacity, ratio, level };
  },
);

// ───────────── Poder, velocidad y energía ─────────────
export const selectCombatPower = createSelector(
  [selectTotalStats, selectIsOverencumbered],
  (totals, overloaded) => {
    const rawPower = totals.str * 3 + totals.agi * 2 + totals.int * 3;
    return overloaded ? Math.round(rawPower * OVERLOAD_POWER_FACTOR) : rawPower;
  },
);

export const selectSpeed = createSelector(
  [selectTotalStats, selectIsOverencumbered],
  (totals, overloaded) => {
    const rawSpeed = 10 + totals.agi * 2;
    return overloaded ? Math.round(rawSpeed * OVERLOAD_SPEED_FACTOR) : rawSpeed;
  },
);

// Reserva de energía/maná (capacidad derivada de AGI e INT; no se guarda un "maná actual").
export const selectEnergyPool = createSelector(
  [selectTotalStats],
  (totals) => 20 + totals.agi * 2 + totals.int * 3,
);

// ───────────── Aspecto visual del héroe ─────────────
// Estadística dominante = la mayor de las tres (empates: STR, luego INT, luego AGI).
// Si la dominante no llega a 15, el héroe sigue siendo un Aldeano.
// Con STR dominante, la carga decide: ligero = Berserker, pesado = Tanque.
export const selectHeroVisualClass = createSelector(
  [selectTotalStats, selectTotalWeight],
  (totals, weight): HeroVisual => {
    const dominant = Math.max(totals.str, totals.int, totals.agi);

    if (dominant < CLASS_THRESHOLD) {
      return { key: 'villager', name: 'Aldeano', sprite: '🧑‍🌾', auraColor: '#C9C3DB' };
    }
    if (totals.str === dominant) {
      return weight >= HEAVY_LOAD_KG
        ? { key: 'tank', name: 'Tanque Pesado', sprite: '🐻', auraColor: '#FFC38A' }
        : { key: 'berserker', name: 'Guerrero Berserker', sprite: '🦁', auraColor: '#FF8FA3' };
    }
    if (totals.int === dominant) {
      return { key: 'mage', name: 'Archimago', sprite: '🧙', auraColor: '#8EBBFF' };
    }
    return { key: 'rogue', name: 'Asesino Sombrío', sprite: '🥷', auraColor: '#7FDDB0' };
  },
);

// Id del arma en mano (el avatar dibuja su ilustración).
export const selectHeldWeaponId = createSelector(
  [selectEquippedItems],
  (equipped) => equipped.find((item) => item.category === 'weapon')?.id ?? null,
);

// Ícono del arma en mano: la primera arma equipada (o una mano vacía).
export const selectHeldWeaponIcon = createSelector(
  [selectEquippedItems],
  (equipped) => equipped.find((item) => item.category === 'weapon')?.icon ?? '✋',
);

// ───────────── Salud ─────────────
export const selectHeroHealth = createSelector([selectCurrentHp], (hp) => {
  const ratio = hp / MAX_HP;
  const status: HealthStatus =
    hp <= 0 ? 'derrotado' : hp <= 25 ? 'crítico' : hp < 60 ? 'herido' : 'sano';
  const level: Level = ratio > 0.6 ? 'ok' : ratio > 0.3 ? 'warn' : 'danger';
  return { hp, maxHp: MAX_HP, ratio, status, level };
});

export const selectIsDefeated = createSelector([selectCurrentHp], (hp) => hp <= 0);

// Expresión del avatar según salud, sobrecarga y clase (el avatar la dibuja en SVG).
export type HeroMood =
  | 'happy' | 'calm' | 'fierce' | 'smart' | 'smug' | 'strained' | 'hurt' | 'critical' | 'dead';

export const selectHeroFace = createSelector(
  [selectCurrentHp, selectIsOverencumbered, selectHeroVisualClass],
  (hp, overloaded, heroClass): HeroMood => {
    if (hp <= 0) return 'dead';
    if (hp <= 25) return 'critical';
    if (overloaded) return 'strained';
    if (hp < 60) return 'hurt';
    switch (heroClass.key) {
      case 'berserker':
        return 'fierce';
      case 'tank':
        return 'calm';
      case 'mage':
        return 'smart';
      case 'rogue':
        return 'smug';
      default:
        return 'happy';
    }
  },
);

// ───────────── Arena ─────────────
// Daño que devuelve el jefe: más AGILIDAD total = más esquiva (mínimo 4).
export const selectIncomingBossDamage = createSelector([selectTotalStats], (totals) =>
  Math.max(4, 22 - Math.floor(totals.agi / 2)),
);

// ───────────── Consola de Redux ─────────────
export interface DisplayAction {
  id: number;
  type: string;
  label: string;
}

// Las últimas 5 acciones. Si el payload es el id de un ítem, se muestra su nombre.
export const selectRecentActions = createSelector(
  [selectLogEntries, selectCatalog],
  (entries, catalog): DisplayAction[] =>
    entries.slice(0, 5).map((entry) => {
      let label = '(sin payload)';
      if (typeof entry.payload === 'string') {
        const item = catalog.find((candidate) => candidate.id === entry.payload);
        label = `"${item ? item.name : entry.payload}"`;
      } else if (typeof entry.payload === 'number') {
        label = String(entry.payload);
      }
      return { id: entry.id, type: entry.type, label };
    }),
);
