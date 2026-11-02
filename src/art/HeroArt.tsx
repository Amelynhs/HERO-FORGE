// Héroe dibujado en vectores (SVG). Cada clase tiene su propio personaje; la expresión
// y el arma en mano cambian según el estado de Redux. Sin emojis.
import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { ItemShapes } from './ItemArt';

const OL = '#2A2145';
const SKIN = '#FFD9BD';

export type HeroClassKey = 'villager' | 'berserker' | 'tank' | 'mage' | 'rogue';
export type HeroMood =
  | 'happy' | 'calm' | 'fierce' | 'smart' | 'smug' | 'strained' | 'hurt' | 'critical' | 'dead';

// Un miembro con contorno: trazo oscuro más ancho y encima el color.
function Limb({ d, color, w = 9 }: { d: string; color: string; w?: number }) {
  return (
    <G>
      <Path d={d} stroke={OL} strokeWidth={w + 4} strokeLinecap="round" fill="none" />
      <Path d={d} stroke={color} strokeWidth={w} strokeLinecap="round" fill="none" />
    </G>
  );
}

function Eyes({ pupil = '#3B2A55' }: { pupil?: string }) {
  return (
    <G>
      {[51, 69].map((x) => (
        <G key={x}>
          <Ellipse cx={x} cy={52} rx={4.8} ry={5.8} fill="#FFFFFF" stroke={OL} strokeWidth={1.5} />
          <Circle cx={x + 0.5} cy={53} r={3.2} fill={pupil} />
          <Circle cx={x + 1.6} cy={51} r={1.2} fill="#FFFFFF" />
        </G>
      ))}
    </G>
  );
}

function Sweat({ x = 84, y = 38 }: { x?: number; y?: number }) {
  return (
    <Path
      d={`M${x} ${y} C${x - 5} ${y + 7} ${x - 4} ${y + 12} ${x} ${y + 12} C${x + 4} ${y + 12} ${x + 5} ${y + 7} ${x} ${y}Z`}
      fill="#9ED8FF"
      stroke={OL}
      strokeWidth={1.4}
    />
  );
}

