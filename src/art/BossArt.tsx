// Jefes dibujados en vectores (SVG, 140x140). Sin emojis.
import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Polygon, RadialGradient, Rect, Stop } from 'react-native-svg';

const OL = '#2A2145';

export type BossId = 'dragon' | 'golem' | 'spider' | 'phoenix';

function Dragon() {
  return (
    <G>
      <Defs>
        <LinearGradient id="bd_body" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFC2DA" />
          <Stop offset="1" stopColor="#F27FB0" />
        </LinearGradient>
        <LinearGradient id="bd_wing" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#B9E1FF" />
          <Stop offset="1" stopColor="#7FA8F0" />
        </LinearGradient>
      </Defs>
      <Path d="M30 60 C8 40 6 20 14 8 C24 22 36 24 48 32 C40 40 38 50 40 62Z" fill="url(#bd_wing)" stroke={OL} strokeWidth={2.5} strokeLinejoin="round" />
      <Path d="M110 60 C132 40 134 20 126 8 C116 22 104 24 92 32 C100 40 102 50 100 62Z" fill="url(#bd_wing)" stroke={OL} strokeWidth={2.5} strokeLinejoin="round" />
      <Path d="M20 22 L40 40 M24 40 L40 48" stroke="#5B80D6" strokeWidth={2} strokeLinecap="round" />
      <Path d="M120 22 L100 40 M116 40 L100 48" stroke="#5B80D6" strokeWidth={2} strokeLinecap="round" />
      <Path d="M100 108 C126 112 134 96 124 84 C130 100 112 102 98 98Z" fill="#F27FB0" stroke={OL} strokeWidth={2.4} strokeLinejoin="round" />
      <Polygon points="118,86 126,76 128,90" fill="#9ED8FF" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
      <Ellipse cx={70} cy={92} rx={36} ry={32} fill="url(#bd_body)" stroke={OL} strokeWidth={2.8} />
      <Ellipse cx={70} cy={100} rx={22} ry={24} fill="#FFF1D6" stroke={OL} strokeWidth={2} />
      <Path d="M54 90 H86 M52 100 H88 M54 110 H86" stroke="#F2C58A" strokeWidth={2} />
      <Ellipse cx={46} cy={122} rx={13} ry={9} fill="#F27FB0" stroke={OL} strokeWidth={2.4} />
      <Ellipse cx={94} cy={122} rx={13} ry={9} fill="#F27FB0" stroke={OL} strokeWidth={2.4} />
      <Path d="M40 126 v4 M46 127 v4 M52 126 v4 M88 126 v4 M94 127 v4 M100 126 v4" stroke="#FFF" strokeWidth={2.4} strokeLinecap="round" />
      <Polygon points="52,62 58,50 64,62" fill="#9ED8FF" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
      <Polygon points="66,60 72,46 78,60" fill="#9ED8FF" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
      <Polygon points="80,62 86,50 92,62" fill="#9ED8FF" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M44 30 L38 8 L56 22Z M96 30 L102 8 L84 22Z" fill="#FFE28A" stroke={OL} strokeWidth={2.4} strokeLinejoin="round" />
      <Ellipse cx={70} cy={42} rx={30} ry={26} fill="url(#bd_body)" stroke={OL} strokeWidth={2.8} />
      <Ellipse cx={70} cy={54} rx={17} ry={11} fill="#FFC2DA" stroke={OL} strokeWidth={2.2} />
      <Circle cx={64} cy={52} r={2.2} fill={OL} />
      <Circle cx={76} cy={52} r={2.2} fill={OL} />
      <Path d="M56 60 Q70 70 84 60" fill="#7A1F4B" stroke={OL} strokeWidth={2} />
      <Path d="M60 60 L62 66 L64 61 M76 61 L78 66 L80 60" fill="#FFF" stroke={OL} strokeWidth={1.4} strokeLinejoin="round" />
      <Ellipse cx={56} cy={38} rx={7} ry={8} fill="#FFF" stroke={OL} strokeWidth={2} />
      <Ellipse cx={84} cy={38} rx={7} ry={8} fill="#FFF" stroke={OL} strokeWidth={2} />
      <Circle cx={58} cy={39} r={4} fill="#C0204F" />
      <Circle cx={82} cy={39} r={4} fill="#C0204F" />
      <Circle cx={59} cy={37.5} r={1.4} fill="#FFF" />
      <Circle cx={83} cy={37.5} r={1.4} fill="#FFF" />
      <Path d="M46 28 L62 34 M94 28 L78 34" stroke={OL} strokeWidth={3.4} strokeLinecap="round" />
      <Ellipse cx={42} cy={50} rx={5} ry={3.2} fill="#FF7FA8" opacity={0.7} />
      <Ellipse cx={98} cy={50} rx={5} ry={3.2} fill="#FF7FA8" opacity={0.7} />
    </G>
  );
}

