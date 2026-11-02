// Hermenegildo: NPC original construido con formas nativas de React Native (sin emoji).
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import ClownArt, { ClownMood } from '../art/ClownArt';
import { useAppSelector } from '../store';
import {
  selectHeroHealth, selectHeroVisualClass, selectIsOverencumbered,
  selectRecentActions, selectTotalDispatched,
} from '../store/selectors';
import { radius, softShadow } from '../theme';

export default function Hermenegildo() {
  const health = useAppSelector(selectHeroHealth);
  const overloaded = useAppSelector(selectIsOverencumbered);
  const heroClass = useAppSelector(selectHeroVisualClass);
  const recent = useAppSelector(selectRecentActions);
  const total = useAppSelector(selectTotalDispatched);
  const wiggle = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (total === 0) return;
    Animated.sequence([
      Animated.timing(wiggle, { toValue: 1, duration: 90, useNativeDriver: true }),
      Animated.timing(wiggle, { toValue: -1, duration: 160, useNativeDriver: true }),
      Animated.timing(wiggle, { toValue: 0, duration: 90, useNativeDriver: true }),
    ]).start();
  }, [total, wiggle]);
  let mood: ClownMood = 'happy';
  const rotate = wiggle.interpolate({ inputRange: [-1, 1], outputRange: ['-7deg', '7deg'] });
  const lastType = recent[0]?.type ?? '';
  let message = '¡Bienvenido a HeroForge! Entrena, equípate y hazte leyenda.';
  if (health.status === 'derrotado') { mood = 'worried'; message = '¡Cielos! Telón abajo por ahora. Usa Curar para volver al combate.'; }
  else if (overloaded) { mood = 'worried'; message = '¡Uy! Llevas más equipaje que todo mi circo. ¡Aligera esa mochila!'; }
  else if (health.status === 'crítico') { mood = 'worried'; message = '¡Esa vida está en las últimas! Una curación y seguimos con el espectáculo.'; }
  else if (lastType.endsWith('applyBuildPreset')) { mood = 'cheer'; message = `¡Tachán! Una sola acción y ahora eres ${heroClass.name}.`; }
  else if (lastType.endsWith('toggleEquipItem')) { mood = 'wow'; message = '¡Nuevo equipo! ¿Viste cómo todo el reino se actualizó a la vez?'; }
  else if (lastType.endsWith('takeDamage')) { mood = 'wow'; message = '¡Auch! Ese golpe se vio en el HUD, el combate y el registro.'; }
  else if (heroClass.key !== 'villager') { mood = 'cheer'; message = `¡Qué porte de ${heroClass.name}! Yo pongo los globos, tú la leyenda.`; }

  return (
    <View style={styles.row}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <ClownArt mood={mood} size={112} />
      </Animated.View>
      <View style={styles.bubble}>
        <View style={styles.speechHeader}>
          <View style={styles.statusDot} />
          <Text style={styles.name}>HERMENEGILDO · MAESTRO DE CEREMONIAS</Text>
        </View>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.signature}>«El espectáculo nunca termina»</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bubble: { flex: 1, backgroundColor: '#FFF4D8', borderRadius: radius.lg, borderWidth: 2.5, borderColor: '#2A2145', padding: 12, gap: 5, ...softShadow },
  speechHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E8456B' },
  name: { fontSize: 9, fontWeight: '900', color: '#7A4B1E', letterSpacing: 0.6, flexShrink: 1 },
  message: { fontSize: 13, lineHeight: 18, fontWeight: '800', color: '#3A2D52' },
  signature: { fontSize: 9, color: '#A07A4E', fontStyle: 'italic' },
});
