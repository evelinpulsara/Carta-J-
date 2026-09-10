"use client";

import { useState } from "react";
import { Song, songsThatHelpedMeLetGo, songsThatRemindMeOfYou } from "@/data/songs";
import Paper from "./Paper";
import ContinueLink from "./ContinueLink";

function Vinyl({ spinning }: { spinning: boolean }) {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      className={spinning ? "animate-spin-slow" : ""}
    >
      <circle cx="36" cy="36" r="34" fill="#2b2732" />
      <circle cx="36" cy="36" r="34" fill="none" stroke="#463f4f" strokeWidth="1" />
      <circle cx="36" cy="36" r="26" fill="none" stroke="#463f4f" strokeWidth="0.6" />
      <circle cx="36" cy="36" r="19" fill="none" stroke="#463f4f" strokeWidth="0.6" />
      <circle cx="36" cy="36" r="12" fill="var(--rose)" />
      <circle cx="36" cy="36" r="2.6" fill="#2b2732" />
    </svg>
  );
}

function SongRow({ song }: { song: Song }) {
  const [liked, setLiked] = useState(false);
  return (
    <li className="flex items-center gap-3 py-2.5 border-b border-[var(--paper-line)]/70 last:border-0">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[var(--ink-soft)]">
        <circle cx="7" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9.5 18V6l9-2v11" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <div className="min-w-0 flex-1">
        <p className="font-serif-page text-[15px] text-[var(--ink)] truncate">{song.title}</p>
        <p className="font-serif-page italic text-[12.5px] text-[var(--ink-soft)] truncate">{song.artist}</p>
      </div>
      <button aria-label="Guardar canción" onClick={() => setLiked((v) => !v)} className="shrink-0">
        <svg width="15" height="15" viewBox="0 0 24 24" fill={liked ? "var(--rose-deep)" : "none"}>
          <path
            d="M12 20s-7-4.35-9.5-8.8C.7 7.9 2.2 4 6 4c2.2 0 3.7 1.2 6 3.5C14.3 5.2 15.8 4 18 4c3.8 0 5.3 3.9 3.5 7.2C19 15.65 12 20 12 20z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </li>
  );
}

export default function MusicPlayer({ onContinue }: { onContinue: () => void }) {
  const [playing, setPlaying] = useState(false);

  return (
    <Paper tint="lavender" className="px-5 pt-24 pb-16">
      <p className="font-hand text-xl text-[var(--ink-soft)] mb-1">𐔌՞ ܸ.ˬ.ܸ՞𐦯</p>
      <h2 className="font-hand text-3xl text-[var(--ink)] mb-3">Canciones que me recordaron a ti</h2>
      <p className="font-serif-page text-[16px] leading-relaxed text-[var(--ink)] mb-6">
        Hay canciones que no hablan de ti, pero inevitablemente me recuerdan a ti.
        Y hubo otras que simplemente estuvieron conmigo mientras aprendía a soltarte.
      </p>

      <div
        className="rounded-2xl p-4 flex items-center gap-4 mb-8"
        style={{ background: "rgba(255,255,255,0.4)", boxShadow: "var(--shadow-paper)" }}
      >
        <Vinyl spinning={playing} />
        <div className="flex-1 min-w-0">
          <p className="font-serif-page text-[15px] text-[var(--ink)]">Canciones que me ayudaron a seguir</p>
          <div className="h-1 rounded-full bg-[var(--paper-line)] mt-2 mb-3 overflow-hidden">
            <div className="h-full w-1/3 rounded-full bg-[var(--rose-deep)]" />
          </div>
          <div className="flex items-center gap-4 text-[var(--ink-soft)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 5v14l-11-7z" /></svg>
            <button
              aria-label={playing ? "Pausar" : "Reproducir"}
              onClick={() => setPlaying((v) => !v)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ background: "var(--rose-deep)" }}
            >
              {playing ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="5" height="16" /><rect x="14" y="4" width="5" height="16" /></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z" /></svg>
              )}
            </button>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ transform: "scaleX(-1)" }}><path d="M18 5v14l-11-7z" /></svg>
          </div>
        </div>
      </div>

      <section className="mb-7">
        <h3 className="font-hand text-2xl text-[var(--ink)] mb-1">Las que me recuerdan a ti</h3>
        <ul>
          {songsThatRemindMeOfYou.map((s, i) => (
            <SongRow key={i} song={s} />
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-hand text-2xl text-[var(--ink)] mb-1">Las que me ayudaron a seguir</h3>
        <ul>
          {songsThatHelpedMeLetGo.map((s, i) => (
            <SongRow key={i} song={s} />
          ))}
        </ul>
      </section>

      <p className="font-hand text-lg text-center text-[var(--ink-soft)] mt-8">
        cada canción tiene una historia
      </p>

      <ContinueLink label="Leer los fragmentos" onClick={onContinue} />
    </Paper>
  );
}