function Golem() {
  return (
    <G>
      <Defs>
        <LinearGradient id="bg_rock" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#B7B2D9" />
          <Stop offset="1" stopColor="#5C567F" />
        </LinearGradient>
        <RadialGradient id="bg_core" cx="0.5" cy="0.5" r="0.6">
          <Stop offset="0" stopColor="#E8FFFF" />
          <Stop offset="1" stopColor="#35D6E8" />
        </RadialGradient>
      </Defs>
      <Rect x={42} y={96} width={22} height={34} rx={7} fill="url(#bg_rock)" stroke={OL} strokeWidth={2.6} />
      <Rect x={76} y={96} width={22} height={34} rx={7} fill="url(#bg_rock)" stroke={OL} strokeWidth={2.6} />
      <Rect x={38} y={122} width={30} height={14} rx={6} fill="#6D6794" stroke={OL} strokeWidth={2.6} />
      <Rect x={72} y={122} width={30} height={14} rx={6} fill="#6D6794" stroke={OL} strokeWidth={2.6} />
      <Rect x={4} y={50} width={26} height={62} rx={12} fill="url(#bg_rock)" stroke={OL} strokeWidth={2.6} />
      <Rect x={110} y={50} width={26} height={62} rx={12} fill="url(#bg_rock)" stroke={OL} strokeWidth={2.6} />
      <Circle cx={17} cy={116} r={15} fill="#6D6794" stroke={OL} strokeWidth={2.6} />
      <Circle cx={123} cy={116} r={15} fill="#6D6794" stroke={OL} strokeWidth={2.6} />
      <Path d="M30 56 C30 44 44 40 70 40 C96 40 110 44 110 56 L106 104 C104 112 90 116 70 116 C50 116 36 112 34 104Z" fill="url(#bg_rock)" stroke={OL} strokeWidth={3} strokeLinejoin="round" />
      <Path d="M44 54 L52 72 L46 90 M96 58 L90 76 L98 96 M62 108 L70 96 L80 110" stroke="#4A4470" strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={70} cy={78} r={16} fill="#3C3560" stroke={OL} strokeWidth={2.6} />
      <Circle cx={70} cy={78} r={11} fill="url(#bg_core)" stroke="#BFFBFF" strokeWidth={1.6} />
      <Path d="M70 70 L70 86 M62 78 L78 78" stroke="#1C8FA0" strokeWidth={2} strokeLinecap="round" />
      <Ellipse cx={22} cy={64} rx={9} ry={4} fill="#7FBE86" opacity={0.9} />
      <Ellipse cx={104} cy={48} rx={10} ry={4} fill="#7FBE86" opacity={0.9} />
      <Path d="M44 44 C44 22 96 22 96 44 Z" fill="#8F89B8" stroke={OL} strokeWidth={2.6} strokeLinejoin="round" />
      <Rect x={48} y={26} width={44} height={22} rx={8} fill="url(#bg_rock)" stroke={OL} strokeWidth={2.8} />
      <Path d="M54 36 L66 39 L66 42 L54 40Z M86 36 L74 39 L74 42 L86 40Z" fill="#7DF3FF" stroke="#E8FFFF" strokeWidth={1.2} strokeLinejoin="round" />
      <Path d="M60 46 H80" stroke={OL} strokeWidth={2.4} strokeLinecap="round" />
      <Path d="M54 22 L58 12 L64 22 M76 22 L82 10 L86 22" fill="#8F89B8" stroke={OL} strokeWidth={2.2} strokeLinejoin="round" />
    </G>
  );
}

