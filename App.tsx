// App monta las cuatro zonas del taller. La consola Redux queda fija sobre el borde inferior.
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

import { store } from './src/store';
import ArmoryGrid from './src/components/ArmoryGrid';
import Hermenegildo from './src/components/Hermenegildo';
import HeroAvatarHUD from './src/components/HeroAvatarHUD';
import ReduxLiveInspector from './src/components/ReduxLiveInspector';
import ReduxFloatingInspector from './src/components/ReduxFloatingInspector';
import StatsControlPanel from './src/components/StatsControlPanel';
import { colors } from './src/theme';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.root}>
        <StatusBar style="light" />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.kicker}>✦ CRÓNICAS DEL REINO ✦</Text>
            <Text style={styles.title}>⚔ HEROFORGE</Text>
            <Text style={styles.subtitle}>RPG · ARQUITECTURA DE ESTADO CON REDUX TOOLKIT</Text>
            <View style={styles.divider} />
          </View>
          <Hermenegildo />
          <HeroAvatarHUD />
          <StatsControlPanel />
          <ArmoryGrid />
          <ReduxLiveInspector />
          <Text style={styles.footer}>HERO FORGE · CADA ACCIÓN CAMBIA EL MUNDO</Text>
        </ScrollView>
        <View style={styles.floatingDock}>
          <ReduxFloatingInspector />
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingTop: 48, paddingHorizontal: 14, paddingBottom: 210, gap: 14 },
  header: { alignItems: 'center', gap: 4, paddingBottom: 4 },
  kicker: { color: '#E9C98D', fontSize: 9, fontWeight: '900', letterSpacing: 3 },
  title: { color: '#F8EFFF', fontSize: 31, fontWeight: '900', letterSpacing: 2, textShadowColor: '#B49AE8', textShadowRadius: 12 },
  subtitle: { color: '#B9B0D2', fontSize: 9, fontWeight: '800', letterSpacing: 1, textAlign: 'center' },
  divider: { width: '45%', height: 1, backgroundColor: '#786A9D', marginTop: 9 },
  footer: { color: '#9287AF', textAlign: 'center', fontSize: 8, fontWeight: '800', letterSpacing: 2, paddingVertical: 8 },
  floatingDock: { position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 50, elevation: 20 },
});
