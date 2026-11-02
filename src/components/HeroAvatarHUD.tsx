// src/components/HeroAvatarHUD.tsx  —  ZONA A: Avatar & HUD superior
// No tiene botones ni recibe props: solo LEE el Store mediante selectores derivados
// y reacciona en vivo a lo que se despache en cualquier otra zona.
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import HeroArt from '../art/HeroArt';
import SceneArt from '../art/SceneArt';
import StatBar from './StatBar';
import { useAppSelector } from '../store';
import {
  ENERGY_REFERENCE_MAX,
  selectCombatPower,
  selectEnergyPool,
  selectHeldWeaponId,
  selectHeroFace,
  selectHeroHealth,
  selectHeroVisualClass,
  selectIsOverencumbered,
  selectSpeed,
  selectTotalStats,
  selectWeightLoad,
} from '../store/selectors';
import { colors, levelColors, radius, softShadow } from '../theme';

export default function HeroAvatarHUD() {
  const heroClass = useAppSelector(selectHeroVisualClass);
  const face = useAppSelector(selectHeroFace);
  const weaponId = useAppSelector(selectHeldWeaponId);
  const health = useAppSelector(selectHeroHealth);
  const energy = useAppSelector(selectEnergyPool);
  const load = useAppSelector(selectWeightLoad);
  const overloaded = useAppSelector(selectIsOverencumbered);
  const power = useAppSelector(selectCombatPower);
  const speed = useAppSelector(selectSpeed);
  const totals = useAppSelector(selectTotalStats);

  // Aura que "respira" todo el tiempo + "pop" cada vez que cambia la clase.
  const pulse = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1400, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1400, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  useEffect(() => {
    pop.setValue(0.6);
    Animated.spring(pop, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  }, [heroClass.key, pop]);

  const bob = pulse.interpolate({ inputRange: [0, 1], outputRange: [0, -4] });
  const auraScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] });
  const defeated = health.status === 'derrotado';

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.avatarBox, { borderColor: heroClass.auraColor }]}>
          <View style={StyleSheet.absoluteFill}>
            <SceneArt scene="forest" width="100%" height="100%" />
          </View>
          <Animated.View
            style={[
              styles.aura,
              {
                backgroundColor: `${heroClass.auraColor}55`,
                borderColor: heroClass.auraColor,
                transform: [{ scale: auraScale }],
              },
            ]}
          />
          <Animated.View style={{ opacity: defeated ? 0.55 : 1, transform: [{ translateY: bob }, { scale: pop }, { rotate: defeated ? '-80deg' : '0deg' }] }}>
            <HeroArt klass={heroClass.key} mood={face} weaponId={weaponId} size={104} />
          </Animated.View>
          <Text style={styles.sparkleTop}>✦</Text>
          <Text style={styles.sparkleSide}>✧</Text>
        </View>
        <View style={styles.info}>
          <View style={[styles.badge, { backgroundColor: heroClass.auraColor }]}>
            <Text style={styles.badgeText}>{heroClass.name}</Text>
          </View>
          <Text style={styles.line}>⚔️ Poder de combate: <Text style={styles.strong}>{power}</Text></Text>
          <Text style={styles.line}>💨 Velocidad: <Text style={styles.strong}>{speed}</Text></Text>
          <View style={styles.chips}>
            <Text style={[styles.chip, { backgroundColor: colors.str }]}>STR {totals.str}</Text>
            <Text style={[styles.chip, { backgroundColor: colors.agi }]}>AGI {totals.agi}</Text>
            <Text style={[styles.chip, { backgroundColor: colors.int }]}>INT {totals.int}</Text>
          </View>
          <Text style={styles.status}>Estado: {health.status}</Text>
        </View>
      </View>

      <View style={styles.bars}>
        <StatBar
          label="❤️ Vida (HP)"
          value={health.hp}
          max={health.maxHp}
          color={levelColors[health.level]}
        />
        <StatBar
          label="✨ Energía / Maná"
          value={energy}
          max={ENERGY_REFERENCE_MAX}
          color={colors.skyDeep}
          valueText={`${energy}`}
        />
        <StatBar
          label="🎒 Carga de peso"
          value={load.weight}
          max={load.capacity}
          color={levelColors[load.level]}
          valueText={`${load.weight} / ${load.capacity} kg`}
        />
      </View>

      {overloaded && (
        <View style={styles.alert}>
          <Text style={styles.alertText}>¡SOBRECARGADO! (-50% Velocidad · -30% Poder)</Text>
        </View>
      )}
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
    borderColor: colors.lavender,
    ...softShadow,
  },
  topRow: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  avatarBox: { width: 136, height: 156, borderRadius: 20, borderWidth: 3, overflow: 'hidden', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 6, backgroundColor: '#2A2145' },
  aura: {
    position: 'absolute',
    bottom: 22,
    width: 118,
    height: 118,
    borderRadius: 59,
    borderWidth: 3,
  },
  portraitBackdrop: {
    width: 104, height: 104, borderRadius: 52, backgroundColor: '#3B345B',
    borderWidth: 2, borderColor: '#A99AE0', alignItems: 'center', justifyContent: 'center',
    overflow: 'visible',
  },
  sprite: { fontSize: 62, zIndex: 2, textShadowColor: '#F5D7FF', textShadowRadius: 12 },
  sparkleTop: { position: 'absolute', top: 8, right: 14, color: '#FFE7A8', fontSize: 17, zIndex: 3 },
  sparkleSide: { position: 'absolute', left: 10, top: 38, color: '#BFE7FF', fontSize: 18, zIndex: 3 },
  portraitBase: { position: 'absolute', bottom: 9, width: 57, height: 12, borderRadius: 20, backgroundColor: '#A99AE0', opacity: 0.55 },
  bubble: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.lavender,
  },
  weaponBubble: { left: -2, bottom: 2 },
  faceBubble: { right: -2, bottom: 2 },
  bubbleText: { fontSize: 20 },
  info: { flex: 1, gap: 6 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  badgeText: { fontSize: 14, fontWeight: '800', color: '#17213A' },
  line: { fontSize: 13, color: colors.inkSoft },
  strong: { fontWeight: '800', color: '#F1F3FF' },
  chips: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  chip: {
    fontSize: 11,
    fontWeight: '800',
    color: '#17213A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
  status: { fontSize: 12, color: colors.inkSoft, textTransform: 'capitalize' },
  bars: { gap: 10 },
  alert: {
    backgroundColor: colors.rose,
    borderColor: colors.roseDeep,
    borderWidth: 2,
    borderRadius: radius.md,
    paddingVertical: 8,
    alignItems: 'center',
  },
  alertText: { color: '#B3365A', fontWeight: '800', fontSize: 13 },
});
