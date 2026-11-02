// src/components/ArmoryGrid.tsx  —  ZONA C: Armería & Mochila
// Despacha toggleEquipItem / clearEquipment a inventorySlice. El log lo escribe
// actionLogSlice por su cuenta (addMatcher), no este componente.
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import ItemArt from '../art/ItemArt';
import { useAppDispatch, useAppSelector } from '../store';
import { selectIsOverencumbered, selectWeightLoad } from '../store/selectors';
import { clearEquipment, Item, toggleEquipItem } from '../store/slices/inventorySlice';
import { colors, levelColors, radius, softShadow } from '../theme';

// Cómo se llama cada bono en la tarjeta (+Ataque, +Defensa, +Magia, +Agilidad).
function bonusChips(item: Item): { text: string; color: string }[] {
  const chips: { text: string; color: string }[] = [];
  if (item.bonusStr > 0) {
    const name = item.category === 'weapon' ? 'Ataque' : item.category === 'shield' || item.category === 'armor' ? 'Defensa' : 'Fuerza';
    chips.push({ text: `+${item.bonusStr} ${name}`, color: colors.str });
  }
  if (item.bonusAgi > 0) chips.push({ text: `+${item.bonusAgi} Agilidad`, color: colors.agi });
  if (item.bonusInt > 0) chips.push({ text: `+${item.bonusInt} Magia`, color: colors.int });
  return chips;
}

export default function ArmoryGrid() {
  const dispatch = useAppDispatch();
  const catalog = useAppSelector((state) => state.inventory.catalog);
  const equippedIds = useAppSelector((state) => state.inventory.equippedIds);
  const overloaded = useAppSelector(selectIsOverencumbered);
  const load = useAppSelector(selectWeightLoad);

  // La alerta de sobrecarga parpadea suavemente.
  const blink = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!overloaded) {
      blink.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0.45, duration: 600, useNativeDriver: true }),
        Animated.timing(blink, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [overloaded, blink]);

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>⚒️ Armería & Mochila</Text>
        <Text style={[styles.weight, { backgroundColor: levelColors[load.level] }]}>
          {load.weight} / {load.capacity} kg
        </Text>
      </View>

      {overloaded && (
        <Animated.View style={[styles.alert, { opacity: blink }]}>
          <Text style={styles.alertText}>¡SOBRECARGADO! (-50% Velocidad)</Text>
        </Animated.View>
      )}

      <View style={styles.grid}>
        {catalog.map((item) => {
          const equipped = equippedIds.includes(item.id);
          return (
            <Pressable
              key={item.id}
              onPress={() => dispatch(toggleEquipItem(item.id))}
              style={({ pressed }) => [
                styles.item,
                equipped && styles.itemEquipped,
                pressed && styles.pressed,
              ]}
            >
              {equipped && <Text style={styles.equippedTag}>✨ EQUIPADO</Text>}
              <View style={styles.iconWell}><ItemArt id={item.id} size={56} /></View>
              <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
              <View style={styles.chips}>
                {bonusChips(item).map((chip) => (
                  <Text key={chip.text} style={[styles.chip, { backgroundColor: chip.color }]}>
                    {chip.text}
                  </Text>
                ))}
              </View>
              <Text style={styles.itemWeight}>⚖️ {item.weight} kg</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={() => dispatch(clearEquipment())}
        style={({ pressed }) => [styles.clearBtn, pressed && styles.pressed]}
      >
        <Text style={styles.clearText}>🎒 Desequipar todo ({equippedIds.length})</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 16,
    gap: 12,
    borderWidth: 2,
    borderColor: colors.mint,
    ...softShadow,
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 17, fontWeight: '800', color: colors.ink },
  weight: {
    fontSize: 12,
    fontWeight: '800',
    color: '#17213A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    overflow: 'hidden',
  },
  alert: {
    backgroundColor: colors.rose,
    borderColor: colors.roseDeep,
    borderWidth: 2,
    borderRadius: radius.md,
    paddingVertical: 8,
    alignItems: 'center',
  },
  alertText: { color: '#B3365A', fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  item: {
    width: '48.5%',
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.line,
    padding: 10,
    alignItems: 'center',
    gap: 5,
  },
  itemEquipped: {
    backgroundColor: '#4A3D1E',
    borderColor: '#FFD66B',
    shadowColor: '#FFD66B',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  pressed: { transform: [{ scale: 0.97 }], opacity: 0.9 },
  equippedTag: { fontSize: 10, fontWeight: '900', color: '#FFE28A', letterSpacing: 1 },
  iconWell: { width: 68, height: 68, borderRadius: 16, backgroundColor: '#3A3358', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#6B5FA0' },
  name: { fontSize: 13, fontWeight: '800', color: colors.ink, textAlign: 'center', minHeight: 32 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, justifyContent: 'center' },
  chip: {
    fontSize: 10,
    fontWeight: '800',
    color: '#17213A',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemWeight: { fontSize: 12, fontWeight: '700', color: colors.inkSoft },
  clearBtn: {
    backgroundColor: colors.lavender,
    borderRadius: radius.md,
    paddingVertical: 11,
    alignItems: 'center',
  },
  clearText: { fontWeight: '800', color: colors.ink },
});
