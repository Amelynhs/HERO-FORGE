// Paleta fantasy pastel sobre superficies ciruela para conservar contraste y legibilidad.
import { Platform, ViewStyle } from 'react-native';
import type { Level } from './store/selectors';

export const colors = {
  bg: '#17152A',
  card: '#292541',
  ink: '#FFF7FF',
  inkSoft: '#C7BEDD',
  line: '#51486F',
  lavender: '#554A78',
  lavenderDeep: '#A99AE0',
  mint: '#B8EBD6',
  mintDeep: '#73CBA8',
  peach: '#FFD3C1',
  peachDeep: '#EBA88D',
  sky: '#C9E1FF',
  skyDeep: '#91BDF4',
  butter: '#FFE9B5',
  butterDeep: '#E4C477',
  rose: '#FFC7D6',
  roseDeep: '#E982A1',
  str: '#F6A99D',
  agi: '#91DDBD',
  int: '#A8C9FF',
  consoleBg: '#211D38',
  consoleText: '#F0EAFB',
} as const;

export const levelColors: Record<Level, string> = {
  ok: '#83D7B4',
  warn: '#F0C878',
  danger: '#F18CA5',
};

export const radius = { sm: 10, md: 16, lg: 24 } as const;
export const softShadow: ViewStyle = Platform.select<ViewStyle>({
  ios: { shadowColor: '#080613', shadowOpacity: 0.3, shadowRadius: 15, shadowOffset: { width: 0, height: 8 } },
  default: { elevation: 7 },
}) ?? {};
export const monoFont: string = Platform.select({ ios: 'Menlo', default: 'monospace' }) ?? 'monospace';
