// src/components/StatBar.tsx
// Barra animada puramente presentacional (recibe todo por props de su padre directo).
// No es una "zona": es una pieza reutilizable dentro de las zonas.
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '../theme';

interface Props {
  label: string;
  value: number;
  max: number;
  color: string;
  valueText?: string;
  height?: number;
}

export default function StatBar({ label, value, max, color, valueText, height = 14 }: Props) {
  const progress = useRef(new Animated.Value(0)).current;
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: ratio,
      duration: 450,
      useNativeDriver: false, // animamos "width", que no soporta driver nativo
    }).start();
  }, [ratio, progress]);

  const width = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{valueText ?? `${value} / ${max}`}</Text>
      </View>
      <View style={[styles.track, { height }]}>
        <Animated.View style={[styles.fill, { width, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 4 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 12, fontWeight: '700', color: colors.ink },
  value: { fontSize: 12, fontWeight: '600', color: colors.inkSoft },
  track: {
    backgroundColor: colors.lavender,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: radius.sm },
});