function Face({ mood }: { mood: HeroMood }) {
  const brow = { stroke: '#4A2F3F', strokeWidth: 2.6, strokeLinecap: 'round' as const, fill: 'none' };
  const mouth = { stroke: OL, strokeWidth: 2.2, strokeLinecap: 'round' as const, fill: 'none' };
  return (
    <G>
      <Ellipse cx={43} cy={61} rx={5.5} ry={3.4} fill="#FF9DB0" opacity={0.7} />
      <Ellipse cx={77} cy={61} rx={5.5} ry={3.4} fill="#FF9DB0" opacity={0.7} />
      {mood === 'dead' && (
        <G>
          <Path d="M46 47 L56 57 M56 47 L46 57 M64 47 L74 57 M74 47 L64 57" stroke={OL} strokeWidth={2.6} strokeLinecap="round" />
          <Path d="M53 64 H67" {...mouth} />
          <Ellipse cx={64} cy={67} rx={3} ry={3.6} fill="#FF7A9A" stroke={OL} strokeWidth={1.4} />
        </G>
      )}
      {(mood === 'strained') && (
        <G>
          <Path d="M45 47 L56 52 L45 57 M75 47 L64 52 L75 57" stroke={OL} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Path d="M44 42 L55 45 M76 42 L65 45" {...brow} />
          <Rect x={51} y={62} width={18} height={6.5} rx={2} fill="#FFFFFF" stroke={OL} strokeWidth={1.8} />
          <Path d="M57 62 V68.5 M63 62 V68.5" stroke={OL} strokeWidth={1.2} />
          <Sweat />
        </G>
      )}
      {(mood === 'hurt' || mood === 'critical') && (
        <G>
          <Eyes />
          <Path d="M45 45 L56 41 M75 45 L64 41" {...brow} />
          {mood === 'hurt' ? (
            <Path d="M52 66 Q56 62 60 66 Q64 70 68 66" {...mouth} />
          ) : (
            <Ellipse cx={60} cy={66} rx={4} ry={4.6} fill="#7A2A4A" stroke={OL} strokeWidth={1.6} />
          )}
          <Sweat />
          {mood === 'critical' && (
            <G transform="rotate(-25 74 62)">
              <Rect x={68} y={59} width={12} height={5} rx={1.6} fill="#FFE8B0" stroke={OL} strokeWidth={1.2} />
            </G>
          )}
        </G>
      )}
      {mood === 'fierce' && (
        <G>
          <Eyes pupil="#7A1E2E" />
          <Path d="M44 41 L57 47 M76 41 L63 47" {...brow} strokeWidth={3.2} />
          <Path d="M50 62 Q60 74 70 62 Z" fill="#7A2A4A" stroke={OL} strokeWidth={1.8} strokeLinejoin="round" />
          <Path d="M54 62.5 V66 M60 63 V68 M66 62.5 V66" stroke="#FFFFFF" strokeWidth={2.4} />
          <Path d="M82 52 L87 60" stroke="#C94A4A" strokeWidth={2.2} strokeLinecap="round" />
        </G>
      )}
      {mood === 'smart' && (
        <G>
          <Eyes pupil="#2F4A8C" />
          <Path d="M45 43 L56 42 M64 38 Q70 36 76 40" {...brow} />
          <Path d="M54 63 Q60 67 67 62" {...mouth} />
        </G>
      )}
      {mood === 'smug' && (
        <G>
          <Eyes />
          <Path d="M46 48 H56 M64 48 H74" stroke="#4A2F3F" strokeWidth={3.4} strokeLinecap="round" />
          <Path d="M45 42 L56 43 M75 42 L64 43" {...brow} />
          <Path d="M52 63 Q61 68 70 60" {...mouth} />
        </G>
      )}
      {mood === 'calm' && (
        <G>
          <Eyes />
          <Path d="M46 48.5 H56 M64 48.5 H74" stroke={SKIN} strokeWidth={4} />
          <Path d="M46 48.5 H56 M64 48.5 H74" stroke={OL} strokeWidth={1.6} strokeLinecap="round" />
          <Path d="M45 42 L56 41 M75 42 L64 41" {...brow} />
          <Path d="M54 63 Q60 66.5 66 63" {...mouth} />
        </G>
      )}
      {mood === 'happy' && (
        <G>
          <Eyes />
          <Path d="M46 42 Q51 40 56 42 M64 42 Q69 40 74 42" {...brow} />
          <Path d="M52 62 Q60 71 68 62" {...mouth} />
        </G>
      )}
    </G>
  );
}

// ───────── Cuerpos y accesorios por clase ─────────
function Villager() {
  return (
    <G>
      <Rect x={45} y={108} width={13} height={28} rx={5} fill="#7B5E43" stroke={OL} strokeWidth={2.2} />
      <Rect x={62} y={108} width={13} height={28} rx={5} fill="#7B5E43" stroke={OL} strokeWidth={2.2} />
      <Rect x={42} y={130} width={19} height={10} rx={5} fill="#5A4030" stroke={OL} strokeWidth={2.2} />
      <Rect x={59} y={130} width={19} height={10} rx={5} fill="#5A4030" stroke={OL} strokeWidth={2.2} />
      <Limb d="M42 80 C34 86 31 97 33 106" color="#E2BE86" />
      <Path d="M42 79 C42 73 50 71 60 71 C70 71 78 73 78 79 L81 112 C81 117 74 119 60 119 C46 119 39 117 39 112 Z" fill="#E2BE86" stroke={OL} strokeWidth={2.5} />
      <Path d="M52 72 L60 84 L68 72" fill="none" stroke="#B8935D" strokeWidth={2.2} />
      <Rect x={39} y={103} width={42} height={7} fill="#8B4B3A" stroke={OL} strokeWidth={2} />
      <Rect x={56} y={102} width={8} height={9} rx={1.5} fill="#F6C253" stroke={OL} strokeWidth={1.6} />
      <Limb d="M78 80 C86 80 90 84 92 90" color="#E2BE86" />
      <Circle cx={33} cy={108} r={5} fill={SKIN} stroke={OL} strokeWidth={2} />
    </G>
  );
}
function VillagerHead() {
  return (
    <G>
      <Path d="M35 52 C32 36 42 28 60 28 C78 28 88 36 85 52 C81 43 75 40 60 40 C45 40 39 43 35 52Z" fill="#8B5A3C" stroke={OL} strokeWidth={2} />
      <Ellipse cx={60} cy={34} rx={37} ry={8.5} fill="#E8C474" stroke={OL} strokeWidth={2.4} />
      <Path d="M40 33 C40 10 80 10 80 33 C72 37 48 37 40 33Z" fill="#F4DB91" stroke={OL} strokeWidth={2.4} />
      <Path d="M41 30 C50 34 70 34 79 30 L79 25 C70 29 50 29 41 25Z" fill="#D9546A" stroke={OL} strokeWidth={1.6} />
      <Path d="M48 16 L52 28 M60 12 L60 26 M72 16 L68 28" stroke="#D9B45C" strokeWidth={1.4} />
    </G>
  );
}

