export type ChapterId =
  | "cover"
  | "index"
  | "never-said"
  | "what-happened"
  | "what-i-learned"
  | "about-eli"
  | "memories"
  | "soundtrack"
  | "fragments"
  | "envelope"
  | "last-page";

export type TocIcon =
  | "letter"
  | "leaf"
  | "sprout"
  | "moon"
  | "photos"
  | "note"
  | "star"
  | "seal";

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
    id: "never-said",
    number: "01",
    title: "Lo que nunca dije",
    teaser: "Hay cosas que se quedan dentro incluso cuando una historia termina.",
    icon: "letter",
  },
  {
    id: "what-happened",
    number: "02",
    title: "Lo que pasó",
    teaser: "Entre el amor, el miedo y las heridas que todavía no sabía sanar.",
    icon: "leaf",
  },
  {
    id: "what-i-learned",
    number: "03",
    title: "Lo que aprendí",
    teaser: "Perderte no fue lo que me enseñó a valorarte. Fue lo que me enseñó a entenderme.",
    icon: "sprout",
  },
  {
    id: "about-eli",
    number: "04",
    title: "Sobre Eli",
    teaser: "Una pequeña historia que también quedó pendiente.",
    icon: "moon",
  },
  {
    id: "memories",
    number: "05",
    title: "Recuerdos",
    teaser: "Porque algunas cosas merecen ser recordadas sin necesidad de querer volver.",
    icon: "photos",
  },
  {
    id: "soundtrack",
    number: "06",
    title: "Nuestra banda sonora",
    teaser: "Canciones que alguna vez tuvieron tu nombre.",
    icon: "note",
  },
  {
    id: "fragments",
    number: "07",
    title: "Fragmentos",
    teaser: "Pequeñas palabras que todavía guardan algo de aquella época.",
    icon: "star",
  },
  {
    id: "envelope",
    number: "08",
    title: "Un sobre pendiente",
    teaser: "Hay algo más que también necesitaba decir.",
    icon: "seal",
    locked: true,
  },
  {
    id: "last-page",
    number: "09",
    title: "Última página",
    teaser: "Y aquí es donde dejo esta historia.",
    icon: "star",
  },
];

export const chapterOrder: ChapterId[] = [
  "cover",
  "index",
  ...chapters.map((c) => c.id),
];
