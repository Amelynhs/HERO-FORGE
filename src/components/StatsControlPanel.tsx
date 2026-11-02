// src/components/StatsControlPanel.tsx  —  ZONA B: Panel de Entrenamiento (Atributos)
// Solo DESPACHA acciones a statsSlice. No sabe nada del avatar ni de la armería.
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import StatBar from './StatBar';
import { useAppDispatch, useAppSelector } from '../store';
import { selectTotalStats } from '../store/selectors';
import {
  applyBuildPreset,
  BASE_STAT,
  BuildPreset,
  decrementStat,
  incrementStat,
  INITIAL_POINTS,
  MIN_STAT,
  resetStats,
  StatKey,
} from '../store/slices/statsSlice';
import { colors, radius, softShadow } from '../theme';

const BAR_MAX = BASE_STAT + INITIAL_POINTS; // 20: lo más alto que puede llegar un atributo base

const STAT_ROWS: { key: StatKey; label: string; color: string }[] = [
  { key: 'str', label: '💪 Fuerza (STR)', color: colors.str },
  { key: 'agi', label: '🏹 Agilidad (AGI)', color: colors.agi },
  { key: 'int', label: '📖 Inteligencia (INT)', color: colors.int },
];

const PRESETS: { key: BuildPreset; label: string; bg: string }[] = [
  { key: 'MAGE', label: '🔮 Build Mago', bg: colors.sky },
  { key: 'WARRIOR', label: '🛡️ Build Tanque', bg: colors.peach },
  { key: 'ROGUE', label: '🥷 Build Pícaro', bg: colors.mint },
];

export default function StatsControlPanel() {
  const dispatch = useAppDispatch();
  const stats = useAppSelector((state) => state.stats);
  const totals = useAppSelector(selectTotalStats);

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>🏋️ Panel de Entrenamiento</Text>
        <View style={styles.points}>
          <Text style={styles.pointsText}>✨ {stats.availablePoints} pts</Text>
        </View>
      </View>

      {STAT_ROWS.map(({ key, label, color }) => {
        const base = stats[key];
        const bonus = totals[key] - base;
        const canDecrease = base > MIN_STAT;
        const canIncrease = stats.availablePoints > 0;
        return (
          <View key={key} style={styles.statRow}>
            <Pressable
              disabled={!canDecrease}
              onPress={() => dispatch(decrementStat(key))}
              style={({ pressed }) => [
                styles.roundBtn,
                { backgroundColor: colors.rose },
                !canDecrease && styles.disabled,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.roundBtnText}>−</Text>
            </Pressable>

            <View style={styles.barBox}>
              <StatBar
                label={label}
                value={base}
                max={BAR_MAX}
                color={color}
                valueText={bonus > 0 ? `${base}  (+${bonus} equipo)` : `${base}`}
              />
            </View>

            <Pressable
              disabled={!canIncrease}
              onPress={() => dispatch(incrementStat(key))}
              style={({ pressed }) => [
                styles.roundBtn,
                { backgroundColor: colors.mint },
                !canIncrease && styles.disabled,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.roundBtnText}>+</Text>
            </Pressable>
          </View>
        );
      })}

      <View style={styles.presetRow}>
        {PRESETS.map(({ key, label, bg }) => (
          <Pressable
            key={key}
            onPress={() => dispatch(applyBuildPreset(key))}
            style={({ pressed }) => [styles.presetBtn, { backgroundColor: bg }, pressed && styles.pressed]}
          >
            <Text style={styles.presetText}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => dispatch(resetStats())}
        style={({ pressed }) => [styles.resetBtn, pressed && styles.pressed]}
      >
        <Text style={styles.resetText}>🧪 Poción de Reseteo (Reset)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 16,
    gap: 14,
    borderWidth: 2,
    borderColor: colors.peach,
    ...softShadow,
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 17, fontWeight: '800', color: colors.ink },
  points: {
    backgroundColor: colors.butter,
    borderColor: colors.butterDeep,
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  pointsText: { fontWeight: '800', color: '#17213A' },
  statRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  barBox: { flex: 1 },
  roundBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  roundBtnText: { fontSize: 22, fontWeight: '800', color: '#17213A', marginTop: -2 },
  disabled: { opacity: 0.35 },
  pressed: { transform: [{ scale: 0.95 }], opacity: 0.85 },
  presetRow: { flexDirection: 'row', gap: 8 },
  presetBtn: { flex: 1, borderRadius: radius.md, paddingVertical: 10, alignItems: 'center' },
  presetText: { fontSize: 12, fontWeight: '800', color: '#17213A', textAlign: 'center' },
  resetBtn: {
    backgroundColor: colors.lavender,
    borderRadius: radius.md,
    paddingVertical: 11,
    alignItems: 'center',
  },
  resetText: { fontWeight: '800', color: colors.ink },
});