function Berserker() {
  return (
    <G>
      <Rect x={45} y={108} width={13} height={28} rx={5} fill="#4A3A33" stroke={OL} strokeWidth={2.2} />
      <Rect x={62} y={108} width={13} height={28} rx={5} fill="#4A3A33" stroke={OL} strokeWidth={2.2} />
      <Rect x={41} y={128} width={21} height={12} rx={5} fill="#8A4A2B" stroke={OL} strokeWidth={2.2} />
      <Rect x={58} y={128} width={21} height={12} rx={5} fill="#8A4A2B" stroke={OL} strokeWidth={2.2} />
      <Limb d="M40 80 C32 86 29 97 31 106" color={SKIN} w={10} />
      <Path d="M41 79 C41 73 49 71 60 71 C71 71 79 73 79 79 L82 112 C82 117 74 119 60 119 C46 119 38 117 38 112 Z" fill="#F0BC96" stroke={OL} strokeWidth={2.5} />
      <Path d="M48 82 L56 92 M72 82 L64 92" stroke="#D4936F" strokeWidth={2} strokeLinecap="round" />
      <Path d="M41 79 L60 104 L79 79 L82 96 L60 112 L38 96Z" fill="#B5532F" stroke={OL} strokeWidth={2.2} strokeLinejoin="round" />
      <Path d="M44 90 l4 4 M52 98 l4 4 M70 98 l4 4 M66 88 l4 4" stroke="#7A3520" strokeWidth={2} strokeLinecap="round" />
      <Rect x={38} y={103} width={44} height={8} fill="#4A2A1F" stroke={OL} strokeWidth={2} />
      <Circle cx={60} cy={107} r={5} fill="#F6C253" stroke={OL} strokeWidth={1.8} />
      <Limb d="M80 80 C88 80 92 84 94 90" color={SKIN} w={10} />
      <Circle cx={36} cy={80} r={11} fill="#EFE3CE" stroke={OL} strokeWidth={2.2} />
      <Circle cx={84} cy={80} r={11} fill="#EFE3CE" stroke={OL} strokeWidth={2.2} />
      <Path d="M28 76 l4 4 M34 71 l3 5 M92 76 l-4 4 M86 71 l-3 5" stroke="#C9B896" strokeWidth={2} strokeLinecap="round" />
      <Circle cx={31} cy={108} r={5.5} fill={SKIN} stroke={OL} strokeWidth={2} />
    </G>
  );
}
function BerserkerHead() {
  return (
    <G>
      <Path d="M33 50 L27 30 L41 37 L42 16 L53 30 L60 9 L67 30 L78 16 L79 37 L93 30 L87 50 C83 39 72 35 60 35 C48 35 37 39 33 50Z" fill="#E2463C" stroke={OL} strokeWidth={2.2} strokeLinejoin="round" />
      <Path d="M36 40 C48 33 72 33 84 40 L83 47 C72 41 48 41 37 47 Z" fill="#FFE9B8" stroke={OL} strokeWidth={2} />
      <Path d="M82 40 L96 36 L90 46 L97 52 L83 47Z" fill="#FFE9B8" stroke={OL} strokeWidth={1.8} strokeLinejoin="round" />
    </G>
  );
}