function Spider() {
  const leg = (d: string) => (
    <G>
      <Path d={d} stroke={OL} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Path d={d} stroke="#6E4AA8" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </G>
  );
  return (
    <G>
      <Defs>
        <RadialGradient id="bs_body" cx="0.4" cy="0.3" r="0.9">
          <Stop offset="0" stopColor="#B88CF2" />
          <Stop offset="1" stopColor="#3F2466" />
        </RadialGradient>
      </Defs>
      <Path d="M70 0 V32" stroke="#E8E1FF" strokeWidth={2} />
      {leg('M52 68 C34 54 20 56 12 70 L10 108')}
      {leg('M52 76 C30 70 14 80 8 96 L8 124')}
      {leg('M54 84 C36 90 26 104 24 122')}
      {leg('M58 90 C46 100 40 114 40 128')}
      {leg('M88 68 C106 54 120 56 128 70 L130 108')}
      {leg('M88 76 C110 70 126 80 132 96 L132 124')}
      {leg('M86 84 C104 90 114 104 116 122')}
      {leg('M82 90 C94 100 100 114 100 128')}
      <Ellipse cx={70} cy={92} rx={28} ry={32} fill="url(#bs_body)" stroke={OL} strokeWidth={3} />
      <Path d="M70 70 C62 80 62 86 70 92 C78 86 78 80 70 70Z M70 92 C62 98 62 106 70 114 C78 106 78 98 70 92Z" fill="#FF5BB8" stroke={OL} strokeWidth={1.8} />
      <Circle cx={56} cy={80} r={4} fill="#E3C8FF" opacity={0.6} />
      <Circle cx={70} cy={56} r={22} fill="url(#bs_body)" stroke={OL} strokeWidth={3} />
      <Circle cx={60} cy={50} r={6} fill="#FFE28A" stroke={OL} strokeWidth={2} />
      <Circle cx={80} cy={50} r={6} fill="#FFE28A" stroke={OL} strokeWidth={2} />
      <Circle cx={61} cy={51} r={2.6} fill="#A3173D" />
      <Circle cx={79} cy={51} r={2.6} fill="#A3173D" />
      <Circle cx={66} cy={42} r={3.4} fill="#FFE28A" stroke={OL} strokeWidth={1.6} />
      <Circle cx={74} cy={42} r={3.4} fill="#FFE28A" stroke={OL} strokeWidth={1.6} />
      <Path d="M52 44 L63 49 M88 44 L77 49" stroke={OL} strokeWidth={3} strokeLinecap="round" />
      <Path d="M62 66 L60 76 L66 70Z M78 66 L80 76 L74 70Z" fill="#F8F1FF" stroke={OL} strokeWidth={1.8} strokeLinejoin="round" />
      <Path d="M64 68 Q70 72 76 68" stroke={OL} strokeWidth={2} fill="none" />
    </G>
  );
}

function Phoenix() {
  return (
    <G>
      <Defs>
        <LinearGradient id="bp_body" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFE17A" />
          <Stop offset="0.5" stopColor="#FF9A3D" />
          <Stop offset="1" stopColor="#E8384F" />
        </LinearGradient>
      </Defs>
      <Path d="M70 100 C62 118 52 130 46 138 C58 132 66 130 70 124 C74 130 82 132 94 138 C88 130 78 118 70 100Z" fill="#FF6A3D" stroke={OL} strokeWidth={2.4} strokeLinejoin="round" />
      <Path d="M60 104 C48 120 34 128 24 130 C38 124 48 116 56 100Z M80 104 C92 120 106 128 116 130 C102 124 92 116 84 100Z" fill="#E8384F" stroke={OL} strokeWidth={2.2} strokeLinejoin="round" />
      <Path d="M56 76 C38 80 18 66 4 40 C20 46 30 44 36 36 C40 48 50 54 60 58Z" fill="url(#bp_body)" stroke={OL} strokeWidth={2.6} strokeLinejoin="round" />
      <Path d="M84 76 C102 80 122 66 136 40 C120 46 110 44 104 36 C100 48 90 54 80 58Z" fill="url(#bp_body)" stroke={OL} strokeWidth={2.6} strokeLinejoin="round" />
      <Path d="M20 46 C28 56 38 62 52 66 M120 46 C112 56 102 62 88 66" stroke="#FFF1B8" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      <Ellipse cx={70} cy={80} rx={24} ry={30} fill="url(#bp_body)" stroke={OL} strokeWidth={2.8} />
      <Ellipse cx={70} cy={90} rx={14} ry={20} fill="#FFF1B8" opacity={0.85} />
      <Path d="M54 18 C50 6 58 2 62 10 C62 4 70 0 74 8 C78 2 86 6 82 18Z" fill="#FF6A3D" stroke={OL} strokeWidth={2.2} strokeLinejoin="round" />
      <Circle cx={70} cy={36} r={21} fill="url(#bp_body)" stroke={OL} strokeWidth={2.8} />
      <Path d="M62 44 L70 60 L78 44Z" fill="#FFD25C" stroke={OL} strokeWidth={2.2} strokeLinejoin="round" />
      <Ellipse cx={60} cy={32} rx={5.5} ry={6.5} fill="#FFF" stroke={OL} strokeWidth={1.8} />
      <Ellipse cx={80} cy={32} rx={5.5} ry={6.5} fill="#FFF" stroke={OL} strokeWidth={1.8} />
      <Circle cx={61} cy={33} r={3} fill="#A3173D" />
      <Circle cx={79} cy={33} r={3} fill="#A3173D" />
      <Path d="M52 24 L64 29 M88 24 L76 29" stroke={OL} strokeWidth={3} strokeLinecap="round" />
    </G>
  );
}

export default function BossArt({ id, size = 130 }: { id: BossId; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 140 140">
      <Ellipse cx={70} cy={134} rx={40} ry={5} fill="#000" opacity={0.25} />
      {id === 'dragon' && <Dragon />}
      {id === 'golem' && <Golem />}
      {id === 'spider' && <Spider />}
      {id === 'phoenix' && <Phoenix />}
    </Svg>
  );
}
