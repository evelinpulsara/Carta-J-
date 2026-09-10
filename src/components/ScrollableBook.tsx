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

/* ─── useFadeIn: aparece suavemente al hacer scroll ──────── */

function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Portada ──────────────────────────────────────────────── */

function Cover() {
  return (
    <section
      className="relative min-h-dvh w-full flex flex-col items-center justify-between px-6 pt-24 pb-16 overflow-hidden text-center"
      style={{
        background:
          "linear-gradient(180deg, var(--night-deep) 0%, var(--night) 45%, var(--night-mist) 100%)",
      }}
    >
      <Starfield count={26} />
      <CrescentMoon className="absolute top-16 right-10" size={72} />

      <div className="animate-rise" style={{ animationDelay: "0.1s" }}>
        <h1 className="font-hand text-6xl leading-[1.05] text-[#f4ecd8]">Para ti…</h1>
      </div>

      <div className="flex flex-col items-center gap-6">
        <p
          className="animate-rise font-serif-page text-[17px] leading-relaxed text-[#dbe0ee]/90 max-w-[280px]"
          style={{ animationDelay: "0.25s" }}
        >
          Hay cosas que nunca dije.
          <br />
          Y otras que tardé demasiado en entender.
        </p>

        <div
          className="animate-rise flex flex-col items-center gap-2 text-[#f4ecd8]/70"
          style={{ animationDelay: "0.5s" }}
        >
          <span className="font-hand text-xl">desplázate hacia abajo</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ animation: "bounce-down 1.6s ease-in-out infinite" }}
          >
            <path
              d="M12 5v14M6 13l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <ShorelineSilhouette className="absolute bottom-0 left-0 w-full h-40" />
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
    default:
      return <svg {...common}><path d="M12 3l2.6 5.6L21 9.3l-4.5 4 1.3 6.2L12 16.8 6.2 19.5l1.3-6.2L3 9.3l6.4-.7z" /></svg>;
  }
}