function Tank() {
  return (
    <G>
      <Path d="M36 78 C20 100 22 130 30 142 L90 142 C98 130 100 100 84 78Z" fill="#C8434F" stroke={OL} strokeWidth={2.4} />
      <Rect x={44} y={108} width={14} height={28} rx={5} fill="url(#ha_steel)" stroke={OL} strokeWidth={2.2} />
      <Rect x={62} y={108} width={14} height={28} rx={5} fill="url(#ha_steel)" stroke={OL} strokeWidth={2.2} />
      <Rect x={40} y={128} width={22} height={12} rx={5} fill="#6F819F" stroke={OL} strokeWidth={2.2} />
      <Rect x={58} y={128} width={22} height={12} rx={5} fill="#6F819F" stroke={OL} strokeWidth={2.2} />
      <Limb d="M40 82 C32 88 30 98 32 106" color="#8FA3C2" w={11} />
      <Path d="M40 78 C40 72 48 70 60 70 C72 70 80 72 80 78 L83 112 C83 118 74 120 60 120 C46 120 37 118 37 112 Z" fill="url(#ha_steel)" stroke={OL} strokeWidth={2.5} />
      <Path d="M60 72 L60 118 M42 90 C52 96 68 96 78 90" stroke="#5B6E8C" strokeWidth={2} fill="none" />
      <Path d="M54 80 L60 74 L66 80 L66 92 L60 98 L54 92Z" fill="#F6C253" stroke={OL} strokeWidth={1.8} strokeLinejoin="round" />
      <Rect x={37} y={105} width={46} height={9} fill="#F6C253" stroke={OL} strokeWidth={2} />
      <Limb d="M80 82 C88 82 92 85 94 90" color="#8FA3C2" w={11} />
      <Circle cx={36} cy={80} r={13} fill="url(#ha_steel)" stroke={OL} strokeWidth={2.4} />
      <Circle cx={84} cy={80} r={13} fill="url(#ha_steel)" stroke={OL} strokeWidth={2.4} />
      <Path d="M28 76 Q36 70 44 76 M76 76 Q84 70 92 76" stroke="#F6C253" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <Circle cx={31} cy={108} r={6} fill="#8FA3C2" stroke={OL} strokeWidth={2} />
    </G>
  );
}
function TankHead() {
  return (
    <G>
      <Path d="M34 52 C30 18 90 18 86 52 L80 52 L80 42 C70 36 50 36 40 42 L40 52Z" fill="url(#ha_steel)" stroke={OL} strokeWidth={2.4} strokeLinejoin="round" />
      <Path d="M34 52 L34 64 L42 62 L40 52Z M86 52 L86 64 L78 62 L80 52Z" fill="#6F819F" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
      <Rect x={57} y={38} width={6} height={20} rx={2} fill="#6F819F" stroke={OL} strokeWidth={1.8} />
      <Path d="M36 40 C46 33 74 33 84 40" stroke="#F6C253" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Path d="M60 22 C52 6 64 -2 72 4 C70 10 74 18 66 24 Z" fill="#E8456B" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
      <Rect x={55} y={18} width={10} height={8} rx={2} fill="#F6C253" stroke={OL} strokeWidth={1.8} />
    </G>
  );
}

