// Zona D: Arena de combate + Inspector Redux.
// El estado del jefe se mantiene local porque solo esta zona lo utiliza.
// La vida del héroe sí pertenece a Redux porque otras zonas también la observan.
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';

import BossArt, { BossId } from '../art/BossArt';
import HeroArt from '../art/HeroArt';
import SceneArt, { SceneId } from '../art/SceneArt';
import StatBar from './StatBar';
import { useAppDispatch, useAppSelector } from '../store';
import {
  selectCombatPower,
  selectHeldWeaponId,
  selectHeroFace,
  selectHeroHealth,
  selectIncomingBossDamage,
  selectIsDefeated,
  selectHeroVisualClass,
  selectRecentActions,
  selectTotalDispatched,
} from '../store/selectors';
import { clearLog } from '../store/slices/actionLogSlice';
import { healHero, takeDamage } from '../store/slices/statsSlice';
import { levelColors, monoFont, softShadow } from '../theme';

// Jefes de ejemplo para variar el combate. Cada uno tiene su vida, su dibujo y su escenario;
// solo la Zona D los necesita, por eso viven en estado local y no en Redux.
const BOSSES: { name: string; art: BossId; scene: SceneId; maxHp: number; title: string; tint: string }[] = [
  { name: 'Dragón Algodón de Azúcar', art: 'dragon', scene: 'forest', maxHp: 220, title: 'GUARDIÁN DEL BOSQUE', tint: '#F2B7C8' },
  { name: 'Gólem de Obsidiana', art: 'golem', scene: 'cave', maxHp: 300, title: 'TITÁN DE PIEDRA', tint: '#B7B2D9' },
  { name: 'Reina Araña Umbría', art: 'spider', scene: 'swamp', maxHp: 260, title: 'SEÑORA DE LAS TELARAÑAS', tint: '#C7B3E8' },
  { name: 'Fénix Carmesí', art: 'phoenix', scene: 'volcano', maxHp: 240, title: 'AVE DEL RENACER', tint: '#F4C18F' },
];

const HERO_W = 104;
const BOSS_W = 124;
const SIDE = 12;
const STAGE_H = 210;

