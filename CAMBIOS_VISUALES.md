# HeroForge RPG – actualización visual (v2)

- **Personajes dibujados en vectores (react-native-svg), sin emojis:** 5 clases de héroe (Aldeano, Berserker, Tanque, Archimago, Asesino), cada una con su ropa, su arma en mano y su expresión (feliz, serio, esforzado, herido, crítico, derrotado).
- **Jefes ilustrados:** dragón, gólem, araña y fénix, cada uno con su escenario (bosque, cueva, pantano, volcán).
- **Hermenegildo rediseñado:** payaso con sombrero de copa, pelo rizado, maquillaje, cuello de volantes, globo y expresiones que cambian según lo que pasa en el store.
- **Ítems ilustrados:** las 8 piezas de la armería son SVG, y las tarjetas equipadas brillan en dorado con texto legible.
- **Animación de pelea completa:** el héroe embiste, tajo y destello, el jefe se sacude y muestra el daño; el jefe contraataca, el héroe recibe el golpe (destello rojo), y al morir el jefe se desvanece. El daño al héroe se despacha como `takeDamage` y se ve en todas las zonas.
- **Consola Redux dentro de la Zona D** con las últimas 5 acciones, además de la consola flotante.

La arquitectura del taller no cambió: 3 slices, selectores derivados y 4 zonas sin props entre sí. `selectHeroFace` ahora devuelve un estado de ánimo (no un emoji) y se añadió `selectHeldWeaponId`.

## Instalación
```bash
npm install
npx expo install --fix
npm run typecheck
npx expo start -c
```
