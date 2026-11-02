# 🎬 Guion del video (5 a 7 minutos)

Estructura obligatoria del taller: 4 momentos. Aparece en cámara o narra con tu voz, con el editor y la app (emulador o dispositivo) visibles a la vez.

Antes de grabar: abre la app **recién iniciada** (consola vacía), editor con `statsSlice.ts`, `inventorySlice.ts`, `actionLogSlice.ts`, `selectors.ts` y `store/index.ts` en pestañas.

---

## ⏱️ 0:00 – 1:30 | El problema arquitectónico (conceptual)

**Muestra:** la app corriendo, recorriendo las 4 zonas con el dedo.

**Di (con tus palabras):**
- "Hay cuatro zonas que reaccionan entre sí: el Avatar, el Panel de Atributos, la Armería y la Consola de eventos."
- "Si usara solo `useState`, tendría que subir el estado al componente padre y pasarlo por props: **prop drilling**. Y el peso total, la sobrecarga o el poder tendría que guardarlos en varios estados locales que terminarían **desincronizados**."
- El ciclo unidireccional, señalando la consola que dice `UI → dispatch(action) → reducer → store → selector → UI`:
  1. El componente despacha una acción (`dispatch`).
  2. El reducer calcula el nuevo estado.
  3. El Store lo guarda y avisa.
  4. Los selectores recalculan lo derivado.
  5. Los componentes suscritos se re-renderizan.

---

## ⏱️ 1:30 – 3:30 | Demostración visual: el "efecto dominó"

Haz esto **en este orden** (cada paso demuestra algo distinto):

1. **Un toque, cuatro reacciones.** Equipa `Espada de Fuego`. Señala: barra de carga (HUD), arma en la mano del avatar, poder de combate, nueva línea en la consola y comentario de Hermenegildo.
2. **Preset.** Toca `🔮 Build Mago`. *Una sola acción* cambia: los 15 puntos, la clase (Archimago), el color del aura, el sprite y el poder.
3. **Sobrecarga (obligatoria).** `🔄 Reset` → equipa `Armadura Maldita` + `Escudo de Titanio`. Muestra: barra de carga en rojo, "¡SOBRECARGADO! (-50% Velocidad)", poder reducido 30%, cara del avatar asustada.
4. **Combate/daño (obligatorio).** Toca `⚔️ Atacar al Jefe` varias veces hasta que el HP baje: la barra de vida pasa de verde a amarillo a rojo. Deja que llegue a 0 (avatar derrotado 😵) y cúralo con `🧪 Curar`.
5. **Inspector.** Termina señalando la consola: `[inventory/toggleEquipItem] -> "Espada de Fuego"`, `[stats/applyBuildPreset] -> "MAGE"`, etc.

---

## ⏱️ 3:30 – 5:30 | Recorrido por el código (slices, Immer y selectores)

1. **`store/index.ts`** — `configureStore` con tres reducers (`stats`, `inventory`, `actionLog`), y los hooks tipados `useAppDispatch` / `useAppSelector`.
2. **Un reducer, a fondo:** elige `toggleEquipItem` (o `applyBuildPreset`).
   - "El `action.payload` es el id del ítem (un `string`) / el nombre del preset."
   - "Parece que mutara el estado (`state.equippedIds.push(...)`), pero RTK usa **Immer**: recibo un *draft* (un Proxy), Immer registra los cambios y produce un objeto nuevo e inmutable. Por eso no escribo `{...state}`."
3. **`actionLogSlice.ts`** — "Este slice no tiene reducers de registro: usa `extraReducers` con `addMatcher(isAnyOf(...))` y se alimenta solo cuando cualquier otro slice despacha."
4. **`selectors.ts`** — Muestra `selectIsOverencumbered` y `selectCombatPower`.
   - "El poder y la sobrecarga **no están guardados** en ningún slice: son **estado derivado**. Se calculan cruzando `statsSlice` + `inventorySlice`. Si los guardara, tendría que acordarme de actualizarlos en cada reducer y podrían contradecirse."
   - Menciona `createSelector`: memoización, solo recalcula si cambian las entradas.
5. **Un componente** (ej. `HeroAvatarHUD.tsx`): "No recibe props ni tiene botones: solo usa `useAppSelector`. Cero prop drilling."

---

## ⏱️ 5:30 – 6:30 | Conclusión y casos de uso reales

Responde con criterio: **¿cuándo `useState` y cuándo Redux Toolkit?**

- **`useState` (estado local):** estado que solo usa un componente y se descarta con él. *Ejemplo en este proyecto:* la vida del jefe y si el inspector está colapsado (solo los usa la Zona D). Otros: texto de un input, un modal abierto/cerrado.
- **Redux Toolkit (estado global):** estado que muchas pantallas leen o modifican, que tiene reglas de negocio y valores derivados. *Ejemplo:* la vida del héroe, atributos e inventario (los leen el HUD, el inspector y Hermenegildo). En apps reales: carrito de compras, sesión de usuario, filtros compartidos, sincronización con servidor.
- Criterio de cierre: "Empiezo con estado local y escalo a Redux cuando aparece prop drilling, estado duplicado o cálculos que dependen de varios módulos."

---

## ✅ Checklist antes de subir el video

- [ ] Dura entre 5 y 7 minutos.
- [ ] Se ve el código y la app corriendo al mismo tiempo.
- [ ] Provocaste **sobrecarga** y **daño/combate** a propósito.
- [ ] Explicaste Action → Reducer → Store → Selector con tus palabras.
- [ ] Explicaste Immer y qué viaja en `action.payload`.
- [ ] Explicaste por qué poder y sobrecarga son estado derivado.
- [ ] Respondiste cuándo `useState` y cuándo Redux.
- [ ] Enlace al repositorio de GitHub listo para entregar.

## 🎤 Preguntas que podrían hacerte

- *¿Por qué `createSelector` y no una función normal?* Memoización: devuelve la misma referencia si las entradas no cambian, evitando re-renders.
- *¿Por qué el log no se escribe desde los componentes?* Porque `addMatcher` lo centraliza: ningún componente puede "olvidarse" de registrar.
- *¿Por qué la vida del jefe no está en Redux?* Solo la usa una zona; no justifica estado global.
- *¿Qué pasa si intento `incrementStat` sin puntos?* El reducer lo ignora (`return` temprano), no depende de que la UI deshabilite el botón.
