// Ilustraciones vectoriales de los ítems (48x48). Sin emojis: todo es SVG.
import React from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Polygon, RadialGradient, Rect, Stop } from 'react-native-svg';

const OL = '#2A2145';

// Formas del ítem en un lienzo de 48x48 (se reutiliza dentro de la mano del héroe).
export function ItemShapes({ id }: { id: string }) {
  switch (id) {
    case 'sword_fire':
      return (
        <G>
          <Defs>
            <LinearGradient id="sf_blade" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#FFF3B0" />
              <Stop offset="0.55" stopColor="#FFB347" />
              <Stop offset="1" stopColor="#FF5D5D" />
            </LinearGradient>
          </Defs>
          <Path d="M24 1 C28 6 30 9 30 13 L30 30 L18 30 L18 13 C18 9 20 6 24 1Z" fill="url(#sf_blade)" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
          <Path d="M24 6 L24 29" stroke="#FFF8D6" strokeWidth={2} strokeLinecap="round" opacity={0.9} />
          <Path d="M13 9 C10 13 12 16 14 17 C13 14 15 12 16 11 Z" fill="#FF8A3D" />
          <Path d="M35 10 C38 14 36 17 34 18 C35 15 33 13 32 12 Z" fill="#FF8A3D" />
          <Rect x="9" y="29" width="30" height="6" rx="3" fill="#F6C253" stroke={OL} strokeWidth={2} />
          <Circle cx="24" cy="32" r="2.2" fill="#E8456B" stroke={OL} strokeWidth={1} />
          <Rect x="21" y="35" width="6" height="8" rx="1.5" fill="#8B4B3A" stroke={OL} strokeWidth={2} />
          <Circle cx="24" cy="45" r="3" fill="#F6C253" stroke={OL} strokeWidth={2} />
        </G>
      );
    case 'shield_titan':
      return (
        <G>
          <Defs>
            <LinearGradient id="st_body" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#F2F6FF" />
              <Stop offset="1" stopColor="#7F95B8" />
            </LinearGradient>
          </Defs>
          <Path d="M24 3 L42 9 L42 24 C42 34 34 41 24 46 C14 41 6 34 6 24 L6 9 Z" fill="url(#st_body)" stroke={OL} strokeWidth={2.5} strokeLinejoin="round" />
          <Path d="M24 8 L37 12.5 L37 24 C37 31 31 36 24 40 C17 36 11 31 11 24 L11 12.5 Z" fill="#5E7CC4" stroke={OL} strokeWidth={1.5} />
          <Path d="M24 11 L24 37 M13 21 L35 21" stroke="#FFE28A" strokeWidth={3.5} strokeLinecap="round" />
          <Circle cx="24" cy="21" r="4" fill="#FFE28A" stroke={OL} strokeWidth={1.5} />
          <Circle cx="10" cy="12" r="1.6" fill="#FFF" />
          <Circle cx="38" cy="12" r="1.6" fill="#FFF" />
        </G>
      );
    case 'staff_arcane':
      return (
        <G>
          <Defs>
            <RadialGradient id="sa_orb" cx="0.4" cy="0.35" r="0.8">
              <Stop offset="0" stopColor="#F3E6FF" />
              <Stop offset="0.5" stopColor="#A872F2" />
              <Stop offset="1" stopColor="#5A2FB0" />
            </RadialGradient>
          </Defs>
          <Circle cx="24" cy="11" r="10" fill="#C9A6FF" opacity={0.35} />
          <Rect x="22" y="16" width="4.5" height="30" rx="2" fill="#9A6B45" stroke={OL} strokeWidth={2} />
          <Path d="M15 8 C13 16 19 19 24 19 C29 19 35 16 33 8" fill="none" stroke="#F6C253" strokeWidth={3.5} strokeLinecap="round" />
          <Circle cx="24" cy="10" r="7" fill="url(#sa_orb)" stroke={OL} strokeWidth={2} />
          <Path d="M21 7 Q22.5 5.5 24 6" stroke="#FFF" strokeWidth={1.8} strokeLinecap="round" fill="none" />
          <Path d="M39 18 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2z" fill="#FFE28A" />
          <Path d="M8 22 l1 2.4 2.4 1 -2.4 1 -1 2.4 -1 -2.4 -2.4 -1 2.4 -1z" fill="#C9A6FF" />
        </G>
      );
    case 'boots_elf':
      return (
        <G>
          <Defs>
            <LinearGradient id="be_body" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#9BE8B0" />
              <Stop offset="1" stopColor="#2E9A6B" />
            </LinearGradient>
          </Defs>
          <Path d="M10 3 L28 3 L28 24 C28 27 30 28 33 29.5 L40 33 C45 35.5 44 43 38 43 L12 43 C8.5 43 8 39 10 36 Z" fill="url(#be_body)" stroke={OL} strokeWidth={2.5} strokeLinejoin="round" />
          <Rect x="8.5" y="3" width="21" height="7" rx="3" fill="#FFE28A" stroke={OL} strokeWidth={2} />
          <Path d="M10 40 L40 40" stroke={OL} strokeWidth={3} strokeLinecap="round" />
          <Path d="M28 14 C37 6 45 8 46 6 C45 14 38 18 28 20 Z" fill="#FFFFFF" stroke={OL} strokeWidth={1.8} strokeLinejoin="round" />
          <Path d="M31 15 C36 12 40 11 43 10" stroke="#BFE7FF" strokeWidth={1.4} fill="none" />
          <Path d="M14 14 L14 30" stroke="#D5FFE3" strokeWidth={2} strokeLinecap="round" opacity={0.7} />
        </G>
      );
    case 'armor_cursed':
      return (
        <G>
          <Defs>
            <LinearGradient id="ac_body" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#7A55B8" />
              <Stop offset="1" stopColor="#2B1B4A" />
            </LinearGradient>
          </Defs>
          <Path d="M3 11 L11 6 L15 14 L9 20 Z" fill="#4A2F7A" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
          <Path d="M45 11 L37 6 L33 14 L39 20 Z" fill="#4A2F7A" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
          <Path d="M12 7 L19 4 L24 8 L29 4 L36 7 L35 36 L24 45 L13 36 Z" fill="url(#ac_body)" stroke={OL} strokeWidth={2.5} strokeLinejoin="round" />
          <Path d="M24 8 L24 42" stroke="#E255D9" strokeWidth={2} opacity={0.8} />
          <Path d="M17 19 L22 21 L22 24 L17 22 Z M31 19 L26 21 L26 24 L31 22 Z" fill="#FF5BE0" />
          <Path d="M17 30 L24 33 L31 30" stroke="#E255D9" strokeWidth={2} fill="none" strokeLinecap="round" />
          <Path d="M4 6 L7 1 L9 7 Z M44 6 L41 1 L39 7 Z" fill="#E255D9" stroke={OL} strokeWidth={1.2} />
        </G>
      );
    case 'dagger_shadow':
      return (
        <G>
          <Defs>
            <LinearGradient id="ds_blade" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#8FA3C2" />
              <Stop offset="0.5" stopColor="#E8F1FF" />
              <Stop offset="1" stopColor="#4B5C7E" />
            </LinearGradient>
          </Defs>
          <Path d="M24 2 L31 12 L29 31 L19 31 L17 12 Z" fill="url(#ds_blade)" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
          <Path d="M24 6 L24 29" stroke="#FFF" strokeWidth={1.4} opacity={0.8} />
          <Path d="M10 31 C13 27 19 31 24 31 C29 31 35 27 38 31 C35 36 29 34 24 34 C19 34 13 36 10 31Z" fill="#7B4DC9" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
          <Rect x="21" y="34" width="6" height="9" rx="2" fill="#2F2A47" stroke={OL} strokeWidth={2} />
          <Path d="M21.5 37 L26.5 36 M21.5 40 L26.5 39" stroke="#7B4DC9" strokeWidth={1.5} />
          <Circle cx="24" cy="45" r="2.6" fill="#B58CFF" stroke={OL} strokeWidth={1.6} />
          <Path d="M36 16 C40 14 41 10 38 8 C41 12 38 14 36 16Z" fill="#6A4FB5" opacity={0.7} />
        </G>
      );
    case 'nose_magic':
      return (
        <G>
          <Defs>
            <RadialGradient id="nm_nose" cx="0.35" cy="0.3" r="0.85">
              <Stop offset="0" stopColor="#FFB3B3" />
              <Stop offset="0.45" stopColor="#F2424F" />
              <Stop offset="1" stopColor="#A31D3B" />
            </RadialGradient>
          </Defs>
          <Path d="M3 26 C3 20 8 18 13 21 M45 26 C45 20 40 18 35 21" stroke="#F6C253" strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <Circle cx="24" cy="27" r="14" fill="url(#nm_nose)" stroke={OL} strokeWidth={2.5} />
          <Ellipse cx="18.5" cy="21" rx="4.5" ry="3" fill="#FFF" opacity={0.85} transform="rotate(-30 18.5 21)" />
          <Path d="M38 6 l1.8 4.2 4.2 1.8 -4.2 1.8 -1.8 4.2 -1.8 -4.2 -4.2 -1.8 4.2 -1.8z" fill="#FFE28A" stroke={OL} strokeWidth={1} />
          <Path d="M8 8 l1.2 2.8 2.8 1.2 -2.8 1.2 -1.2 2.8 -1.2 -2.8 -2.8 -1.2 2.8 -1.2z" fill="#BFE7FF" />
        </G>
      );
    case 'amulet_candy':
      return (
        <G>
          <Defs>
            <RadialGradient id="ca_body" cx="0.35" cy="0.3" r="0.85">
              <Stop offset="0" stopColor="#FFE3F0" />
              <Stop offset="1" stopColor="#FF6FA8" />
            </RadialGradient>
          </Defs>
          <Path d="M9 3 C9 22 39 22 39 3" fill="none" stroke="#F6C253" strokeWidth={2.5} strokeLinecap="round" strokeDasharray="1 4.5" />
          <Path d="M9 3 C9 22 39 22 39 3" fill="none" stroke="#F6C253" strokeWidth={1.4} />
          <Polygon points="12,30 2,22 2,38" fill="#9ED8FF" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
          <Polygon points="36,30 46,22 46,38" fill="#9ED8FF" stroke={OL} strokeWidth={2} strokeLinejoin="round" />
          <Circle cx="24" cy="30" r="13" fill="url(#ca_body)" stroke={OL} strokeWidth={2.5} />
          <Path d="M24 17 C34 22 14 26 24 30 C34 34 14 38 24 43" fill="none" stroke="#FFF" strokeWidth={3} strokeLinecap="round" opacity={0.9} />
          <Circle cx="18" cy="24" r="2" fill="#FFF" opacity={0.9} />
        </G>
      );
    default:
      return <Circle cx="24" cy="24" r="12" fill="#C9C3DB" stroke={OL} strokeWidth={2} />;
  }
}

export default function ItemArt({ id, size = 48 }: { id: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <ItemShapes id={id} />
    </Svg>
  );
}
