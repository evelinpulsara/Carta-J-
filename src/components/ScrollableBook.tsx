"use client";

import { useEffect, useRef, useState } from "react";
import {
  CrescentMoon,
  PressedFlower,
  ShorelineSilhouette,
  Sprig,
  Starfield,
  WashiTape,
  Paperclip,
  WaxSeal,
} from "./DecorativeElements";
import { chapters, TocIcon } from "@/data/chapters";
import {
  comienzo,
  loquePasoDespues,
  laVersionDeMi,
  datoCurioso,
  elizabethContent,
  antesDeIrme,
  graciasPerdón,
  pendingEnvelopeIntro,
  pendingEnvelopeReveal,
} from "@/data/content";
import { songsThatRemindMeOfYou, songsThatHelpedMeLetGo } from "@/data/songs";

/* ─── renderText: convierte **bold** en <strong> ──────────── */

function renderText(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      )}
    </>
  );
}

/* ─── useFadeIn: aparece suavemente al hacer scroll (fade + translateY + blur → 0) ──────── */

function useFadeIn(threshold = 0.12, offsetY = 22) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : `translateY(${offsetY}px)`,
    filter: visible ? "blur(0)" : "blur(9px)",
    transition:
      "opacity 820ms cubic-bezier(.22,1,.36,1), transform 820ms cubic-bezier(.22,1,.36,1), filter 720ms cubic-bezier(.22,1,.36,1)",
    willChange: "opacity, transform, filter",
  };
  return { ref, visible, style };
}

/* ─── Aurora + Partículas ──────────────────────────────────── */