function Mage() {
  return (
    <G>
      <Path d="M38 80 C28 100 22 128 24 144 L96 144 C98 128 92 100 82 80Z" fill="#5469D4" stroke={OL} strokeWidth={2.5} />
      <Path d="M44 110 L40 144 M60 106 L60 144 M76 110 L80 144" stroke="#3B4BA6" strokeWidth={2} fill="none" />
      <Path d="M24 138 L96 138" stroke="#F6C253" strokeWidth={5} />
      <Path d="M26 144 L94 144" stroke={OL} strokeWidth={2.4} />
      <Limb d="M40 82 C32 88 30 98 32 106" color="#5469D4" w={12} />
      <Path d="M40 78 C40 72 48 70 60 70 C72 70 80 72 80 78 L82 112 L38 112 Z" fill="#6A7FE8" stroke={OL} strokeWidth={2.5} />
      <Path d="M52 71 L60 90 L68 71" fill="#F6C253" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
      <Rect x={38} y={104} width={44} height={8} fill="#F6C253" stroke={OL} strokeWidth={2} />
      <Circle cx={60} cy={108} r={4.5} fill="#B58CFF" stroke={OL} strokeWidth={1.6} />
      <Limb d="M80 82 C88 82 92 85 94 90" color="#5469D4" w={12} />
      <Path d="M24 108 C26 114 38 114 40 108" stroke="#F6C253" strokeWidth={3} fill="none" />
      <Circle cx={31} cy={110} r={5} fill={SKIN} stroke={OL} strokeWidth={2} />
      <Path d="M70 118 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2z M48 126 l1 2.4 2.4 1 -2.4 1 -1 2.4 -1 -2.4 -2.4 -1 2.4 -1z" fill="#FFE28A" />
    </G>
  );
}
function MageHead() {
  return (
    <G>
      <Path d="M35 52 C32 40 36 32 42 30 L50 40 L60 36 L70 40 L78 30 C84 32 88 40 85 52 C82 44 74 40 60 40 C46 40 38 44 35 52Z" fill="#DDE8FF" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M32 52 C30 66 32 78 38 84 C38 72 40 62 40 52Z M88 52 C90 66 88 78 82 84 C82 72 80 62 80 52Z" fill="#DDE8FF" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
      <Ellipse cx={60} cy={34} rx={36} ry={8.5} fill="#7B5CD6" stroke={OL} strokeWidth={2.4} />
      <Path d="M41 33 C45 28 50 20 56 12 C62 4 70 3 78 2 C72 8 74 12 76 20 C78 26 80 30 80 33 C72 37 48 37 41 33Z" fill="#8A6BE6" stroke={OL} strokeWidth={2.4} strokeLinejoin="round" />
      <Path d="M42 31 C52 35 70 35 79 31 L80 26 C70 30 52 30 42 26Z" fill="#F6C253" stroke={OL} strokeWidth={1.6} />
      <Path d="M58 22 l1.4 3.2 3.2 1.4 -3.2 1.4 -1.4 3.2 -1.4 -3.2 -3.2 -1.4 3.2 -1.4z M67 13 l1 2.2 2.2 1 -2.2 1 -1 2.2 -1 -2.2 -2.2 -1 2.2 -1z" fill="#FFF3B8" />
    </G>
  );
}

