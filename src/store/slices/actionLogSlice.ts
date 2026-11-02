// src/store/slices/actionLogSlice.ts
// El "Monitor Visual" de Redux: guarda un historial de las acciones despachadas por
// los otros slices para mostrarlas dentro de la app en <ReduxLiveInspector />.
//
// Bonus de arquitectura: este slice NO tiene reducers propios para registrar.
// Se alimenta solo con extraReducers + builder.addMatcher: cada vez que cualquier
// acción de stats/inventory pasa por el Store, este slice la "escucha" y la anota.
// Así ningún componente tiene que acordarse de escribir en el log.
import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  applyBuildPreset,
  decrementStat,
  healHero,
  incrementStat,
  resetStats,
  takeDamage,
} from './statsSlice';
import { clearEquipment, toggleEquipItem } from './inventorySlice';

export interface LogEntry {
  id: number; // consecutivo (puro, sin Date.now() dentro del reducer)
  type: string; // ej. "inventory/toggleEquipItem"
  payload: string | number | null;
}

export interface ActionLogState {
  entries: LogEntry[]; // la más reciente primero
  totalDispatched: number;
}

export const MAX_LOG_ENTRIES = 20;

const initialState: ActionLogState = {
  entries: [],
  totalDispatched: 0,
};

// Matcher: "¿esta acción viene de stats o de inventory?"
const isTrackedAction = isAnyOf(
  incrementStat,
  decrementStat,
  takeDamage,
  healHero,
  applyBuildPreset,
  resetStats,
  toggleEquipItem,
  clearEquipment,
);

const actionLogSlice = createSlice({
  name: 'actionLog',
  initialState,
  reducers: {
    // Botón "limpiar consola". No está en el matcher, así que no se registra a sí misma.
    clearLog(state) {
      state.entries = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isTrackedAction, (state, action) => {
      state.totalDispatched += 1;
      state.entries.unshift({
        id: state.totalDispatched,
        type: action.type,
        payload: action.payload ?? null,
      });
      if (state.entries.length > MAX_LOG_ENTRIES) {
        state.entries.length = MAX_LOG_ENTRIES;
      }
    });
  },
});

export const { clearLog } = actionLogSlice.actions;
export default actionLogSlice.reducer;