export default function ReduxLiveInspector() {
  const dispatch = useAppDispatch();
  const combatPower = useAppSelector(selectCombatPower);
  const bossDamage = useAppSelector(selectIncomingBossDamage);
  const defeated = useAppSelector(selectIsDefeated);
  const health = useAppSelector(selectHeroHealth);
  const heroVisual = useAppSelector(selectHeroVisualClass);
  const heroMood = useAppSelector(selectHeroFace);
  const weaponId = useAppSelector(selectHeldWeaponId);
  const recent = useAppSelector(selectRecentActions);
  const totalDispatched = useAppSelector(selectTotalDispatched);

  const [bossIndex, setBossIndex] = useState(0);
  const [bossHp, setBossHp] = useState(BOSSES[0].maxHp);
  const [collapsed, setCollapsed] = useState(false);
  const [roundText, setRoundText] = useState('Un enemigo se interpone en tu camino.');
  const [bossLabel, setBossLabel] = useState('');
  const [heroLabel, setHeroLabel] = useState('');
  const [stageW, setStageW] = useState(300);
  const boss = BOSSES[bossIndex];
  const bossDown = bossHp <= 0;

  // Valores animados (todo con native driver: transform y opacity).
  const heroX = useRef(new Animated.Value(0)).current;
  const heroY = useRef(new Animated.Value(0)).current;
  const heroShake = useRef(new Animated.Value(0)).current;
  const bossX = useRef(new Animated.Value(0)).current;
  const bossShake = useRef(new Animated.Value(0)).current;
  const bossDeath = useRef(new Animated.Value(0)).current;
  const hitFlash = useRef(new Animated.Value(0)).current;
  const redFlash = useRef(new Animated.Value(0)).current;
  const stageShake = useRef(new Animated.Value(0)).current;
  const slash = useRef(new Animated.Value(0)).current;
  const bossLabelY = useRef(new Animated.Value(0)).current;
  const bossLabelO = useRef(new Animated.Value(0)).current;
  const heroLabelY = useRef(new Animated.Value(0)).current;
  const heroLabelO = useRef(new Animated.Value(0)).current;
  const idle = useRef(new Animated.Value(0)).current;
  const attackLock = useRef(false);

  // Respiración de los dos luchadores mientras esperan.
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(idle, { toValue: 1, duration: 1100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(idle, { toValue: 0, duration: 1100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [idle]);

  const floatLabel = (y: Animated.Value, o: Animated.Value) => {
    y.setValue(0);
    o.setValue(1);
    Animated.parallel([
      Animated.timing(y, { toValue: -54, duration: 820, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.sequence([Animated.delay(480), Animated.timing(o, { toValue: 0, duration: 340, useNativeDriver: true })]),
    ]).start();
  };

  const shake = (v: Animated.Value, amp: number) =>
    Animated.sequence([
      Animated.timing(v, { toValue: amp, duration: 45, useNativeDriver: true }),
      Animated.timing(v, { toValue: -amp, duration: 70, useNativeDriver: true }),
      Animated.timing(v, { toValue: amp * 0.6, duration: 60, useNativeDriver: true }),
      Animated.timing(v, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]);

  // Distancia que recorre cada luchador hasta quedar casi cara a cara.
  const gap = Math.max(40, stageW - SIDE * 2 - HERO_W - BOSS_W);
  const dash = gap * 0.9;

  const handleAttack = () => {
    if (defeated || bossDown || attackLock.current) return;
    attackLock.current = true;
    const dealt = combatPower;
    const nextBossHp = Math.max(0, bossHp - dealt);
    const counter = bossDamage;
    setRoundText('¡Al ataque!');

    // 1) El héroe se agacha, embiste y golpea.
    Animated.sequence([
      Animated.timing(heroX, { toValue: -14, duration: 110, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(heroX, { toValue: dash, duration: 170, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
        Animated.sequence([
          Animated.timing(heroY, { toValue: -22, duration: 85, useNativeDriver: true }),
          Animated.timing(heroY, { toValue: 0, duration: 85, useNativeDriver: true }),
        ]),
      ]),
    ]).start(() => {
      // 2) Impacto: tajo, destello, sacudida y número de daño. Aquí baja la vida del jefe.
      setBossHp(nextBossHp);
      setBossLabel(`-${dealt}`);
      floatLabel(bossLabelY, bossLabelO);
      setRoundText(nextBossHp === 0 ? `¡${boss.name} ha sido derrotado!` : `Golpeaste por ${dealt} puntos de daño.`);
      slash.setValue(0);
      Animated.parallel([
        Animated.timing(slash, { toValue: 1, duration: 260, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        shake(bossShake, 14),
        shake(stageShake, 5),
        Animated.sequence([
          Animated.timing(hitFlash, { toValue: 0.85, duration: 50, useNativeDriver: true }),
          Animated.timing(hitFlash, { toValue: 0, duration: 240, useNativeDriver: true }),
        ]),
        nextBossHp === 0
          ? Animated.timing(bossDeath, { toValue: 1, duration: 650, delay: 120, easing: Easing.in(Easing.quad), useNativeDriver: true })
          : Animated.delay(300),
      ]).start(() => {
        // 3) El héroe vuelve a su sitio.
        Animated.timing(heroX, { toValue: 0, duration: 190, easing: Easing.out(Easing.quad), useNativeDriver: true }).start(() => {
          if (nextBossHp === 0) {
            attackLock.current = false;
            return;
          }
          // 4) Contraataque: el jefe embiste al héroe y se despacha takeDamage (Redux).
          Animated.sequence([
            Animated.timing(bossX, { toValue: 14, duration: 120, useNativeDriver: true }),
            Animated.timing(bossX, { toValue: -dash, duration: 180, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
          ]).start(() => {
            dispatch(takeDamage(counter));
            setHeroLabel(`-${counter}`);
            floatLabel(heroLabelY, heroLabelO);
            setRoundText(`El jefe contraatacó: recibiste ${counter} de daño.`);
            Animated.parallel([
              shake(heroShake, 12),
              shake(stageShake, 6),
              Animated.sequence([
                Animated.timing(redFlash, { toValue: 0.55, duration: 60, useNativeDriver: true }),
                Animated.timing(redFlash, { toValue: 0, duration: 300, useNativeDriver: true }),
              ]),
              Animated.timing(heroX, { toValue: -16, duration: 90, useNativeDriver: true }),
            ]).start(() => {
              Animated.parallel([
                Animated.timing(bossX, { toValue: 0, duration: 220, easing: Easing.out(Easing.quad), useNativeDriver: true }),
                Animated.timing(heroX, { toValue: 0, duration: 220, useNativeDriver: true }),
              ]).start(() => {
                attackLock.current = false;
              });
            });
          });
        });
      });
    });
  };

  const handleNextBoss = () => {
    const nextIndex = (bossIndex + 1) % BOSSES.length;
    bossDeath.setValue(0);
    setBossIndex(nextIndex);
    setBossHp(BOSSES[nextIndex].maxHp);
    setRoundText(`${BOSSES[nextIndex].name} entra en la arena.`);
    setBossLabel('');
    setHeroLabel('');
  };

  const onStageLayout = (e: LayoutChangeEvent) => setStageW(e.nativeEvent.layout.width);
  const idleY = idle.interpolate({ inputRange: [0, 1], outputRange: [0, -3] });
  const idleYBoss = idle.interpolate({ inputRange: [0, 1], outputRange: [-2, 2] });
  const slashScale = slash.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1.35] });
  const slashOpacity = slash.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, 1, 0] });
  const deathOpacity = bossDeath.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const deathY = bossDeath.interpolate({ inputRange: [0, 1], outputRange: [0, 38] });
  const deathScale = bossDeath.interpolate({ inputRange: [0, 1], outputRange: [1, 0.6] });

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeading}>
        <View>
          <Text style={styles.eyebrow}>ZONA D · SIMULACIÓN</Text>
          <Text style={styles.title}>⚔ Arena de combate</Text>
        </View>
        <View style={styles.bossCounter}><Text style={styles.bossCounterText}>{bossIndex + 1}/{BOSSES.length}</Text></View>
      </View>

      {!collapsed && (
        <>
          <View style={styles.arena}>
            <Animated.View
              onLayout={onStageLayout}
              style={[styles.battleStage, { transform: [{ translateX: stageShake }] }]}
            >
              <View style={StyleSheet.absoluteFill}>
                <SceneArt scene={boss.scene} width="100%" height="100%" />
              </View>

              <View style={styles.banner}>
                <Text style={styles.bannerText}>{boss.title}</Text>
              </View>

              {/* Héroe */}
              <Animated.View
                style={[
                  styles.heroSlot,
                  {
                    opacity: defeated ? 0.6 : 1,
                    transform: [{ translateX: heroX }, { translateX: heroShake }, { translateY: heroY }, { translateY: idleY }, { rotate: defeated ? '-82deg' : '0deg' }],
                  },
                ]}
              >
                <HeroArt klass={heroVisual.key} mood={heroMood} weaponId={weaponId} size={HERO_W} />
              </Animated.View>

              {/* Jefe */}
              <Animated.View
                style={[
                  styles.bossSlot,
                  {
                    opacity: deathOpacity,
                    transform: [{ translateX: bossX }, { translateX: bossShake }, { translateY: idleYBoss }, { translateY: deathY }, { scale: deathScale }],
                  },
                ]}
              >
                <BossArt id={boss.art} size={BOSS_W} />
              </Animated.View>

              {/* Tajo en el punto de impacto */}
              <Animated.View
                pointerEvents="none"
                style={[styles.slash, { right: SIDE + BOSS_W * 0.2, opacity: slashOpacity, transform: [{ scale: slashScale }, { rotate: '-28deg' }] }]}
              >
                <View style={styles.slashLine} />
                <View style={[styles.slashLine, styles.slashLineThin]} />
              </Animated.View>

              {/* Números de daño */}
              <Animated.Text
                pointerEvents="none"
                style={[styles.damageFloat, { right: SIDE + 26, opacity: bossLabelO, transform: [{ translateY: bossLabelY }] }]}
              >
                {bossLabel}
              </Animated.Text>
              <Animated.Text
                pointerEvents="none"
                style={[styles.damageFloat, styles.heroDamage, { left: SIDE + 30, opacity: heroLabelO, transform: [{ translateY: heroLabelY }] }]}
              >
                {heroLabel}
              </Animated.Text>

              <Animated.View pointerEvents="none" style={[styles.flash, { opacity: hitFlash }]} />
              <Animated.View pointerEvents="none" style={[styles.flash, { backgroundColor: '#FF3B5C', opacity: redFlash }]} />

              {bossDown && (
                <View style={styles.victory} pointerEvents="none">
                  <Text style={styles.victoryText}>¡VICTORIA!</Text>
                </View>
              )}
              {defeated && (
                <View style={styles.victory} pointerEvents="none">
                  <Text style={[styles.victoryText, { color: '#FF9DB0' }]}>HÉROE DERROTADO</Text>
                </View>
              )}
            </Animated.View>

            <View style={styles.bossDetails}>
              <View style={styles.bossNameRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.bossTitle}>JEFE {bossIndex + 1}</Text>
                  <Text style={styles.bossName}>{boss.name}</Text>
                </View>
                <Text style={styles.hpNumber}>{bossHp} / {boss.maxHp}</Text>
              </View>
              <StatBar label="❤ VIDA DEL JEFE" value={bossHp} max={boss.maxHp} color="#F05D7A" height={13} />
              <Text style={styles.combatMessage}>{bossDown ? 'Victoria. El camino queda libre.' : roundText}</Text>
            </View>
            <View style={styles.combatStats}>
              <View style={styles.combatStat}><Text style={styles.combatStatLabel}>Tu daño</Text><Text style={styles.combatStatValue}>{combatPower}</Text></View>
              <View style={styles.combatStat}><Text style={styles.combatStatLabel}>Contraataque</Text><Text style={styles.combatStatValue}>{bossDamage}</Text></View>
              <View style={styles.combatStat}><Text style={styles.combatStatLabel}>Tu vida</Text><Text style={styles.combatStatValue}>{health.hp}/{health.maxHp}</Text></View>
            </View>
            <View style={styles.buttons}>
              {bossDown ? (
                <Pressable style={[styles.btn, styles.nextBtn]} onPress={handleNextBoss}><Text style={styles.btnText}>SIGUIENTE JEFE ▶</Text></Pressable>
              ) : (
                <Pressable disabled={defeated} style={({ pressed }) => [styles.btn, styles.attackBtn, (defeated || pressed) && styles.dim]} onPress={handleAttack}>
                  <Text style={styles.btnText}>{defeated ? 'HÉROE DERROTADO' : `⚔ ATACAR · ${combatPower} DMG`}</Text>
                </Pressable>
              )}
              <Pressable style={({ pressed }) => [styles.btn, styles.healBtn, pressed && styles.dim]} onPress={() => dispatch(healHero())}><Text style={styles.btnText}>✚ CURAR</Text></Pressable>
            </View>
          </View>
          <View style={styles.heroHp}>
            <View style={[styles.hpDot, { backgroundColor: levelColors[health.level] }]} />
            <Text style={styles.heroHpText}>Estado del héroe: {health.hp}/{health.maxHp} HP · {health.status}</Text>
          </View>
        </>
      )}

      {/* Consola Visual de Redux: últimas 5 acciones con type y payload (lee actionLogSlice). */}
      <View style={styles.console}>
        <View style={styles.consoleHeader}>
          <Text style={styles.consoleTitle}>REDUX · CONSOLA EN VIVO</Text>
          <Text style={styles.consoleCount}>{totalDispatched} acciones</Text>
        </View>
        {recent.length === 0 ? (
          <Text style={styles.consoleEmpty}>Esperando acciones del héroe...</Text>
        ) : (
          recent.map((entry) => (
            <Text key={entry.id} style={styles.consoleRow} numberOfLines={1}>
              [{entry.type}] → {entry.label}
            </Text>
          ))
        )}
        <Pressable onPress={() => dispatch(clearLog())}>
          <Text style={styles.consoleClear}>LIMPIAR</Text>
        </Pressable>
      </View>

      <Pressable style={styles.collapseButton} onPress={() => setCollapsed((value) => !value)}>
        <Text style={styles.collapseText}>{collapsed ? '▲ Mostrar arena' : '▼ Ocultar arena'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#10182B', borderRadius: 22, borderWidth: 1, borderColor: '#38476B', padding: 13, gap: 10, ...softShadow },
  console: { backgroundColor: '#0B1020', borderRadius: 13, borderWidth: 1, borderColor: '#35496F', padding: 10, gap: 4 },
  consoleHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  consoleTitle: { color: '#8DE0B9', fontSize: 9, fontWeight: '900', letterSpacing: 1.4 },
  consoleCount: { color: '#9FB5E5', fontSize: 9 },
  consoleEmpty: { color: '#9FB5E5', fontSize: 11 },
  consoleRow: { color: '#E6EEFF', fontSize: 10, fontFamily: monoFont },
  consoleClear: { color: '#F4B5C7', fontSize: 9, fontWeight: '900', textAlign: 'right', marginTop: 2 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  eyebrow: { color: '#8EA2D2', fontSize: 9, fontWeight: '900', letterSpacing: 2 },
  title: { color: '#F4F0FF', fontSize: 20, fontWeight: '900' },
  bossCounter: { backgroundColor: '#293653', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: '#6478A8' },
  bossCounterText: { color: '#DCE5FF', fontWeight: '900' },
  arena: { backgroundColor: '#18243D', borderRadius: 17, borderWidth: 1, borderColor: '#35496F', overflow: 'hidden', padding: 11, gap: 10 },
  arenaTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  arenaLabel: { color: '#9FB5E5', fontSize: 9, fontWeight: '900', letterSpacing: 1.4 },
  difficulty: { color: '#FFC77D', fontSize: 9, fontWeight: '900' },
  battleStage: { height: STAGE_H, borderRadius: 14, overflow: 'hidden', borderWidth: 2, borderColor: '#6A5FA8', backgroundColor: '#2A2145' },
  stageGlow: { position: 'absolute', width: 190, height: 190, borderRadius: 95, backgroundColor: '#596C9A', opacity: 0.16 },
  fighter: { width: '32%', alignItems: 'center', justifyContent: 'center', gap: 3 },
  heroPortrait: { width: 82, height: 82, borderRadius: 41, backgroundColor: '#A9A0E233', borderWidth: 2, borderColor: '#BEB1F0', alignItems: 'center', justifyContent: 'center' },
  bossPortrait: { width: 90, height: 90, borderRadius: 45, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  heroSprite: { fontSize: 56 },
  bossSprite: { fontSize: 61 },
  portraitRune: { position: 'absolute', top: 3, right: 12, color: '#FFE4A6', fontSize: 15 },
  fighterName: { color: '#B8C7E8', fontSize: 9, fontWeight: '900', letterSpacing: 1.5 },
  vs: { color: '#F7C979', fontSize: 13, fontWeight: '900', fontStyle: 'italic' },
  damageFloat: { position: 'absolute', top: 70, color: '#FFE28A', fontSize: 30, fontWeight: '900', textShadowColor: '#2A2145', textShadowRadius: 6, textShadowOffset: { width: 0, height: 2 } },
  flash: { ...StyleSheet.absoluteFill, backgroundColor: '#FFFFFF' },
  heroSlot: { position: 'absolute', left: SIDE, bottom: 10, width: HERO_W },
  bossSlot: { position: 'absolute', right: SIDE, bottom: 10, width: BOSS_W },
  banner: { position: 'absolute', top: 8, alignSelf: 'center', backgroundColor: 'rgba(30,22,60,0.72)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 4, borderWidth: 1, borderColor: '#F6C253' },
  bannerText: { color: '#FFE28A', fontSize: 9, fontWeight: '900', letterSpacing: 1.6 },
  slash: { position: 'absolute', bottom: 62, width: 90, height: 90, alignItems: 'center', justifyContent: 'center' },
  slashLine: { position: 'absolute', width: 96, height: 9, borderRadius: 6, backgroundColor: '#FFFFFF', shadowColor: '#FFE28A', shadowOpacity: 1, shadowRadius: 10, elevation: 8 },
  slashLineThin: { width: 70, height: 4, top: 44, backgroundColor: '#FFE28A', transform: [{ rotate: '8deg' }] },
  heroDamage: { color: '#FF5A7A' },
  victory: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(20,12,45,0.35)' },
  victoryText: { color: '#FFE28A', fontSize: 28, fontWeight: '900', letterSpacing: 3, textShadowColor: '#2A2145', textShadowRadius: 8, textShadowOffset: { width: 0, height: 2 } },
  bossDetails: { gap: 5 },
  bossNameRow: { flexDirection: 'row', alignItems: 'center' },
  bossTitle: { color: '#E7B979', fontSize: 9, fontWeight: '900', letterSpacing: 1.3 },
  bossName: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
  hpNumber: { color: '#E4E9F8', fontWeight: '900', fontSize: 12 },
  combatMessage: { color: '#B8C7E8', fontSize: 11, fontWeight: '600' },
  combatStats: { flexDirection: 'row', gap: 7 },
  combatStat: { flex: 1, backgroundColor: '#253451', borderRadius: 10, paddingVertical: 7, alignItems: 'center', gap: 1 },
  combatStatIcon: { fontSize: 15 },
  combatStatLabel: { color: '#A8B7D6', fontSize: 9, fontWeight: '700' },
  combatStatValue: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
  buttons: { flexDirection: 'row', gap: 8 },
  btn: { flex: 1, borderRadius: 11, paddingVertical: 12, alignItems: 'center', justifyContent: 'center' },
  attackBtn: { backgroundColor: '#D94D70' },
  healBtn: { backgroundColor: '#65C99D', flex: 0.65 },
  nextBtn: { backgroundColor: '#D8A94F' },
  btnText: { color: '#11182B', fontSize: 12, fontWeight: '900' },
  dim: { opacity: 0.65, transform: [{ scale: 0.98 }] },
  heroHp: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  hpDot: { width: 8, height: 8, borderRadius: 4 },
  heroHpText: { color: '#B7C4E0', fontSize: 11, fontWeight: '700' },
  collapseButton: { alignSelf: 'center', paddingVertical: 1 },
  collapseText: { color: '#8496BA', fontSize: 9, fontWeight: '800' },
});
