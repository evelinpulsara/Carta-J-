export interface Memory {
  src: string;
  caption: string;
  rotate: number;
}

// Placeholders claramente identificables en /public/memories/.
// Para usar fotos reales: reemplaza los archivos SVG por tus imágenes
// (mismo nombre o actualiza "src") sin tocar el resto del código.

export const memories: Memory[] = [
  { src: "/memories/memory-1.svg", caption: "Tú y yo (alguna vez) ♡", rotate: -6 },
  { src: "/memories/memory-2.svg", caption: "Cosas simples que significaban todo", rotate: 4 },
  { src: "/memories/memory-3.svg", caption: "Gracias por todo lo vivido", rotate: -3 },
  { src: "/memories/memory-4.svg", caption: "", rotate: 7 },
  { src: "/memories/memory-5.svg", caption: "Eres parte de mi historia…", rotate: -8 },
  { src: "/memories/memory-6.svg", caption: "Algunas imágenes también cuentan historias", rotate: 5 },
];
