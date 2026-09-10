export interface Song {
  title: string;
  artist: string;
}

// Reemplaza estos placeholders por las canciones reales cuando las tengas.
// El reproductor no necesita integración con Spotify: es solo la interfaz.

export const songsThatRemindMeOfYou: Song[] = [
  { title: "Hate You", artist: "Jungkook" },
  { title: "Final Feliz", artist: "Karol G" },
  { title: "Risk It All", artist: "Bruno Mars" },
  { title: "Melancolia", artist: "Mon Laferte" },
];

export const songsThatHelpedMeLetGo: Song[] = [
  { title: "Grenade", artist: "Bruno Mars" },
  { title: "Don´t", artist: "eAeon ft RM" },
  { title: "Lejos de ti", artist: "The Marias" },
  { title: "No One Noticed", artist: "The Marias" },
];
