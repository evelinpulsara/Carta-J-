"use client";

import { ReactNode } from "react";

export default function BookFrame({
  title,
  showBack,
  onBack,
  liked,
  onToggleLike,
  pageLabel,
  dark = false,
  children,
}: {
  title: string;
  showBack: boolean;
  onBack: () => void;
  liked: boolean;
  onToggleLike: () => void;
  pageLabel: string | null;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-[#d9d3c6] md:py-10">
      {/* páginas fantasma, solo en escritorio, para sugerir un libro */}
      <div className="hidden md:block absolute w-[400px] h-[820px] rounded-[26px] bg-[#e7e0d1] rotate-[3deg] translate-x-3 translate-y-2 shadow-lg" />
      <div className="hidden md:block absolute w-[410px] h-[830px] rounded-[26px] bg-[#dfd7c5] rotate-[-2deg] -translate-x-2 shadow-lg" />

      <div
        className="relative w-full h-dvh md:h-[860px] md:max-w-[430px] md:rounded-[28px] overflow-hidden"
        style={{ boxShadow: "var(--shadow-paper)" }}
      >
        <header
          className={`absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 py-3 backdrop-blur-sm ${
            dark ? "text-[#f4ecd8]" : "text-[var(--ink)]"
          }`}
          style={{
            background: dark
              ? "linear-gradient(180deg, rgba(20,26,48,0.65), rgba(20,26,48,0))"
              : "linear-gradient(180deg, rgba(246,240,228,0.85), rgba(246,240,228,0))",
          }}
        >
          <button
            aria-label="Volver"
            onClick={onBack}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-opacity ${
              showBack ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <h1 className="font-hand text-2xl leading-none">{title}</h1>

          <button
            aria-label={liked ? "Quitar de favoritos" : "Guardar como favorito"}
            onClick={onToggleLike}
            className="w-9 h-9 flex items-center justify-center"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill={liked ? "var(--rose-deep)" : "none"}>
              <path
                d="M12 20s-7-4.35-9.5-8.8C.7 7.9 2.2 4 6 4c2.2 0 3.7 1.2 6 3.5C14.3 5.2 15.8 4 18 4c3.8 0 5.3 3.9 3.5 7.2C19 15.65 12 20 12 20z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </button>
        </header>

        <div className="h-full w-full overflow-y-auto overflow-x-hidden">{children}</div>

        {pageLabel && (
          <div
            className={`pointer-events-none absolute bottom-3 inset-x-0 text-center text-xs tracking-wide font-serif-page ${
              dark ? "text-[#cfd6ea]/70" : "text-[var(--ink-soft)]/80"
            }`}
          >
            {pageLabel}
          </div>
        )}
      </div>
    </div>
  );
}
