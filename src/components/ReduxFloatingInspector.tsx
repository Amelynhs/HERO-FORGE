// Consola flotante fija: permanece visible mientras se desplaza el resto de la app.
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { selectRecentActions, selectTotalDispatched } from '../store/selectors';
import { clearLog } from '../store/slices/actionLogSlice';
import { colors, monoFont, softShadow } from '../theme';

export default function ReduxFloatingInspector() {
  const dispatch = useAppDispatch();
  const recent = useAppSelector(selectRecentActions);
  const total = useAppSelector(selectTotalDispatched);
  const [expanded, setExpanded] = useState(true);

  return (
    <View style={styles.shell}>
      <Pressable onPress={() => setExpanded(v => !v)} style={styles.header}>
        <View style={styles.liveDot} />
        <View style={styles.heading}>
          <Text style={styles.title}>REDUX · EN VIVO</Text>
          <Text style={styles.subtitle}>{total} acciones · últimas 5</Text>
        </View>
        <Text style={styles.chevron}>{expanded ? '⌄' : '⌃'}</Text>
      </Pressable>
      {expanded && (
        <View style={styles.body}>
          <View style={styles.flow}>
            <Text style={styles.flowText}>UI</Text><Text style={styles.arrow}>›</Text>
            <Text style={styles.flowText}>DISPATCH</Text><Text style={styles.arrow}>›</Text>
            <Text style={styles.flowText}>REDUCER</Text><Text style={styles.arrow}>›</Text>
            <Text style={styles.flowText}>STORE</Text>
          </View>
          {recent.length === 0 ? (
            <Text style={styles.empty}>Esperando acciones del héroe...</Text>
          ) : recent.map((entry, index) => {
            const group = entry.type.split('/')[0];
            const action = entry.type.split('/')[1] ?? entry.type;
            const tint = group === 'stats' ? '#F2A99D' : group === 'inventory' ? '#8DD8B9' : '#B9A9F1';
            return (
              <View key={entry.id} style={styles.logRow}>
                <Text style={styles.index}>{String(index + 1).padStart(2, '0')}</Text>
                <View style={[styles.dot, { backgroundColor: tint }]} />
                <Text style={[styles.action, { color: tint }]} numberOfLines={1}>{group}/{action}</Text>
                <Text style={styles.payload} numberOfLines={1}>{entry.label}</Text>
              </View>
            );
          })}
          <View style={styles.footer}>
            <Text style={styles.footerText}>ACTION → REDUCER → STATE → SELECTOR</Text>
            <Pressable onPress={() => dispatch(clearLog())}><Text style={styles.clear}>LIMPIAR</Text></Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: 'rgba(38, 34, 67, 0.97)',
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    borderWidth: 1.5, borderBottomWidth: 0, borderColor: '#B7A8E8',
    paddingHorizontal: 13, paddingTop: 9, paddingBottom: 12,
    ...softShadow,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 9, minHeight: 34 },
  liveDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: '#8DE0B9', borderWidth: 2, borderColor: '#D7F7E7' },
  heading: { flex: 1 },
  title: { color: '#F6F0FF', fontSize: 11, fontWeight: '900', letterSpacing: 1.4 },
  subtitle: { color: '#C0B9D9', fontSize: 9, marginTop: 1 },
  chevron: { color: '#E4D9FF', fontSize: 22, fontWeight: '800', paddingHorizontal: 5 },
  body: { marginTop: 7, gap: 5 },
  flow: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingBottom: 3 },
  flowText: { color: '#BEB2E9', fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  arrow: { color: '#F2C8A8', fontSize: 12 },
  logRow: { flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: 17 },
  index: { color: '#827AA6', width: 15, fontSize: 8, fontFamily: monoFont },
  dot: { width: 6, height: 6, borderRadius: 3 },
  action: { fontSize: 8, fontWeight: '900', fontFamily: monoFont, maxWidth: '54%' },
  payload: { flex: 1, color: '#F0EAFB', fontSize: 8, textAlign: 'right' },
  empty: { color: '#C0B9D9', fontSize: 10, paddingVertical: 7 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#5B527C', paddingTop: 6, marginTop: 2 },
  footerText: { color: '#AFA4D4', fontSize: 7, fontFamily: monoFont, fontWeight: '800' },
  clear: { color: '#F4B5C7', fontSize: 8, fontWeight: '900' },
});
