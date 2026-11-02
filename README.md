# ⚔️ HeroForge RPG

Mini-juego móvil para el taller de **Desarrollo Móvil**: arquitectura de estado visual con **Redux Toolkit** en **React Native (Expo + TypeScript)**.

Cada acción despachada en un rincón de la pantalla reacciona de inmediato en varios componentes independientes: avatar, panel de atributos, armería, inspector de Redux (y Hermenegildo 🤡, el payaso narrador).

## Cómo correrlo

```bash
npm install
npx expo install --fix   # alinea las versiones de Expo / React Native con tu SDK
npx expo start
```

Escanea el QR con **Expo Go** (o abre el emulador con `a` / `i`).

Para revisar tipos: `npm run typecheck`.

## Estructura

```
App.tsx                      Provider + colocación de las zonas (sin props entre ellas)
index.ts                     registerRootComponent
src/
├── theme.ts                 tema fantasy oscuro, acentos por atributo y colores de nivel
├── store/                   TODA la lógica de estado
│   ├── index.ts             configureStore + useAppDispatch / useAppSelector tipados
│   ├── selectors.ts         estado derivado (createSelector): stats totales, peso, poder, clase...
│   └── slices/
│       ├── statsSlice.ts      atributos, puntos, HP, presets
│       ├── inventorySlice.ts  catálogo de 8 ítems + equippedIds
│       └── actionLogSlice.ts  historial alimentado con extraReducers + addMatcher
└── components/              SOLO UI (sin lógica de negocio pesada)
    ├── HeroAvatarHUD.tsx      Zona A
    ├── StatsControlPanel.tsx  Zona B
    ├── ArmoryGrid.tsx         Zona C
    ├── ReduxLiveInspector.tsx Zona D
    ├── Hermenegildo.tsx       mascota (lee el Store, sin props)
    └── StatBar.tsx            barra animada reutilizable
```

## Flujo de datos (el ciclo unidireccional)

```
Componente (onPress)
   └─▶ dispatch(action)            ej. toggleEquipItem('armor_cursed')
          └─▶ Reducer (Immer)      inventorySlice actualiza equippedIds
                 └─▶ Store         + actionLogSlice anota la acción (addMatcher)
                        └─▶ Selectores recalculan: peso, sobrecarga, poder, clase...
                               └─▶ Re-render de HUD, Armería, Inspector y Hermenegildo
```

## Reglas del juego (todas derivadas en `selectors.ts`)

| Valor | Fórmula |
|---|---|
| Stats totales | base (statsSlice) + bonos de ítems equipados (inventorySlice) |
| Capacidad máxima | `10 + (STR total × 2)` |
| Sobrecarga | `peso equipado > capacidad` → −30% poder, −50% velocidad |
| Poder de combate | `STR×3 + AGI×2 + INT×3` (×0.7 si está sobrecargado) |
| Clase visual | stat dominante total ≥ 15: STR → Guerrero Berserker (carga ≥ 30 kg: Tanque Pesado), INT → Archimago, AGI → Asesino Sombrío; si no, Aldeano |

## Arena de combate

La Zona D incluye cuatro jefes (Dragón Algodón de Azúcar, Gólem de Obsidiana, Reina Araña Umbría y Fénix Carmesí). Al atacar, el héroe avanza, el jefe recibe una sacudida, aparece un destello y se muestra el daño flotante. Si el jefe sobrevive, contraataca y despacha `takeDamage` para actualizar el HP global del héroe. La vida/selección del jefe se mantiene en estado local porque solo la arena la utiliza; no se añadió un slice fuera de los tres exigidos.

El inspector se puede plegar y agrupa visualmente las últimas cinco acciones por slice. La arena y las cuatro zonas están en el scroll principal para no cubrir el contenido en móviles.

## Probar los momentos del video

- **Preset:** `🔮 Build Mago` → cambia clase, aura, sprite y poder en un solo dispatch.
- **Sobrecarga:** con stats base, equipa `Armadura Maldita` + `Escudo de Titanio`.
- **Combate/daño:** `⚔️ Atacar` anima el golpe y, si el jefe sobrevive, hiere al héroe; `🧪 Curar` lo restaura. Con HP en 0 el avatar queda derrotado.
- **Inspector:** el inspector muestra las últimas 5 acciones con su `type` y `payload`.


## Actualización visual
- Hermenegildo ahora es un personaje payaso ilustrado con formas de React Native.
- La consola Redux está fija como panel flotante inferior y se puede plegar.
- El tema usa una paleta pastel de fantasía sobre fondos ciruela.
