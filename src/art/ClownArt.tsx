// Hermenegildo, el payaso maestro de ceremonias (SVG, 130x150). Sin emojis.
import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Polygon, RadialGradient, Rect, Stop } from 'react-native-svg';

const OL = '#2A2145';

export type ClownMood = 'happy' | 'wow' | 'worried' | 'cheer';

export default function ClownArt({ mood = 'happy', size = 110 }: { mood?: ClownMood; size?: number }) {
  const ruffleColors = ['#FF8FB8', '#8EC5FF', '#FFE28A', '#9BE8B0', '#FF8FB8', '#8EC5FF', '#FFE28A'];
  return (
    <Svg width={size} height={(size * 150) / 130} viewBox="0 0 130 150">
      <Defs>
        <RadialGradient id="cl_nose" cx="0.35" cy="0.3" r="0.85">
          <Stop offset="0" stopColor="#FFB3B3" />
          <Stop offset="0.5" stopColor="#F2424F" />
          <Stop offset="1" stopColor="#A31D3B" />
        </RadialGradient>
        <LinearGradient id="cl_hat" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#9B7BF0" />
          <Stop offset="1" stopColor="#5434B0" />
        </LinearGradient>
        <LinearGradient id="cl_suit" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFB86B" />
          <Stop offset="1" stopColor="#E8456B" />
        </LinearGradient>
      </Defs>

      {/* Globo que sostiene */}
      <Path d="M108 78 C104 100 112 112 116 122" stroke={OL} strokeWidth={1.6} fill="none" />
      <Ellipse cx={108} cy={52} rx={15} ry={19} fill="#8EC5FF" stroke={OL} strokeWidth={2.4} />
      <Path d="M104 62 L108 70 L112 62Z" fill="#8EC5FF" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
      <Ellipse cx={103} cy={44} rx={3.6} ry={6} fill="#FFF" opacity={0.7} transform="rotate(20 103 44)" />

      <Ellipse cx={60} cy={146} rx={34} ry={4.5} fill="#000" opacity={0.22} />

      {/* Cuerpo */}
      <Path d="M30 148 C28 120 36 100 48 94 L74 94 C86 100 94 120 92 148Z" fill="url(#cl_suit)" stroke={OL} strokeWidth={2.6} strokeLinejoin="round" />
      <Path d="M61 96 L50 112 L61 128 L72 112Z M61 128 L50 144 L61 148 L72 144Z" fill="#6A4FD0" stroke={OL} strokeWidth={1.6} strokeLinejoin="round" opacity={0.95} />
      <Path d="M40 104 L50 112 L40 124Z M82 104 L72 112 L82 124Z" fill="#FFE28A" stroke={OL} strokeWidth={1.4} strokeLinejoin="round" />
      <Circle cx={61} cy={112} r={3.2} fill="#FFE28A" stroke={OL} strokeWidth={1.2} />
      <Circle cx={61} cy={128} r={3.2} fill="#FFE28A" stroke={OL} strokeWidth={1.2} />

      {/* Brazo que sostiene el globo */}
      <Path d="M84 104 C96 100 104 92 108 80" stroke={OL} strokeWidth={13} strokeLinecap="round" fill="none" />
      <Path d="M84 104 C96 100 104 92 108 80" stroke="#E8456B" strokeWidth={9} strokeLinecap="round" fill="none" />
      <Circle cx={108} cy={78} r={7} fill="#FFFFFF" stroke={OL} strokeWidth={2.2} />
      {/* Brazo saludando */}
      <Path d="M38 104 C26 100 20 92 20 80" stroke={OL} strokeWidth={13} strokeLinecap="round" fill="none" />
      <Path d="M38 104 C26 100 20 92 20 80" stroke="#E8456B" strokeWidth={9} strokeLinecap="round" fill="none" />
      <Circle cx={20} cy={76} r={7} fill="#FFFFFF" stroke={OL} strokeWidth={2.2} />

      {/* Cuello de volantes */}
      {ruffleColors.map((c, i) => (
        <Circle key={i} cx={34 + i * 9.5} cy={92 + (i % 2) * 2} r={8.5} fill={c} stroke={OL} strokeWidth={2} />
      ))}

      {/* Pajarita */}
      <Path d="M61 100 L46 93 L46 109Z M61 100 L76 93 L76 109Z" fill="#6A4FD0" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
      <Circle cx={61} cy={100} r={4.5} fill="#FFE28A" stroke={OL} strokeWidth={1.8} />

      {/* Pelo rizado */}
      <G stroke={OL} strokeWidth={2.2}>
        <Circle cx={30} cy={56} r={13} fill="#FF8FB8" />
        <Circle cx={26} cy={72} r={11} fill="#8EC5FF" />
        <Circle cx={34} cy={84} r={9} fill="#FF8FB8" />
        <Circle cx={92} cy={56} r={13} fill="#FF8FB8" />
        <Circle cx={96} cy={72} r={11} fill="#8EC5FF" />
        <Circle cx={88} cy={84} r={9} fill="#FF8FB8" />
      </G>

      {/* Cara */}
      <Circle cx={61} cy={62} r={30} fill="#FFF7EE" stroke={OL} strokeWidth={2.6} />
      {/* Maquillaje: estrella azul alrededor del ojo y corazón */}
      <Polygon points="47,48 50,54 57,54 52,58 54,65 47,61 40,65 42,58 37,54 44,54" fill="#8EC5FF" opacity={0.85} stroke={OL} strokeWidth={1.2} strokeLinejoin="round" />
      <Path d="M80 66 C77 60 87 60 80 70 C73 60 83 60 80 66Z" fill="#E8456B" stroke={OL} strokeWidth={1.2} />
      <Ellipse cx={42} cy={72} rx={6} ry={4} fill="#FF8FB8" opacity={0.8} />
      <Ellipse cx={80} cy={74} rx={6} ry={4} fill="#FF8FB8" opacity={0.0} />

      {/* Ojos y cejas */}
      {mood === 'cheer' ? (
        <G>
          <Path d="M45 58 Q51 51 57 58" stroke={OL} strokeWidth={3} fill="none" strokeLinecap="round" />
          <Path d="M65 58 Q71 51 77 58" stroke={OL} strokeWidth={3} fill="none" strokeLinecap="round" />
        </G>
      ) : (
        <G>
          <Ellipse cx={51} cy={57} rx={5.8} ry={mood === 'wow' ? 7.8 : 6.6} fill="#FFFFFF" stroke={OL} strokeWidth={1.8} />
          <Ellipse cx={71} cy={57} rx={5.8} ry={mood === 'wow' ? 7.8 : 6.6} fill="#FFFFFF" stroke={OL} strokeWidth={1.8} />
          <Circle cx={52} cy={58} r={3.2} fill="#3B2A55" />
          <Circle cx={72} cy={58} r={3.2} fill="#3B2A55" />
          <Circle cx={53} cy={56.5} r={1.2} fill="#FFFFFF" />
          <Circle cx={73} cy={56.5} r={1.2} fill="#FFFFFF" />
        </G>
      )}
      <Path
        d={mood === 'worried' ? 'M43 47 L56 44 M79 47 L66 44' : mood === 'wow' ? 'M44 42 Q51 38 58 42 M64 42 Q71 38 78 42' : 'M44 46 Q51 42 58 46 M64 46 Q71 42 78 46'}
        stroke="#4A2F3F" strokeWidth={2.8} strokeLinecap="round" fill="none"
      />

      {/* Nariz roja */}
      <Circle cx={61} cy={68} r={8.5} fill="url(#cl_nose)" stroke={OL} strokeWidth={2} />
      <Ellipse cx={58} cy={64.5} rx={2.6} ry={1.8} fill="#FFF" opacity={0.9} />

      {/* Boca */}
      {mood === 'wow' ? (
        <Ellipse cx={61} cy={82} rx={6} ry={7} fill="#7A2A4A" stroke={OL} strokeWidth={2} />
      ) : mood === 'worried' ? (
        <Path d="M50 84 Q55 79 61 84 Q67 89 72 84" stroke={OL} strokeWidth={2.6} fill="none" strokeLinecap="round" />
      ) : (
        <G>
          <Path d="M44 76 Q61 98 78 76 Z" fill="#7A2A4A" stroke={OL} strokeWidth={2.2} strokeLinejoin="round" />
          <Path d="M50 78 Q61 83 72 78 L70 76 L52 76Z" fill="#FFFFFF" />
          <Path d="M52 87 Q61 82 70 87 Q61 92 52 87Z" fill="#FF7A9A" />
          <Path d="M44 76 Q38 74 38 68 M78 76 Q84 74 84 68" stroke="#E8456B" strokeWidth={3} fill="none" strokeLinecap="round" />
        </G>
      )}

      {/* Sombrero de copa ladeado */}
      <G transform="rotate(-14 61 36)">
        <Ellipse cx={61} cy={37} rx={37} ry={8} fill="#5434B0" stroke={OL} strokeWidth={2.6} />
        <Path d="M40 36 L44 6 C52 2 70 2 78 6 L82 36 C72 42 50 42 40 36Z" fill="url(#cl_hat)" stroke={OL} strokeWidth={2.6} strokeLinejoin="round" />
        <Path d="M41 31 C52 37 70 37 81 31 L82 36 C72 42 50 42 40 36Z" fill="#FFE28A" stroke={OL} strokeWidth={1.8} strokeLinejoin="round" />
        <Path d="M61 12 l2.6 5.6 6 .8 -4.4 4.2 1.1 6 -5.3 -2.9 -5.3 2.9 1.1 -6 -4.4 -4.2 6 -.8z" fill="#FFE28A" stroke={OL} strokeWidth={1.2} strokeLinejoin="round" />
        <Circle cx={80} cy={32} r={5} fill="#FF8FB8" stroke={OL} strokeWidth={1.6} />
        <Circle cx={86} cy={28} r={4} fill="#8EC5FF" stroke={OL} strokeWidth={1.6} />
        <Circle cx={80} cy={32} r={1.8} fill="#FFE28A" />
      </G>
    </Svg>
  );
}
