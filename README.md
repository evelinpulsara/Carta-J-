# Para ti… — libro digital de recuerdos

Experiencia web construida con Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, mobile-first.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre http://localhost:3000 — pruébalo sobre todo en un móvil o con las
herramientas de desarrollo en modo responsive (375–430px de ancho).

Para verificar antes de publicar:

```bash
npx tsc --noEmit   # tipos
npx eslint src     # lint
npm run build      # build de producción
```

## Qué falta / qué puedes seguir editando

Todo el contenido que cambia con frecuencia vive en `src/data/`, separado
de los componentes visuales:

- `src/data/chapters.ts` — títulos y frases del índice
- `src/data/content.ts` — **todos los textos largos de cada capítulo**
  (Lo que nunca dije, Lo que pasó, Lo que aprendí, Sobre Eli, el sobre
  pendiente y la última página)
- `src/data/songs.ts` — las dos listas de la banda sonora (por ahora con
  placeholders `Título de la canción — Artista`; no hay integración con
  Spotify, solo la interfaz)
- `src/data/quotes.ts` — las notas sueltas de "Fragmentos"
- `src/data/memories.ts` — las fotos de "Recuerdos": reemplaza los SVG en
  `public/memories/` por tus fotos reales (mismo nombre de archivo, o
  actualiza la ruta `src` en este archivo) y ajusta el `caption`

No deberías necesitar tocar los componentes en `src/components/` solo para
cambiar textos o fotos.

## Estructura de la experiencia

`src/components/BookApp.tsx` es el orquestador: guarda en qué "página" del
libro estás (con `src/lib/useBook.ts`) y decide qué componente mostrar
dentro del marco de libro (`BookFrame.tsx`). Cada sección pedida en el
brief tiene su propio componente:

```
BookCover          → 00 Portada
TableOfContents    → 01 Índice
Chapter (x3)       → 02–04 Lo que nunca dije / Lo que pasó / Lo que aprendí
Chapter (quiet)    → Sobre Eli
MemoriesChapter    → Recuerdos (scrapbook de Polaroids)
MusicPlayer        → Nuestra banda sonora
FragmentsChapter   → Fragmentos (notas dispersas)
EnvelopeChapter    → Un sobre pendiente (apertura voluntaria, fondo oscuro)
LastPage           → Última página (amanecer)
```

## Ya verificado en este entorno

- `npx tsc --noEmit` sin errores
- `npx eslint src` sin errores
- `npm run build` compila limpio (producción, Turbopack)
- Las fuentes (Caveat para lo manuscrito, Newsreader para el cuerpo) están
  autoalojadas vía `@fontsource/*`, así que el build no depende de acceso a
  Google Fonts en tiempo de compilación

## Pendiente de revisar tú mismo

- Prueba real en un dispositivo móvil (tamaños de texto, zonas táctiles,
  el gesto de abrir el sobre)
- Sustituir las fotos placeholder de `public/memories/`
- Completar `songs.ts` con tus canciones reales
- Revisar el timing/velocidad de las animaciones a gusto (todas están
  centralizadas como keyframes en `src/app/globals.css` o como
  transiciones inline en cada componente)
