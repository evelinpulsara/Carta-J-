export type ChapterId =
  | "cover"
  | "index"
  | "beginning"
  | "after"
  | "new-me"
  | "curious-fact"
  | "elizabeth"
  | "before-leaving"
  | "thanks-sorry"
  | "songs"
  | "clarification";

export type TocIcon =
  | "letter"
  | "leaf"
  | "sprout"
  | "moon"
  | "photos"
  | "note"
  | "star"
  | "seal"
  | "music";

export interface ChapterEntry {
  id: ChapterId;
  number: string;
  title: string;
  teaser: string;
  icon: TocIcon;
  locked?: boolean;
}

export const chapters: ChapterEntry[] = [
  {
    id: "beginning",
    number: "01",
    title: "Comienzo",
    teaser: "La vida a veces pone en nuestro camino personas especiales.",
    icon: "letter",
  },
  {
    id: "after",
    number: "02",
    title: "Lo que pasó después",
    teaser: "Del dolor que alguna vez sentí, aprendí a sanar.",
    icon: "leaf",
  },
  {
    id: "new-me",
    number: "03",
    title: "La versión de mí que no conoces",
    teaser: "Tal vez tú solo tengas el peor recuerdo de mí.",
    icon: "sprout",
  },
  {
    id: "curious-fact",
    number: "04",
    title: "Dato Curioso",
    teaser: "¿Puedes creer que un día le pedí a la luna que me ayudara?",
    icon: "star",
  },
  {
    id: "elizabeth",
    number: "05",
    title: "Elizabeth",
    teaser: "Una pequeña historia que también quedó pendiente.",
    icon: "moon",
  },
  {
    id: "before-leaving",
    number: "06",
    title: "Lo que quería decirte antes de irme",
    teaser: "Sé feliz, corazón de melón.",
    icon: "note",
  },
  {
    id: "thanks-sorry",
    number: "07",
    title: "Gracias y Perdón",
    teaser: "Fuiste y serás mi mayor motivación en mi vida.",
    icon: "photos",
  },
  {
    id: "songs",
    number: "08",
    title: "Canciones que me recordaron a ti",
    teaser: "Hay canciones que no hablan de ti, pero me recuerdan a ti.",
    icon: "music",
  },
  {
    id: "clarification",
    number: "09",
    title: "Aclaración",
    teaser: "Abrir bajo tu propia responsabilidad.",
    icon: "seal",
    locked: true,
  },
];

export const chapterOrder: ChapterId[] = [
  "cover",
  "index",
  ...chapters.map((c) => c.id),
];
