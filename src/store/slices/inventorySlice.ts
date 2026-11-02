// src/store/slices/inventorySlice.ts
// Armería y equipamiento. Guarda SOLO datos primarios: el catálogo y los ids equipados.
// El peso total, la sobrecarga y los bonos totales NO se guardan aquí: son selectores.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ItemCategory = 'weapon' | 'shield' | 'armor' | 'boots' | 'accessory';

export interface Item {
  id: string;
  name: string;
  icon: string;
  category: ItemCategory;
  bonusStr: number;
  bonusAgi: number;
  bonusInt: number;
  weight: number; // kg
}

export interface InventoryState {
  catalog: Item[];
  equippedIds: string[];
}

// Catálogo inicial (8 ítems; el taller pide mínimo 6).
export const ITEM_CATALOG: Item[] = [
  { id: 'sword_fire', name: 'Espada de Fuego', icon: '🗡️', category: 'weapon', bonusStr: 5, bonusAgi: 0, bonusInt: 0, weight: 12 },
  { id: 'shield_titan', name: 'Escudo de Titanio', icon: '🛡️', category: 'shield', bonusStr: 4, bonusAgi: 0, bonusInt: 0, weight: 18 },
  { id: 'staff_arcane', name: 'Báculo Arcano', icon: '🔮', category: 'weapon', bonusStr: 0, bonusAgi: 0, bonusInt: 6, weight: 6 },
  { id: 'boots_elf', name: 'Botas Élficas', icon: '👢', category: 'boots', bonusStr: 0, bonusAgi: 5, bonusInt: 0, weight: 3 },
  { id: 'armor_cursed', name: 'Armadura Maldita', icon: '🦇', category: 'armor', bonusStr: 8, bonusAgi: 0, bonusInt: 0, weight: 30 },
  { id: 'dagger_shadow', name: 'Daga Sombría', icon: '🔪', category: 'weapon', bonusStr: 1, bonusAgi: 6, bonusInt: 0, weight: 4 },
  { id: 'nose_magic', name: 'Nariz de Hermenegildo', icon: '🤡', category: 'accessory', bonusStr: 0, bonusAgi: 2, bonusInt: 3, weight: 1 },
  { id: 'amulet_candy', name: 'Amuleto de Caramelo', icon: '🍬', category: 'accessory', bonusStr: 1, bonusAgi: 1, bonusInt: 4, weight: 2 },
];

const initialState: InventoryState = {
  catalog: ITEM_CATALOG,
  equippedIds: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // Si el id ya está en equippedIds lo quita; si no, lo agrega.
    // action.payload = id del ítem (string). Immer permite usar push/splice sobre el draft.
    toggleEquipItem(state, action: PayloadAction<string>) {
      const index = state.equippedIds.indexOf(action.payload);
      if (index >= 0) {
        state.equippedIds.splice(index, 1);
      } else if (state.catalog.some((item) => item.id === action.payload)) {
        state.equippedIds.push(action.payload);
      }
    },

    // Vacía todo el equipamiento activo de golpe.
    clearEquipment(state) {
      state.equippedIds = [];
    },
  },
});

export const { toggleEquipItem, clearEquipment } = inventorySlice.actions;

// Alias con el nombre que usa la tabla de la Zona C del enunciado (unequipAll).
export const unequipAll = clearEquipment;

export default inventorySlice.reducer;