function AuroraBackground({ orbs = [
  { left: "8%",  top: "20%", w: 220, h: 180, color: "rgba(126,184,232,0.12)", dur: "22s", delay: "0s",  variant: 1 },
  { left: "72%", top: "30%", w: 200, h: 220, color: "rgba(179,164,214,0.10)", dur: "28s", delay: "7s",  variant: 2 },
  { left: "38%", top: "65%", w: 170, h: 160, color: "rgba(100,120,200,0.08)", dur: "18s", delay: "3s",  variant: 3 },
] }: { orbs?: { left: string; top: string; w: number; h: number; color: string; dur: string; delay: string; variant: 1|2|3 }[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {orbs.map((o, i) => (
        <div key={i} style={{
          position: "absolute",
          left: o.left, top: o.top,
          width: o.w, height: o.h,
          borderRadius: "50%",
          background: o.color,
          filter: "blur(55px)",
          animation: `aurora-drift-${o.variant} ${o.dur} ease-in-out infinite`,
          animationDelay: o.delay,
        }} />
      ))}
    </div>
  );
}

function FloatingParticles({ count = 7, color = "rgba(179,164,214,0.45)" }: { count?: number; color?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${8 + (i * 14) % 82}%`,
          bottom: `${6 + (i * 11) % 35}%`,
          width: i % 3 === 0 ? 3 : 2,
          height: i % 3 === 0 ? 3 : 2,
          borderRadius: "50%",
          background: color,
          animation: `particle-rise ${4 + (i * 1.7) % 5}s ease-in-out infinite`,
          animationDelay: `${i * 0.9}s`,
        }} />
      ))}
    </div>
  );
}

/* ─── Portada ──────────────────────────────────────────────── */

function Cover() {
  return (
    <section
      id="cover"
      className="relative min-h-dvh w-full flex flex-col items-center justify-between px-6 pt-24 pb-16 overflow-hidden text-center"
      style={{
        background: "linear-gradient(170deg, var(--night-deep) 0%, #0f1628 40%, var(--night) 100%)",
      }}
    >
      <AuroraBackground orbs={[
        { left: "5%",  top: "15%", w: 260, h: 200, color: "rgba(126,184,232,0.10)", dur: "24s", delay: "0s",  variant: 1 },
        { left: "65%", top: "25%", w: 220, h: 240, color: "rgba(179,164,214,0.09)", dur: "30s", delay: "8s",  variant: 2 },
        { left: "30%", top: "70%", w: 180, h: 160, color: "rgba(90,110,200,0.07)",  dur: "20s", delay: "4s",  variant: 3 },
      ]} />
      <Starfield count={30} />
      <CrescentMoon className="absolute top-16 right-10" size={72} />

      <div className="animate-rise" style={{ animationDelay: "0.1s" }}>
        <h1
          className="font-hand text-6xl leading-[1.05]"
          style={{
            color: "#dde1f5",
            textShadow: "0 0 40px rgba(179,164,214,0.4)",
          }}
        >Para ti…</h1>
      </div>

      <div className="flex flex-col items-center gap-6">
        <p
          className="animate-rise font-serif-page text-[17px] leading-relaxed max-w-70"
          style={{ color: "rgba(180,190,230,0.85)", animationDelay: "0.25s" }}
        >
          Hay cosas que nunca dije.
          <br />
          Y otras que tardé demasiado en entender.
        </p>
        <div
          className="animate-rise flex flex-col items-center gap-2"
          style={{ color: "rgba(179,164,214,0.6)", animationDelay: "0.5s" }}
        >
          <span className="font-hand text-xl">desplázate hacia abajo</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            style={{ animation: "bounce-down 1.6s ease-in-out infinite" }}>
            <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <FloatingParticles count={10} color="rgba(179,164,214,0.3)" />
      <ShorelineSilhouette className="absolute bottom-0 left-0 w-full h-40" />
    </section>
  );
}

/* ─── Reproductor de Música ────────────────────────────────── */

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, visible, style: fadeStyle } = useFadeIn(0.08, 24);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
    setIsLoaded(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const v = Number(e.target.value);
    audio.volume = v;
    setVolume(v);
  };

  const handleEnded = () => setIsPlaying(false);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      ref={ref}
      className="relative w-full px-5 py-12 flex flex-col items-center"
      style={{
        background: "var(--grad-player)",
        ...fadeStyle,
      }}
    >
      <Starfield count={14} />

      {/* Título */}
      <p
        className="font-hand text-[15px] tracking-widest uppercase mb-6 relative z-10"
        style={{ color: "var(--powder)", opacity: 0.7, letterSpacing: "0.18em" }}
      >
        ♪ Reproduce antes de leer
      </p>

      <audio
        ref={audioRef}
        src="/audio/canción.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Card del reproductor */}
      <div
        className="relative z-10 w-full max-w-85 rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
          border: "1px solid rgba(169,193,221,0.18)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Portada */}
        <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/portada.jpg"
            alt="Portada"
            className="w-full h-full object-cover"
            style={{ display: "block" }}
          />
          {/* Overlay degradado suave sobre la imagen */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 55%, rgba(20,26,48,0.85) 100%)",
            }}
          />
          {/* Indicador de reproducción flotante */}
          {isPlaying && (
            <div
              className="absolute bottom-3 right-3 flex items-end gap-0.75"
              style={{ height: 20 }}
            >
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 3,
                    borderRadius: 2,
                    background: "var(--powder)",
                    animation: `eq-bar ${0.6 + i * 0.15}s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Controles */}
        <div className="px-5 pt-4 pb-5 flex flex-col gap-3">
          {/* Barra de progreso */}
          <div className="flex flex-col gap-1">
            <div className="relative w-full h-1.5 rounded-full" style={{ background: "rgba(169,193,221,0.2)" }}>
              <div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, var(--powder), var(--lavender))",
                  transition: "width 0.3s linear",
                }}
              />
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Progreso de la canción"
              />
            </div>
            <div className="flex justify-between" style={{ fontSize: 11, color: "var(--powder)", opacity: 0.65 }}>
              <span className="font-serif-page">{fmt(currentTime)}</span>
              <span className="font-serif-page">{isLoaded ? fmt(duration) : "--:--"}</span>
            </div>
          </div>

          {/* Botón play/pause central */}
          <div className="flex items-center justify-center gap-5 mt-1">
            {/* Retroceder 10s */}
            <button
              onClick={() => { if (audioRef.current) audioRef.current.currentTime = Math.max(0, currentTime - 10); }}
              aria-label="Retroceder 10 segundos"
              className="btn-hover"
              style={{
                background: "rgba(169,193,221,0.1)",
                border: "1px solid rgba(169,193,221,0.2)",
                borderRadius: "50%",
                width: 40, height: 40,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--powder)",
                cursor: "pointer",
                transition: "background 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease, transform 220ms cubic-bezier(.22,1,.36,1), border-color 220ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(169,193,221,0.18)";
                e.currentTarget.style.borderColor = "rgba(179,164,214,0.35)";
                e.currentTarget.style.boxShadow = "0 2px 16px rgba(126,184,232,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(169,193,221,0.1)";
                e.currentTarget.style.borderColor = "rgba(169,193,221,0.2)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <text x="8" y="15.5" fontSize="6" fill="currentColor" stroke="none" fontFamily="sans-serif">10</text>
              </svg>
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
              className="btn-hover"
              style={{
                width: 62, height: 62,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                background:
                  "linear-gradient(135deg, var(--powder) 0%, var(--lavender) 100%)",
                boxShadow: isPlaying
                  ? "0 0 24px rgba(169,193,221,0.55), 0 4px 16px rgba(0,0,0,0.35)"
                  : "0 4px 16px rgba(0,0,0,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "box-shadow 300ms cubic-bezier(.22,1,.36,1), transform 220ms cubic-bezier(.22,1,.36,1), filter 220ms ease",
                transform: "scale(1)",
                color: "var(--night-deep)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.filter = "brightness(1.06)";
                if (!isPlaying) {
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(169,193,221,0.35), 0 6px 20px rgba(0,0,0,0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "brightness(1)";
                if (!isPlaying) {
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.35)";
                }
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "scale(0.97)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
              }}
            >
              {isPlaying ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 3 }}>
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              )}
            </button>

            {/* Avanzar 10s */}
            <button
              onClick={() => { if (audioRef.current) audioRef.current.currentTime = Math.min(duration, currentTime + 10); }}
              aria-label="Avanzar 10 segundos"
              className="btn-hover"
              style={{
                background: "rgba(169,193,221,0.1)",
                border: "1px solid rgba(169,193,221,0.2)",
                borderRadius: "50%",
                width: 40, height: 40,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--powder)",
                cursor: "pointer",
                transition: "background 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease, transform 220ms cubic-bezier(.22,1,.36,1), border-color 220ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(169,193,221,0.18)";
                e.currentTarget.style.borderColor = "rgba(179,164,214,0.35)";
                e.currentTarget.style.boxShadow = "0 2px 16px rgba(126,184,232,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(169,193,221,0.1)";
                e.currentTarget.style.borderColor = "rgba(169,193,221,0.2)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <text x="8" y="15.5" fontSize="6" fill="currentColor" stroke="none" fontFamily="sans-serif">10</text>
              </svg>
            </button>
          </div>

          {/* Volumen */}
          <div className="flex items-center gap-2 mt-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: "var(--powder)", opacity: 0.6, flexShrink: 0 }}>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              {volume > 0.5 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
              {volume > 0 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
            </svg>
            <div className="relative flex-1 h-1 rounded-full" style={{ background: "rgba(169,193,221,0.2)" }}>
              <div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  width: `${volume * 100}%`,
                  background: "var(--powder)",
                  opacity: 0.7,
                }}
              />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolume}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Volumen"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes for eq bars */}
      <style>{`
        @keyframes eq-bar {
          from { height: 4px; }
          to   { height: 18px; }
        }
      `}</style>
    </section>
  );
}

