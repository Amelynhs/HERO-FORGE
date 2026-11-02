// src/store/slices/statsSlice.ts
// Atributos y estado vital del héroe.
//
// Nota sobre Immer: dentro de createSlice los reducers "parecen" mutar el estado
// (state.str += 1), pero RTK los envuelve con Immer: recibimos un draft (Proxy),
// Immer registra los cambios y produce un objeto NUEVO e inmutable al final.
// Por eso aquí no hace falta { ...state, str: state.str + 1 }.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StatKey = 'str' | 'agi' | 'int';
export type BuildPreset = 'WARRIOR' | 'MAGE' | 'ROGUE';

export const MAX_HP = 100;
export const BASE_STAT = 5;
export const MIN_STAT = 1;
export const INITIAL_POINTS = 15;

export interface StatsState {
  availablePoints: number;
  str: number;
  agi: number;
  int: number;
  currentHp: number;
}

const initialState: StatsState = {
  availablePoints: INITIAL_POINTS,
  str: BASE_STAT,
  agi: BASE_STAT,
  int: BASE_STAT,
  currentHp: MAX_HP,
};

// Cómo se reparten los 15 puntos en cada build (suman 15 en todos los casos).
// Un preset deja a la clase dominante exactamente en 15 para activar su aspecto visual.
export const PRESET_DISTRIBUTION: Record<BuildPreset, Record<StatKey, number>> = {
  WARRIOR: { str: 10, agi: 3, int: 2 },
  MAGE: { str: 2, agi: 3, int: 10 },
  ROGUE: { str: 2, agi: 10, int: 3 },
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    // Resta 1 a availablePoints y suma 1 al atributo (solo si hay puntos disponibles).
    incrementStat(state, action: PayloadAction<StatKey>) {
      if (state.availablePoints <= 0) return;
      state.availablePoints -= 1;
      state[action.payload] += 1;
    },

    // Suma 1 a availablePoints y resta 1 al atributo (ningún atributo base baja de 1).
    decrementStat(state, action: PayloadAction<StatKey>) {
      if (state[action.payload] <= MIN_STAT) return;
      state.availablePoints += 1;
      state[action.payload] -= 1;
    },

    // El payload es el daño recibido; el HP nunca baja de 0 (héroe derrotado).
    takeDamage(state, action: PayloadAction<number>) {
      const damage = Math.max(0, action.payload);
      state.currentHp = Math.max(0, state.currentHp - damage);
    },

    // Poción de curación: vuelve a HP máximo (también "revive" al héroe derrotado).
    healHero(state) {
      state.currentHp = MAX_HP;
    },

    // Una sola acción reasigna los 15 puntos y transforma toda la interfaz.
    applyBuildPreset(state, action: PayloadAction<BuildPreset>) {
      const plan = PRESET_DISTRIBUTION[action.payload];
      state.str = BASE_STAT + plan.str;
      state.agi = BASE_STAT + plan.agi;
      state.int = BASE_STAT + plan.int;
      state.availablePoints = 0;
    },

    // Poción de Reseteo: atributos base y 15 puntos de nuevo disponibles.
    resetStats(state) {
      state.str = BASE_STAT;
      state.agi = BASE_STAT;
      state.int = BASE_STAT;
      state.availablePoints = INITIAL_POINTS;
    },
  },
});

export const {
  incrementStat,
  decrementStat,
  takeDamage,
  healHero,
  applyBuildPreset,
  resetStats,
} = statsSlice.actions;

// Alias con el nombre que usa la tabla de la Zona B del enunciado (applyPreset).
export const applyPreset = applyBuildPreset;

export default statsSlice.reducer;
