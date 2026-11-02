# Matriz de cumplimiento — Taller "HeroForge RPG"

La interfaz se rediseñó como una arena RPG de fantasía, manteniendo los requisitos académicos del documento. Las mejoras de presentación no sustituyen ni alteran la arquitectura exigida.

## Requisitos que se conservan

- **Cuatro zonas independientes:** `HeroAvatarHUD`, `StatsControlPanel`, `ArmoryGrid` y `ReduxLiveInspector`. `App.tsx` no les pasa datos ni callbacks entre sí; cada zona accede al Store con los hooks tipados.
- **Tres slices requeridos:** `statsSlice`, `inventorySlice` y `actionLogSlice`, registrados en `configureStore`.
- **Estado inicial y reducers de stats:** 15 puntos disponibles, STR/AGI/INT en 5, HP en 100; `incrementStat`, `decrementStat`, `takeDamage`, `healHero`, `applyBuildPreset` y `resetStats`.
- **Inventario:** catálogo de 8 objetos, `equippedIds`, `toggleEquipItem` y `clearEquipment`.
- **Log Redux:** `actionLogSlice` registra automáticamente acciones de stats e inventario mediante `extraReducers` y `addMatcher`; el inspector muestra las últimas 5 acciones con tipo y payload.
- **Selectores derivados:** estadísticas totales, peso, capacidad, sobrecarga, poder, velocidad, clase, aspecto y estado de salud se calculan en `selectors.ts`, no se guardan en los slices.
- **Feedback visual:** barras animadas, avatar y aura reactivos, expresión por estado, alerta de sobrecarga y consola en vivo.

## Mejoras visuales añadidas sin cambiar el contrato del taller

- Tema oscuro de fantasía, cabecera de juego y superficies de alto contraste.
- Arena con cuatro jefes de distinta apariencia y vida máxima. La vida y selección del jefe se mantienen en estado local de `ReduxLiveInspector`, porque el jefe solo se utiliza en esa zona; no se añade un cuarto slice ni se altera el Store requerido.
- Animación de avance del héroe, sacudida del jefe, destello de impacto y número de daño flotante al atacar.
- El jefe contraataca y despacha `takeDamage`, de modo que el HP del héroe continúa actualizándose mediante Redux y se refleja en las otras zonas.
- Inspector reorganizado: contador de acciones, agrupación visual por slice, payload y opción para plegar el registro.
- La arena y el inspector están dentro del flujo de desplazamiento para no tapar el resto de zonas en pantallas pequeñas.

## Límites respetados

No se añadieron monedas, experiencia, niveles, inventario de botín, maná consumible, guardado persistente ni un sistema de misiones. Esas mecánicas no están solicitadas por el enunciado y podrían distraer de la evaluación de Redux. La barra de energía/maná sigue siendo el valor derivado que ya calcula el selector.

## Entrega y comprobación

Ejecuta `npm install`, después `npm run typecheck` y `npx expo start`. Prueba en Expo Go o emulador:

1. Cambiar un preset y comprobar que el avatar y el poder cambian.
2. Equipar varios objetos hasta provocar sobrecarga y comprobar la penalización.
3. Atacar un jefe y observar la animación, el contraataque, el cambio de HP y el registro Redux.
4. Derrotar un jefe y pasar al siguiente.
5. Curar y comprobar que el HUD se actualiza.

Para el video de 5–7 minutos, conserva el guion del documento: problema arquitectónico, efecto dominó, recorrido por slices/selectores y conclusión sobre estado local frente a global. Explica que la vida del jefe es local porque solo la usa la arena; la vida del héroe es global porque la observan varias zonas.
