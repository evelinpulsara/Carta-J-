export interface Fragment {
  text: string;
  tone: "rose" | "powder" | "sage" | "lavender";
}

export const fragments: Fragment[] = [
  {
    text: "Tenía miedo de perderme a mí misma y terminé perdiendo algo que quería.",
    tone: "rose",
  },
  {
    text: "No tuve que perderte para saber lo que tenía.",
    tone: "powder",
  },
  {
    text: "No puedo borrar lo que hice, pero puedo asegurarme de no volver a ser esa persona.",
    tone: "sage",
  },
  {
    text: "Tu ausencia dolió, pero también me enseñó a sostenerme.",
    tone: "lavender",
  },
  {
    text: "Hay personas que dejan de formar parte de nuestra vida y aun así forman parte de quienes somos.",
    tone: "rose",
  },
];