/* ─── Índice ───────────────────────────────────────────────── */

function ChapterIcon({ icon }: { icon: TocIcon }) {
  const common = {
    width: 20, height: 20, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 1.5,
  } as const;
  switch (icon) {
    case "letter":
      return <svg {...common}><rect x="3" y="6" width="18" height="13" rx="1.5" /><path d="M4 7l8 6 8-6" /></svg>;
    case "leaf":
      return <svg {...common}><path d="M5 19c8 1 14-5 14-14-9 0-14 6-14 14z" /><path d="M6 18c3-4 6-6 10-11" /></svg>;
    case "sprout":
      return <svg {...common}><path d="M12 21V9" /><path d="M12 12c-5 0-7-4-7-8 5 0 7 3 7 8z" /><path d="M12 9c4-1 6-4 6-7-4 0-6 3-6 7z" /></svg>;
    case "moon":
      return <svg {...common}><path d="M20 14.5A8.5 8.5 0 0110 4a8.5 8.5 0 1010 10.5z" /></svg>;
    case "photos":
      return <svg {...common}><rect x="3" y="5" width="13" height="15" rx="1" transform="rotate(-6 3 5)" /><rect x="7" y="4" width="13" height="15" rx="1" /></svg>;
    case "note":
      return <svg {...common}><circle cx="7" cy="18" r="2.5" /><path d="M9.5 18V6l9-2v11" /></svg>;
    case "seal":
      return <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></svg>;
    case "music":
      return <svg {...common}><circle cx="7" cy="18" r="2.5" /><circle cx="17" cy="16" r="2.5" /><path d="M9.5 18V7l10-2v9" /></svg>;
    default:
      return <svg {...common}><path d="M12 3l2.6 5.6L21 9.3l-4.5 4 1.3 6.2L12 16.8 6.2 19.5l1.3-6.2L3 9.3l6.4-.7z" /></svg>;
  }
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function TableOfContents() {
  const { ref, visible, style: fadeStyle } = useFadeIn(0.12, 20);
  return (
    <section
      ref={ref}
      id="index"
      className="relative w-full px-5 pt-20 pb-14 paper-texture starfield-dense"
      style={{
        background: "var(--grad-section-base)",
        ...fadeStyle,
      }}
    >
      <Starfield count={10} />
      <AuroraBackground orbs={[
        { left: "0%",  top: "10%", w: 210, h: 190, color: "rgba(126,184,232,0.08)", dur: "26s", delay: "0s", variant: 1 },
        { left: "72%", top: "55%", w: 190, h: 210, color: "rgba(179,164,214,0.08)", dur: "32s", delay: "5s", variant: 2 },
        { left: "35%", top: "85%", w: 160, h: 140, color: "rgba(100,120,200,0.05)", dur: "22s", delay: "2s", variant: 3 },
      ]} />
      <WashiTape className="top-10 left-6" color="var(--lavender)" rotate={-8} />
      <WashiTape className="top-10 right-8" color="var(--powder)" rotate={6} />
      <Paperclip className="top-12 right-14 rotate-[8deg]" />

      <p
        className="font-hand text-3xl text-center mb-1 relative z-10"
        style={{ color: "var(--text)", textShadow: "0 0 30px rgba(179,164,214,0.3)" }}
      >Índice</p>
      <p className="font-serif-page italic text-sm text-center mb-8 relative z-10" style={{ color: "var(--text-soft)" }}>
        cada capítulo, a su tiempo
      </p>

      <ul className="flex flex-col gap-2.5 max-w-125 mx-auto relative z-10">
        {chapters.map((c, idx) => {
          const d = 0.12 + idx * 0.06;
          const liStyle: React.CSSProperties = {
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0) scale(1)" : "translateX(-14px) scale(.985)",
            filter: visible ? "blur(0)" : "blur(5px)",
            transition:
              `opacity 550ms cubic-bezier(.22,1,.36,1) ${d}s,` +
              ` transform 550ms cubic-bezier(.22,1,.36,1) ${d}s,` +
              ` filter 450ms cubic-bezier(.22,1,.36,1) ${d}s`,
          };
          const btnStyle: React.CSSProperties = {
            minHeight: 56,
            background: c.locked
              ? "linear-gradient(135deg, rgba(143,84,112,0.18), rgba(110,70,100,0.12))"
              : "var(--glass-bg)",
            border: c.locked
              ? "1px solid rgba(196,130,154,0.26)"
              : "1px solid var(--glass-border)",
            backdropFilter: "var(--glass-blur)",
            WebkitBackdropFilter: "var(--glass-blur)",
            boxShadow: "var(--shadow-card-blue)",
          };
          return (
            <li key={c.id} style={liStyle}>
              <button
                onClick={() => scrollTo(c.id)}
                className="w-full text-left rounded-xl px-4 py-3.5 btn-hover"
                style={btnStyle}
              >
                <div className="flex items-start gap-3">
                  <span className="font-hand text-2xl leading-none pt-0.5 w-7 shrink-0" style={{ color: "var(--text-muted)" }}>
                    {c.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span style={{ color: "var(--lavender)" }}>
                        <ChapterIcon icon={c.icon} />
                      </span>
                      <span className="font-serif-page font-medium text-[15px]" style={{ color: "var(--text)" }}>
                        {c.title}
                      </span>
                      {c.locked && (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="ml-auto shrink-0" style={{ color: "var(--rose)" }}>
                          <rect x="5" y="11" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ─── Sección de carta genérica ────────────────────────────── */

const tintBg: Record<string, string> = {
  none:     "var(--grad-section-base)",
  cold:     "var(--grad-section-cold)",
  sage:     "var(--grad-section-sage)",
  lavender: "var(--grad-section-lavender)",
  night:    "var(--grad-section-night)",
};

const defaultAuroraByTint: Record<string, Parameters<typeof AuroraBackground>[0]["orbs"]> = {
  none: [
    { left: "4%",  top: "15%", w: 200, h: 180, color: "rgba(126,184,232,0.07)", dur: "24s", delay: "0s", variant: 1 },
    { left: "68%", top: "65%", w: 180, h: 200, color: "rgba(179,164,214,0.07)", dur: "30s", delay: "6s", variant: 2 },
    { left: "40%", top: "88%", w: 150, h: 140, color: "rgba(100,120,200,0.04)", dur: "20s", delay: "3s", variant: 3 },
  ],
  cold: [
    { left: "0%",  top: "20%", w: 220, h: 200, color: "rgba(100,140,200,0.08)", dur: "26s", delay: "0s", variant: 1 },
    { left: "70%", top: "55%", w: 190, h: 210, color: "rgba(126,184,232,0.06)", dur: "32s", delay: "7s", variant: 2 },
  ],
  sage: [
    { left: "5%",  top: "10%", w: 180, h: 160, color: "rgba(120,180,210,0.07)", dur: "22s", delay: "0s", variant: 1 },
    { left: "72%", top: "70%", w: 200, h: 180, color: "rgba(179,164,214,0.06)", dur: "28s", delay: "5s", variant: 2 },
  ],
  lavender: [
    { left: "3%",  top: "25%", w: 210, h: 190, color: "rgba(179,164,214,0.10)", dur: "25s", delay: "0s", variant: 1 },
    { left: "70%", top: "20%", w: 180, h: 200, color: "rgba(140,120,220,0.08)", dur: "30s", delay: "6s", variant: 2 },
    { left: "35%", top: "80%", w: 160, h: 150, color: "rgba(126,184,232,0.05)", dur: "20s", delay: "2s", variant: 3 },
  ],
  night: [
    { left: "8%",  top: "15%", w: 240, h: 200, color: "rgba(126,184,232,0.08)", dur: "28s", delay: "0s", variant: 1 },
    { left: "65%", top: "60%", w: 220, h: 240, color: "rgba(179,164,214,0.07)", dur: "34s", delay: "8s", variant: 2 },
  ],
};

const defaultStarfieldByTint: Record<string, number> = {
  none: 0,
  cold: 12,
  sage: 0,
  lavender: 8,
  night: 14,
};

const defaultParticlesByTint: Record<string, number> = {
  none: 0,
  cold: 4,
  sage: 6,
  lavender: 7,
  night: 0,
};

function LetterSection({
  id,
  number,
  title,
  paragraphs,
  tint = "none",
  quiet = false,
  auroraOrbs,
  starfield,
  particles,
  children,
}: {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  tint?: string;
  quiet?: boolean;
  auroraOrbs?: Parameters<typeof AuroraBackground>[0]["orbs"];
  starfield?: number;
  particles?: boolean | number;
  children?: React.ReactNode;
}) {
  const { ref, visible, style: fadeStyle } = useFadeIn(0.1, 22);
  const sfCount = typeof starfield === "number" ? starfield : defaultStarfieldByTint[tint] ?? 0;
  const pCount =
    typeof particles === "number" ? particles :
    particles === true ? 6 :
    defaultParticlesByTint[tint] ?? 0;

  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full px-6 pt-20 pb-16 paper-texture starfield-dense`}
      style={{
        background: tintBg[tint],
        ...fadeStyle,
      }}
    >
      <AuroraBackground orbs={auroraOrbs ?? defaultAuroraByTint[tint]} />
      {sfCount > 0 && <Starfield count={sfCount} />}
      {pCount > 0 && (
        <FloatingParticles
          count={pCount}
          color={
            tint === "lavender" || tint === "sage"
              ? "rgba(193,177,230,0.45)"
              : "rgba(137,193,239,0.35)"
          }
        />
      )}
      {children}
      <div className="max-w-[42ch] mx-auto relative z-10">
        <p className="font-hand text-xl mb-1" style={{ color: "var(--text-soft)" }}>{number}</p>
        <h2
          className={`font-hand mb-7 leading-tight ${quiet ? "text-2xl" : "text-3xl"}`}
          style={{ color: "var(--text)", textShadow: "0 0 30px rgba(179,164,214,0.22)" }}
        >
          {title}
        </h2>

        <div className="flex flex-col gap-[1.15rem]">
          {paragraphs.map((p, i) => {
            const staggerDelay = 0.12 + Math.min(i, 10) * 0.05;
            return (
              <p
                key={i}
                className="font-serif-page text-[17px] leading-[1.85]"
                style={{
                  color: "rgba(228,232,251,0.94)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                  filter: visible ? "blur(0)" : "blur(4px)",
                  transition:
                    `opacity 700ms cubic-bezier(.22,1,.36,1) ${staggerDelay}s,` +
                    ` transform 700ms cubic-bezier(.22,1,.36,1) ${staggerDelay}s,` +
                    ` filter 550ms cubic-bezier(.22,1,.36,1) ${staggerDelay}s`,
                }}
              >
                {renderText(p)}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Aclaración — sobre interactivo ───────────────────────── */

function EnvelopeSection() {
  const [opened, setOpened] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { ref, visible, style: fadeStyle } = useFadeIn(0.08, 26);

  const idle = !pressed && !hovered && !opened;

  return (
    <section
      id="clarification"
      ref={ref}
      className="relative w-full px-6 pt-20 pb-24 flex flex-col items-center text-center starfield-dense"
      style={{
        background: "var(--grad-section-goodbye)",
        ...fadeStyle,
      }}
    >
      <AuroraBackground orbs={[
        { left: "8%",  top: "18%", w: 260, h: 220, color: "rgba(140,110,220,0.13)", dur: "26s", delay: "0s", variant: 1 },
        { left: "62%", top: "48%", w: 220, h: 240, color: "rgba(110,140,220,0.11)", dur: "32s", delay: "9s", variant: 2 },
        { left: "38%", top: "80%", w: 180, h: 160, color: "rgba(179,164,214,0.07)", dur: "22s", delay: "4s", variant: 3 },
      ]} />
      <Starfield count={24} />
      <FloatingParticles count={9} color="rgba(212,194,240,0.55)" />

      {/* Número y título */}
      <p
        className="font-hand text-xl relative z-10 mb-1"
        style={{
          color: "var(--text-muted)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 500ms ease .18s, transform 500ms ease .18s",
        }}
      >09</p>
      <h2
        className="font-hand text-4xl relative z-10 mb-2 leading-tight"
        style={{
          color: "var(--text)",
          textShadow: "0 0 50px rgba(212,194,240,0.55)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          filter: visible ? "blur(0)" : "blur(4px)",
          transition:
            "opacity 700ms cubic-bezier(.22,1,.36,1) .28s," +
            " transform 700ms cubic-bezier(.22,1,.36,1) .28s," +
            " filter 550ms cubic-bezier(.22,1,.36,1) .28s",
        }}
      >
        {pendingEnvelopeIntro.heading}
      </h2>
      <p
        className="font-serif-page italic text-[15px] max-w-[26ch] mb-12 relative z-10"
        style={{
          color: "var(--text-soft)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          filter: visible ? "blur(0)" : "blur(4px)",
          transition:
            "opacity 700ms cubic-bezier(.22,1,.36,1) .4s," +
            " transform 700ms cubic-bezier(.22,1,.36,1) .4s," +
            " filter 550ms cubic-bezier(.22,1,.36,1) .4s",
        }}
      >
        {pendingEnvelopeIntro.sub}
      </p>

      {/* ── Sobre premium ── */}
      <button
        onClick={() => setOpened((v) => !v)}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => { setPressed(false); setHovered(false); }}
        onMouseEnter={() => setHovered(true)}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
        aria-label={opened ? "Cerrar el sobre" : "Tocar el sobre para abrirlo"}
        className="relative w-60 h-42 mx-auto block z-10"
        style={{
          perspective: "1000px",
          filter: hovered && !opened
            ? "drop-shadow(0 0 32px rgba(212,194,240,0.75))"
            : "drop-shadow(0 10px 30px rgba(6,8,18,0.75))",
          transform: pressed
            ? "scale(0.975)"
            : hovered
              ? "scale(1.03) translateY(-3px)"
              : "scale(1)",
          transition: "filter 0.42s cubic-bezier(.22,1,.36,1), transform 0.32s cubic-bezier(.22,1,.36,1)",
          animation: idle ? "float-slow 7.2s ease-in-out infinite" : "none",
          opacity: visible ? 1 : 0,
          marginTop: visible ? 0 : 18,
        }}
      >
        {/* Cuerpo del sobre — azul noche profundo + textura */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #1c2650 0%, #131933 100%)",
            backgroundImage:
              "radial-gradient(rgba(179,164,214,.045) 1px, transparent 1px)," +
              " radial-gradient(rgba(126,184,232,.035) 1px, transparent 1px)",
            backgroundSize: "3px 3px, 7px 7px",
            border: "1px solid rgba(193,177,230,0.25)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.07)," +
              " inset 0 -20px 50px rgba(6,8,18,0.5)",
          }}
        />
        {/* Brillo superior sutil */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
          aria-hidden
        >
          <div
            className="absolute -top-10 -left-10 w-48 h-48 rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.12), transparent 60%)",
              filter: "blur(14px)",
              mixBlendMode: "screen",
              opacity: hovered ? 0.9 : 0.55,
              transition: "opacity 0.4s ease",
              animation: "envelope-shine 6.5s ease-in-out infinite",
            }}
          />
        </div>
        {/* Líneas del sobre */}
        <svg viewBox="0 0 240 168" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          <path d="M4 8 L120 95 L236 8" fill="none" stroke="rgba(193,177,230,0.3)" strokeWidth="1" />
          <rect x="4" y="8" width="232" height="156" rx="10" fill="none" stroke="rgba(193,177,230,0.18)" strokeWidth="0.8" />
        </svg>
        {/* Solapa animada */}
        <div
          className="absolute top-0 left-0 w-full h-24 origin-top"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 1.05s cubic-bezier(.22,1,.36,1)",
            transform: opened ? "rotateX(-162deg)" : "rotateX(0deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <svg viewBox="0 0 240 96" className="w-full h-full absolute top-0 left-0">
            <defs>
              <linearGradient id="flapGradDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#222d5e" />
                <stop offset="1" stopColor="#141a38" />
              </linearGradient>
            </defs>
            <path d="M4 6 L120 92 L236 6 Z" fill="url(#flapGradDark)" stroke="rgba(193,177,230,0.25)" strokeWidth="0.9" />
            <path d="M4 6 L120 92 L236 6 Z" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" transform="translate(0 1)" />
          </svg>
        </div>
        {/* Sello de cera lavanda con glow */}
        {!opened && (
          <div
            className="absolute left-1/2 top-16 -translate-x-1/2 -translate-y-1/2 animate-seal-glow"
            style={{
              transformOrigin: "center",
            }}
          >
            <WaxSeal />
          </div>
        )}
        {/* Carta saliendo simulada */}
        {opened && (
          <div
            className="absolute left-1/2 top-9.5 -translate-x-1/2 w-49.5 h-26 rounded-lg"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              border: "1px solid rgba(193,177,230,0.14)",
              boxShadow: "0 6px 28px rgba(6,8,18,0.6)",
              animation: "appear-delayed 620ms cubic-bezier(.22,1,.36,1) 80ms both",
            }}
          />
        )}
      </button>

      {!opened && (
        <p
          className="font-hand text-xl mt-8 relative z-10"
          style={{
            color: "rgba(193,177,230,0.72)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 600ms ease .75s, transform 600ms ease .75s",
          }}
        >
          {pendingEnvelopeIntro.cta}
        </p>
      )}

      {opened && (
        <div
          className="mt-10 max-w-[38ch] relative z-10 text-left"
          style={{
            animation: "appear-delayed 700ms cubic-bezier(.22,1,.36,1) 380ms both",
          }}
        >
          <div
            className="rounded-2xl p-5 flex flex-col gap-4 card-glass-strong"
          >
            {pendingEnvelopeReveal.paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-serif-page text-[16px] leading-[1.88]"
                style={{
                  color: "rgba(222,228,248,0.94)",
                  opacity: 0,
                  animation:
                    `appear-delayed 550ms cubic-bezier(.22,1,.36,1) ${0.48 + i * 0.09}s forwards`,
                }}
              >
                {renderText(p)}
              </p>
            ))}
          </div>
          <button
            onClick={() => setOpened(false)}
            className="mt-6 mx-auto flex items-center gap-2 font-hand text-[15px] btn-hover rounded-lg px-3 py-2"
            style={{ color: "rgba(193,177,230,0.55)" }}
            aria-label="Cerrar el sobre"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            cerrar el sobre
          </button>
        </div>
      )}
    </section>
  );
}


/* ─── Canciones ────────────────────────────────────────────── */

function SongsSection() {
  const { ref, visible, style: fadeStyle } = useFadeIn(0.1, 22);
  const allSongs = [...songsThatRemindMeOfYou, ...songsThatHelpedMeLetGo];
  return (
    <section
      id="songs"
      ref={ref}
      className="relative w-full px-6 pt-20 pb-16 paper-texture starfield-dense"
      style={{
        background: "var(--grad-section-lavender)",
        ...fadeStyle,
      }}
    >
      <Starfield count={6} />
      <AuroraBackground orbs={[
        { left: "5%",  top: "25%", w: 190, h: 170, color: "rgba(179,164,214,0.13)", dur: "20s", delay: "0s", variant: 1 },
        { left: "68%", top: "12%", w: 170, h: 190, color: "rgba(120,100,220,0.10)", dur: "25s", delay: "6s", variant: 2 },
        { left: "40%", top: "80%", w: 160, h: 140, color: "rgba(126,184,232,0.05)", dur: "22s", delay: "3s", variant: 3 },
      ]} />
      <FloatingParticles count={7} color="rgba(212,194,240,0.48)" />

      <div className="max-w-[42ch] mx-auto relative z-10">
        {/* Cabecera */}
        <p className="font-hand text-xl mb-1" style={{ color: "var(--text-muted)" }}>𐔌՞ ܸ.ˬ.ܸ՞𐦯</p>
        <h2
          className="font-hand text-3xl mb-2 leading-tight"
          style={{ color: "var(--text)", textShadow: "0 0 32px rgba(193,177,230,0.40)" }}
        >
          Canciones que me recordaron a ti
        </h2>
        <p
          className="font-serif-page italic text-[14px] mb-3"
          style={{ color: "var(--text-soft)" }}
        >
          Hay canciones que no hablan de ti,{" "}
          <br />pero inevitablemente me recuerdan a ti.
        </p>
        <p
          className="font-hand text-[15px] mb-8 inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
          style={{
            color: "var(--lavender)",
            background: "rgba(179,164,214,0.07)",
            border: "1px solid rgba(179,164,214,0.15)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 3h10v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 3l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          toca una canción para escucharla
        </p>

        {/* Lista única con animación staggered + glass estilo player */}
        <div
          className="rounded-2xl p-4 card-glass"
          style={{ boxShadow: "var(--shadow-card-lavender)" }}
        >
          <ul>
            {allSongs.map((s, i) => {
              const d = 0.22 + i * 0.07;
              const TitleWrapper: any = s.url ? "a" : "div";
              const wrapperProps = s.url
                ? {
                    href: s.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    onClick: (e: React.MouseEvent) => e.stopPropagation(),
                  }
                : {};
              return (
                <li
                  key={i}
                  className="flex items-center gap-3 py-3 border-b last:border-0 rounded-lg transition-colors duration-200 -mx-1 px-1 hover:bg-[rgba(255,255,255,0.035)]"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0) scale(1)" : "translateX(-16px) scale(.99)",
                    filter: visible ? "blur(0)" : "blur(4px)",
                    transition:
                      `opacity 550ms cubic-bezier(.22,1,.36,1) ${d}s,` +
                      ` transform 550ms cubic-bezier(.22,1,.36,1) ${d}s,` +
                      ` filter 450ms cubic-bezier(.22,1,.36,1) ${d}s,` +
                      ` background-color 200ms ease`,
                    cursor: s.url ? "pointer" : "default",
                  }}
                >
                  <svg
                    width="15" height="15" viewBox="0 0 24 24" fill="none"
                    className="shrink-0"
                    style={{ color: "var(--lavender)" }}
                  >
                    <circle cx="7" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M9.5 18V6l9-2v11" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  <div className="min-w-0 flex-1">
                    <TitleWrapper
                      {...wrapperProps}
                      className="inline-flex items-center gap-1.5 group"
                    >
                      <p
                        className="font-serif-page text-[15px] truncate group-hover:underline decoration-dotted underline-offset-4 transition-colors duration-200"
                        style={{ color: s.url ? "var(--text)" : "var(--text)" }}
                      >
                        {s.title}
                      </p>
                      {s.url && (
                        <svg
                          width="11" height="11" viewBox="0 0 24 24" fill="none"
                          className="shrink-0 opacity-60 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200"
                          style={{ color: "var(--lavender)" }}
                          aria-hidden
                        >
                          <path d="M9 3h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M20 3l-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M20 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </TitleWrapper>
                    <p className="font-serif-page italic text-[12.5px] truncate" style={{ color: "var(--text-soft)" }}>
                      {s.artist}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}


/* ─── Componente principal ─────────────────────────────────── */

export default function ScrollableBook() {
  return (
    <>
      <style>{`
        @keyframes bounce-down {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
      `}</style>

      <main className="w-full max-w-130 mx-auto min-h-dvh">
        {/* Portada */}
        <Cover />

        {/* Reproductor de música */}
        <MusicPlayer />

        {/* Índice */}
        <TableOfContents />

        {/* 01 · Comienzo (recuerdos / principios) */}
        <LetterSection
          id="beginning"
          number="01"
          title="Comienzo"
          paragraphs={comienzo}
          tint="none"
          particles={4}
        >
          <WashiTape className="top-12 left-5" color="var(--lavender)" rotate={-7} width={68} />
          <Paperclip className="top-16 right-6 -rotate-6" size={28} />
        </LetterSection>

        {/* 02 · Lo que pasó después (melancolía) */}
        <LetterSection
          id="after"
          number="02"
          title="Lo que pasó después"
          paragraphs={loquePasoDespues}
          tint="cold"
          starfield={12}
          particles={4}
        >
          <CrescentMoon className="absolute top-14 right-6" size={46} />
        </LetterSection>

        {/* 03 · La versión de mí que no conoces (sanación / crecimiento) */}
        <LetterSection
          id="new-me"
          number="03"
          title="La versión de mí que no conoces"
          paragraphs={laVersionDeMi}
          tint="sage"
          particles={6}
        >
          <Sprig className="absolute top-10 right-5" size={44} />
          <Sprig className="absolute top-20 left-4 rotate-180" size={30} color="var(--lavender)" />
          <PressedFlower className="absolute bottom-16 right-6" size={26} color="var(--lavender-glow)" />
        </LetterSection>

        {/* 04 · Dato Curioso (recuerdos / luna) */}
        <LetterSection
          id="curious-fact"
          number="04"
          title="Dato Curioso"
          paragraphs={datoCurioso}
          tint="lavender"
          starfield={8}
          particles={5}
        >
          <WashiTape className="top-12 left-5" color="var(--powder)" rotate={-6} width={64} />
          <WashiTape className="top-14 right-6" color="var(--lavender)" rotate={8} width={60} />
          <CrescentMoon className="absolute top-10 right-20" size={36} />
        </LetterSection>

        {/* 05 · Elizabeth (melancolía) */}
        <LetterSection
          id="elizabeth"
          number="05"
          title="Elizabeth"
          paragraphs={elizabethContent}
          tint="cold"
          quiet
          starfield={10}
          particles={3}
        >
          <PressedFlower className="top-10 right-5" size={28} color="var(--powder)" />
          <CrescentMoon className="absolute top-20 right-4" size={40} />
        </LetterSection>

        {/* 06 · Lo que quería decirte antes de irme (despedida / melancolía) */}
        <LetterSection
          id="before-leaving"
          number="06"
          title="Lo que quería decirte antes de irme"
          paragraphs={antesDeIrme}
          tint="night"
          starfield={14}
          particles={4}
        >
          <CrescentMoon className="absolute top-12 left-6" size={44} />
        </LetterSection>

        {/* 07 · Gracias y Perdón (sanación / agradecimiento) */}
        <LetterSection
          id="thanks-sorry"
          number="07"
          title="Gracias y Perdón"
          paragraphs={graciasPerdón}
          tint="sage"
          particles={6}
        >
          <Sprig className="absolute top-10 right-6" size={42} color="var(--sage)" />
          <Sprig className="absolute bottom-14 left-5 rotate-180" size={34} color="var(--lavender)" />
          <PressedFlower className="absolute top-14 left-6" size={24} color="var(--lavender)" />
        </LetterSection>

        {/* 08 · Canciones */}
        <SongsSection />

        {/* 09 · Aclaración — sobre interactivo */}
        <EnvelopeSection />
      </main>
    </>
  );
}