function Rogue() {
  return (
    <G>
      <Path d="M44 80 C28 96 26 124 36 140 C46 130 40 108 52 92Z" fill="#244F42" stroke={OL} strokeWidth={2.2} />
      <Path d="M80 82 C98 86 106 108 100 126 C92 116 84 108 76 104Z" fill="#E8456B" stroke={OL} strokeWidth={2.2} />
      <Rect x={46} y={108} width={12} height={28} rx={5} fill="#2F3A4A" stroke={OL} strokeWidth={2.2} />
      <Rect x={62} y={108} width={12} height={28} rx={5} fill="#2F3A4A" stroke={OL} strokeWidth={2.2} />
      <Rect x={42} y={128} width={19} height={12} rx={5} fill="#1F2733" stroke={OL} strokeWidth={2.2} />
      <Rect x={59} y={128} width={19} height={12} rx={5} fill="#1F2733" stroke={OL} strokeWidth={2.2} />
      <Limb d="M42 80 C34 86 31 97 33 106" color="#2F6B55" />
      <Path d="M42 79 C42 73 50 71 60 71 C70 71 78 73 78 79 L80 112 C80 117 74 119 60 119 C46 119 40 117 40 112 Z" fill="#2F6B55" stroke={OL} strokeWidth={2.5} />
      <Path d="M42 80 L78 110 M78 80 L42 110" stroke="#1E4538" strokeWidth={4} />
      <Rect x={40} y={104} width={40} height={8} fill="#6A4A33" stroke={OL} strokeWidth={2} />
      <Rect x={56} y={103} width={8} height={10} rx={1.5} fill="#F6C253" stroke={OL} strokeWidth={1.6} />
      <Path d="M70 108 L76 124 L70 126 L66 112Z" fill="#B7C5DB" stroke={OL} strokeWidth={1.6} strokeLinejoin="round" />
      <Limb d="M78 80 C86 80 90 84 92 90" color="#2F6B55" />
      <Circle cx={33} cy={108} r={5} fill="#1E2A33" stroke={OL} strokeWidth={2} />
    </G>
  );
}
function RogueHeadBack() {
  return <Circle cx={60} cy={50} r={29} fill="#244F42" stroke={OL} strokeWidth={2.4} />;
}
function RogueHead() {
  return (
    <G>
      <Path d="M32 54 C30 24 90 24 88 54 C86 40 76 30 60 30 C44 30 34 40 32 54Z" fill="#2F6B55" stroke={OL} strokeWidth={2.2} strokeLinejoin="round" />
      <Path d="M35 59 C46 68 74 68 85 59 L85 70 C76 80 44 80 35 70Z" fill="#1E4538" stroke={OL} strokeWidth={2.2} strokeLinejoin="round" />
      <Path d="M52 68 C60 72 68 72 75 68" stroke="#4FB58C" strokeWidth={1.8} fill="none" strokeLinecap="round" />
      <Path d="M86 62 C100 62 106 74 110 82 C100 78 94 76 86 74Z" fill="#E8456B" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
    </G>
  );
}

const CLASS_VIEW: Record<HeroClassKey, { body: React.ReactElement; head: React.ReactElement; headBack?: React.ReactElement; hand: [number, number] }> = {
  villager: { body: <Villager />, head: <VillagerHead />, hand: [93, 90] },
  berserker: { body: <Berserker />, head: <BerserkerHead />, hand: [95, 90] },
  tank: { body: <Tank />, head: <TankHead />, hand: [95, 90] },
  mage: { body: <Mage />, head: <MageHead />, hand: [95, 90] },
  rogue: { body: <Rogue />, head: <RogueHead />, headBack: <RogueHeadBack />, hand: [93, 90] },
};

interface Props {
  klass: HeroClassKey;
  mood: HeroMood;
  weaponId?: string | null;
  size?: number;
}

export default function HeroArt({ klass, mood, weaponId, size = 120 }: Props) {
  const view = CLASS_VIEW[klass];
  const [hx, hy] = view.hand;
  return (
    <Svg width={size} height={(size * 150) / 120} viewBox="0 0 120 150">
      <Defs>
        <LinearGradient id="ha_steel" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#E3ECFA" />
          <Stop offset="1" stopColor="#7E92B4" />
        </LinearGradient>
      </Defs>
      <Ellipse cx={60} cy={142} rx={32} ry={5} fill="#000" opacity={0.25} />
      {view.headBack}
      {view.body}
      <Rect x={54} y={68} width={12} height={9} fill="#F2B896" stroke={OL} strokeWidth={2} />
      <Circle cx={36} cy={53} r={4.5} fill={SKIN} stroke={OL} strokeWidth={2} />
      <Circle cx={84} cy={53} r={4.5} fill={SKIN} stroke={OL} strokeWidth={2} />
      <Circle cx={60} cy={50} r={25} fill={SKIN} stroke={OL} strokeWidth={2.5} />
      <Face mood={mood} />
      {view.head}
      {weaponId ? (
        <G transform={`translate(${hx} ${hy}) rotate(${weaponId === 'staff_arcane' ? 8 : 24}) scale(0.95) translate(-24 -38)`}>
          <ItemShapes id={weaponId} />
        </G>
      ) : null}
      <Circle cx={hx} cy={hy} r={5.5} fill={klass === 'rogue' ? '#1E2A33' : klass === 'tank' ? '#8FA3C2' : SKIN} stroke={OL} strokeWidth={2} />
    </Svg>
  );
}