function TableOfContents() {
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref}
      className="relative w-full px-5 pt-20 pb-14 paper-texture"
      style={{
        background: "var(--paper)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <WashiTape className="top-10 left-6" color="var(--powder)" rotate={-8} />
      <WashiTape className="top-10 right-8" color="var(--rose)" rotate={6} />
      <Paperclip className="top-[3rem] right-14 rotate-[8deg]" />

      <p className="font-hand text-3xl text-center text-[var(--ink)] mb-1">Índice</p>
      <p className="font-serif-page italic text-sm text-center text-[var(--ink-soft)] mb-8">
        cada capítulo, a su tiempo
      </p>

      <ul className="flex flex-col gap-3 max-w-[500px] mx-auto">
        {chapters.map((c) => (
          <li key={c.id}>
            <div
              className={`w-full text-left rounded-lg border px-4 py-3.5 ${
                c.locked
                  ? "border-[var(--rose-deep)]/30"
                  : "border-[var(--paper-line)]"
              }`}
              style={{
                background: c.locked
                  ? "linear-gradient(135deg, #f2e2dd, #ecd6cf)"
                  : "rgba(255,255,255,0.35)",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="font-hand text-2xl text-[var(--ink-soft)] leading-none pt-0.5 w-7 shrink-0">
                  {c.number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[var(--ink)]"><ChapterIcon icon={c.icon} /></span>
                    <span className="font-serif-page font-medium text-[15px] text-[var(--ink)]">
                      {c.title}
                    </span>
                    {c.locked && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[var(--rose-deep)] ml-auto shrink-0">
                        <rect x="5" y="11" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M8 11V8a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    )}
                  </div>
                  <p className="font-serif-page italic text-[13px] leading-snug text-[var(--ink-soft)] mt-1">
                    &ldquo;{c.teaser}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ─── Sección de carta genérica ────────────────────────────── */

const tintBg: Record<string, string> = {
  none:     "var(--paper)",
  cold:     "linear-gradient(180deg, var(--wash-cold), var(--paper) 55%)",
  sage:     "linear-gradient(180deg, var(--wash-sage), var(--paper) 55%)",
  lavender: "linear-gradient(180deg, var(--wash-lavender), var(--paper) 55%)",
  night:    "linear-gradient(180deg, var(--night-deep), var(--night) 70%)",
};

function LetterSection({
  number,
  title,
  paragraphs,
  tint = "none",
  quiet = false,
  children,
}: {
  number: string;
  title: string;
  paragraphs: string[];
  tint?: string;
  quiet?: boolean;
  children?: React.ReactNode;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref}
      className="relative w-full px-6 pt-20 pb-16 paper-texture"
      style={{
        background: tintBg[tint],
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
      <div className="max-w-[42ch] mx-auto">
        <p className="font-hand text-xl text-[var(--ink-soft)] mb-1">{number}</p>
        <h2
          className={`font-hand text-[var(--ink)] mb-7 leading-tight ${
            quiet ? "text-2xl" : "text-3xl"
          }`}
        >
          {title}
        </h2>

        <div className="flex flex-col gap-[1.1rem]">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-serif-page text-[17px] leading-[1.8] text-[var(--ink)]"
            >
              {renderText(p)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Aclaración — sobre interactivo ───────────────────────── */

function EnvelopeSection() {
  const [opened, setOpened] = useState(false);
  const [pressed, setPressed] = useState(false);
  const { ref, visible } = useFadeIn();

  return (
    <section
      ref={ref}
      className="relative w-full px-6 pt-20 pb-20 flex flex-col items-center text-center"
      style={{
        background: tintBg["night"],
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <Starfield count={18} />

      <p className="font-hand text-xl text-[#cfd6ea] mb-1 relative z-10">08</p>
      <h2 className="font-hand text-4xl text-[#f4ecd8] mb-3 relative z-10">
        {pendingEnvelopeIntro.heading}
      </h2>
      <p className="font-serif-page italic text-[15px] text-[#c3c9dd] max-w-[26ch] mb-10 relative z-10">
        {pendingEnvelopeIntro.sub}
      </p>

      {/* Sobre */}
      <button
        onClick={() => setOpened(true)}
        disabled={opened}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        aria-label="Tocar el sobre para abrirlo"
        className="relative w-[230px] h-[160px] mx-auto block z-10"
        style={{ perspective: "900px" }}
      >
        <div
          className="absolute inset-0 rounded-md"
          style={{
            background: "linear-gradient(160deg, #ece0cb, #ddcba9)",
            boxShadow: "0 14px 30px -10px rgba(0,0,0,0.45)",
            transform: pressed && !opened ? "scale(0.98)" : "scale(1)",
            transition: "transform 0.15s ease",
          }}
        />
        <svg viewBox="0 0 230 160" className="absolute inset-0 w-full h-full">
          <path d="M4 8 L115 90 L226 8" fill="none" stroke="#c4b183" strokeWidth="1.4" opacity={0.7} />
          <rect x="4" y="8" width="222" height="148" rx="6" fill="none" stroke="#c4b183" strokeWidth="1" opacity={0.6} />
        </svg>
        {/* solapa */}
        <div
          className="absolute top-0 left-0 w-full h-[92px] origin-top"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.9s cubic-bezier(.22,1,.36,1)",
            transform: opened ? "rotateX(-150deg)" : "rotateX(0deg)",
          }}
        >
          <svg viewBox="0 0 230 92" className="w-full h-full absolute top-0 left-0">
            <path d="M4 6 L115 88 L226 6 Z" fill="url(#flapGrad)" stroke="#c4b183" strokeWidth="1" />
            <defs>
              <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f1e6d1" />
                <stop offset="1" stopColor="#ddcba9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {!opened && (
          <WaxSeal className="absolute left-1/2 top-[62px] -translate-x-1/2 -translate-y-1/2" />
        )}
        {opened && (
          <div className="absolute left-1/2 top-[46px] -translate-x-1/2 w-[190px] h-[92px] bg-[#faf6ec] rounded-sm shadow-md animate-rise" />
        )}
      </button>

      {!opened && (
        <p className="font-hand text-xl text-[#cfd6ea]/80 mt-8 animate-rise relative z-10">
          {pendingEnvelopeIntro.cta}
        </p>
      )}

      {opened && (
        <div
          className="mt-10 max-w-[38ch] animate-rise relative z-10 text-left"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex flex-col gap-4">
            {pendingEnvelopeReveal.paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-serif-page text-[16px] leading-[1.8] text-[#e3e6f0]"
              >
                {renderText(p)}
              </p>
            ))}
          </div>
        </div>
      )}
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

      <main className="w-full max-w-[520px] mx-auto min-h-dvh">
        {/* Portada */}
        <Cover />

        {/* Índice */}
        <TableOfContents />

        {/* 01 · Comienzo */}
        <LetterSection
          number="01"
          title="Comienzo"
          paragraphs={comienzo}
          tint="none"
        />

        {/* 02 · Lo que pasó después */}
        <LetterSection
          number="02"
          title="Lo que pasó después"
          paragraphs={loquePasoDespues}
          tint="cold"
        />

        {/* 03 · La versión de mí que no conoces */}
        <LetterSection
          number="03"
          title="La versión de mí que no conoces"
          paragraphs={laVersionDeMi}
          tint="sage"
        >
          <Sprig className="absolute top-10 right-5" size={44} />
          <Sprig className="absolute top-20 left-4 rotate-180" size={30} color="var(--lavender)" />
        </LetterSection>

        {/* 04 · Dato Curioso */}
        <LetterSection
          number="04"
          title="Dato Curioso"
          paragraphs={datoCurioso}
          tint="lavender"
        />

        {/* 05 · Elizabeth */}
        <LetterSection
          number="05"
          title="Elizabeth"
          paragraphs={elizabethContent}
          tint="none"
          quiet
        >
          <PressedFlower className="top-10 right-5" size={28} color="var(--powder)" />
        </LetterSection>

        {/* 06 · Lo que quería decirte antes de irme */}
        <LetterSection
          number="06"
          title="Lo que quería decirte antes de irme"
          paragraphs={antesDeIrme}
          tint="none"
        />

        {/* 07 · Gracias y Perdón */}
        <LetterSection
          number="07"
          title="Gracias y Perdón"
          paragraphs={graciasPerdón}
          tint="sage"
        />

        {/* 08 · Aclaración — sobre interactivo */}
        <EnvelopeSection />
      </main>
    </>
  );
}
