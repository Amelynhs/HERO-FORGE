// Fondos de escena (SVG) para la arena y el retrato del héroe. Sin imágenes externas.
import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Polygon, RadialGradient, Rect, Stop } from 'react-native-svg';

export type SceneId = 'forest' | 'cave' | 'swamp' | 'volcano';

const THEMES: Record<SceneId, { sky: [string, string, string]; far: string; mid: string; ground: [string, string]; tree: string; glow: string }> = {
  forest: { sky: ['#6C4FB8', '#E48FB5', '#FFD0A8'], far: '#6E5AA8', mid: '#4B3E86', ground: ['#6FCB8E', '#2E7A5C'], tree: '#2C5D68', glow: '#FFE9A8' },
  cave: { sky: ['#1E1B45', '#3E3A8C', '#7C6FD0'], far: '#4A4590', mid: '#322E6B', ground: ['#8F89B8', '#4A4470'], tree: '#2B2757', glow: '#7DF3FF' },
  swamp: { sky: ['#2D1B4E', '#7A3F8F', '#E88FB0'], far: '#5A3B80', mid: '#3F2A63', ground: ['#7DBE7A', '#2F5E4A'], tree: '#2A3F4F', glow: '#C7F7A8' },
  volcano: { sky: ['#4A1B3F', '#C2455A', '#FFB36B'], far: '#7A3156', mid: '#55203F', ground: ['#C98A62', '#6E3A3A'], tree: '#3A1F36', glow: '#FFD36B' },
};

export const SCENE_FOR_BOSS: SceneId[] = ['forest', 'cave', 'swamp', 'volcano'];

export default function SceneArt({ scene = 'forest', width, height }: { scene?: SceneId; width: number | string; height: number | string }) {
  const t = THEMES[scene];
  return (
    <Svg width={width} height={height} viewBox="0 0 360 200" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="sc_sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={t.sky[0]} />
          <Stop offset="0.6" stopColor={t.sky[1]} />
          <Stop offset="1" stopColor={t.sky[2]} />
        </LinearGradient>
        <LinearGradient id="sc_ground" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={t.ground[0]} />
          <Stop offset="1" stopColor={t.ground[1]} />
        </LinearGradient>
        <RadialGradient id="sc_glow" cx="0.5" cy="0.5" r="0.5">
          <Stop offset="0" stopColor={t.glow} stopOpacity={0.95} />
          <Stop offset="1" stopColor={t.glow} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect width={360} height={200} fill="url(#sc_sky)" />
      <Circle cx={280} cy={52} r={46} fill="url(#sc_glow)" />
      <Circle cx={280} cy={52} r={17} fill={t.glow} />
      {[[30, 24], [70, 50], [120, 18], [170, 40], [215, 20], [330, 90], [20, 80]].map(([x, y], i) => (
        <Circle key={i} cx={x} cy={y} r={1.6} fill="#FFFFFF" opacity={0.85} />
      ))}
      {/* Nubes */}
      <G opacity={0.55} fill="#FFFFFF">
        <Ellipse cx={90} cy={64} rx={30} ry={7} />
        <Ellipse cx={108} cy={58} rx={18} ry={7} />
        <Ellipse cx={220} cy={84} rx={26} ry={6} />
      </G>
      {/* Montañas lejanas */}
      <Path d="M0 130 L50 78 L88 116 L140 64 L196 122 L246 80 L300 118 L360 72 L360 150 L0 150Z" fill={t.far} />
      <Path d="M0 142 L40 108 L90 138 L150 100 L210 140 L270 104 L330 136 L360 118 L360 160 L0 160Z" fill={t.mid} />
      {/* Árboles / estalagmitas */}
      {scene === 'cave' || scene === 'volcano' ? (
        <G fill={t.tree}>
          <Polygon points="20,150 34,100 48,150" />
          <Polygon points="60,150 70,116 82,150" />
          <Polygon points="300,150 316,96 332,150" />
          <Polygon points="268,150 278,120 290,150" />
        </G>
      ) : (
        <G fill={t.tree}>
          {[22, 58, 292, 328].map((x, i) => (
            <G key={x}>
              <Rect x={x - 3} y={132} width={6} height={22} />
              <Circle cx={x} cy={120 - (i % 2) * 6} r={19} />
              <Circle cx={x - 11} cy={130} r={13} />
              <Circle cx={x + 11} cy={130} r={13} />
            </G>
          ))}
        </G>
      )}
      {/* Suelo */}
      <Path d="M0 148 C80 138 280 138 360 148 L360 200 L0 200Z" fill="url(#sc_ground)" />
      <Path d="M0 170 C100 160 260 160 360 170" stroke="#FFFFFF" strokeOpacity={0.18} strokeWidth={2} fill="none" />
      <G fill="#FFFFFF" opacity={0.22}>
        <Ellipse cx={80} cy={182} rx={22} ry={3} />
        <Ellipse cx={270} cy={186} rx={26} ry={3} />
      </G>
      {/* Luciérnagas */}
      {[[60, 110], [150, 96], [210, 118], [300, 100], [100, 140]].map(([x, y], i) => (
        <G key={i}>
          <Circle cx={x} cy={y} r={5} fill={t.glow} opacity={0.25} />
          <Circle cx={x} cy={y} r={1.8} fill={t.glow} />
        </G>
      ))}
    </Svg>
  );
}
