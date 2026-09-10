export interface Song {
  title: string;
  artist: string;
  url?: string;
}

// Reemplaza estos placeholders por las canciones reales cuando las tengas.
// El reproductor no necesita integración con Spotify: es solo la interfaz.

export const songsThatRemindMeOfYou: Song[] = [
  {
    title: "Hate You",
    artist: "Jungkook",
    url: "https://www.youtube.com/watch?v=oF6E_T6CRZs&list=RDoF6E_T6CRZs&start_radio=1",
  },
  {
    title: "Final Feliz",
    artist: "Karol G",
    url: "https://www.youtube.com/watch?v=HiuJq-Z0oPo&list=RDHiuJq-Z0oPo&start_radio=1",
  },
  {
    title: "Risk It All",
    artist: "Bruno Mars",
    url: "https://www.youtube.com/watch?v=0y5yloj44Io&list=RD0y5yloj44Io&start_radio=1",
  },
  {
    title: "Melancolia",
    artist: "Mon Laferte",
    url: "https://www.youtube.com/watch?v=5yvR5F13GBw&list=RD5yvR5F13GBw&start_radio=1",
  },
];

export const songsThatHelpedMeLetGo: Song[] = [
  {
    title: "Grenade",
    artist: "Bruno Mars",
    url: "https://www.youtube.com/watch?v=qDEUNE96i8w&list=RDqDEUNE96i8w&start_radio=1",
  },
  {
    title: "Don´t",
    artist: "eAeon ft RM",
    url: "https://www.youtube.com/watch?v=BZTAAs4Z1FI&list=RDBZTAAs4Z1FI&start_radio=1",
  },
  {
    title: "Lejos de ti",
    artist: "The Marias",
    url: "https://www.youtube.com/watch?v=RpR8DDOK1r0&list=RDRpR8DDOK1r0&start_radio=1",
  },
  {
    title: "No One Noticed",
    artist: "The Marias",
    url: "https://www.youtube.com/watch?v=IP89SayAZG0&list=RDIP89SayAZG0&start_radio=1",
  },
];
