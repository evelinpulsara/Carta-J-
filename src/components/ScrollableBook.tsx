"use client";

import { useEffect, useRef, useState } from "react";
import {
  CrescentMoon,
  MountainDawn,
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
  aboutEli,
  neverSaid,
  whatHappened,
  whatILearned,
  pendingEnvelopeIntro,
  pendingEnvelopeReveal,
  lastPage,
} from "@/data/content";
import { memories } from "@/data/memories";
import { fragments } from "@/data/quotes";
import { songsThatHelpedMeLetGo, songsThatRemindMeOfYou } from "@/data/songs";
import Image from "next/image";

/* ─── helpers ─────────────────────────────────────────────── */

function useFadeIn(threshold = 0.15) {
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
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
  } as const;
  switch (icon) {
    case "letter":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="13" rx="1.5" />
          <path d="M4 7l8 6 8-6" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M5 19c8 1 14-5 14-14-9 0-14 6-14 14z" />
          <path d="M6 18c3-4 6-6 10-11" />
        </svg>
      );
    case "sprout":
      return (
        <svg {...common}>
          <path d="M12 21V9" />
          <path d="M12 12c-5 0-7-4-7-8 5 0 7 3 7 8z" />
          <path d="M12 9c4-1 6-4 6-7-4 0-6 3-6 7z" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path d="M20 14.5A8.5 8.5 0 0110 4a8.5 8.5 0 1010 10.5z" />
        </svg>
      );
    case "photos":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="13" height="15" rx="1" transform="rotate(-6 3 5)" />
          <rect x="7" y="4" width="13" height="15" rx="1" />
        </svg>
      );
    case "note":
      return (
        <svg {...common}>
          <circle cx="7" cy="18" r="2.5" />
          <path d="M9.5 18V6l9-2v11" />
        </svg>
      );
    case "seal":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 2" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 3l2.6 5.6L21 9.3l-4.5 4 1.3 6.2L12 16.8 6.2 19.5l1.3-6.2L3 9.3l6.4-.7z" />
        </svg>
      );
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
                c.locked ? "border-[var(--rose-deep)]/30" : "border-[var(--paper-line)]"
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
                    <span className="text-[var(--ink)]">
                      <ChapterIcon icon={c.icon} />
                    </span>
                    <span className="font-serif-page font-medium text-[15px] text-[var(--ink)]">
                      {c.title}
                    </span>
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

/* ─── Sección de texto genérica ────────────────────────────── */

const tintBg: Record<string, string> = {
  none: "var(--paper)",
  cold: "linear-gradient(180deg, var(--wash-cold), var(--paper) 55%)",
  sage: "linear-gradient(180deg, var(--wash-sage), var(--paper) 55%)",
  lavender: "linear-gradient(180deg, var(--wash-lavender), var(--paper) 55%)",
  night: "linear-gradient(180deg, var(--night-deep), var(--night) 70%)",
};

function TextSection({
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
      <div className="max-w-[38ch] mx-auto">
        <p className="font-hand text-xl text-[var(--ink-soft)] mb-1">{number}</p>
        <h2
          className={`font-hand text-[var(--ink)] mb-6 leading-tight ${
            quiet ? "text-2xl" : "text-3xl"
          }`}
        >
          {title}
        </h2>
        <div className={`flex flex-col ${quiet ? "gap-3" : "gap-4"}`}>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-serif-page text-[17px] leading-[1.75] text-[var(--ink)]"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Recuerdos ────────────────────────────────────────────── */

const tapeColors = ["var(--powder)", "var(--rose)", "var(--lavender)", "var(--sage)"];

function MemoriesSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref}
      className="relative w-full px-5 pt-20 pb-16 paper-texture"
      style={{
        background: "var(--paper)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <PressedFlower className="top-10 right-4" size={30} />
      <p className="font-hand text-xl text-[var(--ink-soft)] mb-1">05</p>
      <h2 className="font-hand text-3xl text-[var(--ink)] mb-1">Recuerdos</h2>
      <p className="font-serif-page italic text-[14px] text-[var(--ink-soft)] mb-7">
        porque algunas cosas merecen ser recordadas, sin necesidad de querer volver
      </p>
      <div className="columns-2 gap-4 max-w-[500px] mx-auto">
        {memories.map((m, i) => (
          <div key={i} className="mb-5 break-inside-avoid">
            <div
              className="bg-white p-2.5 pb-6 shadow-[0_6px_16px_-6px_rgba(59,50,66,0.35)] relative w-full"
              style={{ transform: `rotate(${m.rotate}deg)` }}
            >
              <WashiTape
                className="-top-2.5 left-1/2 -translate-x-1/2"
                color={tapeColors[i % tapeColors.length]}
                rotate={m.rotate < 0 ? -3 : 3}
                width={54}
              />
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#e8e2d3]">
                <Image
                  src={m.src}
                  alt={m.caption || "Recuerdo"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              {m.caption && (
                <p className="font-hand text-center text-[15px] text-[var(--ink-soft)] mt-2 leading-tight px-1">
                  {m.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Música ───────────────────────────────────────────────── */

function SongRow({ song }: { song: { title: string; artist: string } }) {
  const [liked, setLiked] = useState(false);
  return (
    <li className="flex items-center gap-3 py-2.5 border-b border-[var(--paper-line)]/70 last:border-0">
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0 text-[var(--ink-soft)]"
      >
        <circle cx="7" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9.5 18V6l9-2v11" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <div className="min-w-0 flex-1">
        <p className="font-serif-page text-[15px] text-[var(--ink)] truncate">{song.title}</p>
        <p className="font-serif-page italic text-[12.5px] text-[var(--ink-soft)] truncate">
          {song.artist}
        </p>
      </div>
      <button
        aria-label="Guardar canción"
        onClick={() => setLiked((v) => !v)}
        className="shrink-0"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={liked ? "var(--rose-deep)" : "none"}
        >
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

function MusicSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref}
      className="relative w-full px-5 pt-20 pb-16 paper-texture"
      style={{
        background: tintBg["lavender"],
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <p className="font-hand text-xl text-[var(--ink-soft)] mb-1">06</p>
      <h2 className="font-hand text-3xl text-[var(--ink)] mb-3">Nuestra banda sonora</h2>
      <p className="font-serif-page text-[16px] leading-relaxed text-[var(--ink)] mb-6 max-w-[38ch]">
        Hay canciones que no hablan de ti, pero inevitablemente me recuerdan a ti. Y hubo otras
        que simplemente estuvieron conmigo mientras aprendía a soltarte.
      </p>
      <div className="max-w-[500px] mx-auto">
        <section className="mb-7">
          <h3 className="font-hand text-2xl text-[var(--ink)] mb-1">
            Las que me recuerdan a ti
          </h3>
          <ul>
            {songsThatRemindMeOfYou.map((s, i) => (
              <SongRow key={i} song={s} />
            ))}
          </ul>
        </section>
        <section>
          <h3 className="font-hand text-2xl text-[var(--ink)] mb-1">
            Las que me ayudaron a seguir
          </h3>
          <ul>
            {songsThatHelpedMeLetGo.map((s, i) => (
              <SongRow key={i} song={s} />
            ))}
          </ul>
        </section>
      </div>
      <p className="font-hand text-lg text-center text-[var(--ink-soft)] mt-8">
        cada canción tiene una historia
      </p>
    </section>
  );
}

/* ─── Fragmentos ───────────────────────────────────────────── */

const toneBg: Record<string, string> = {
  rose: "#f1dcd3",
  powder: "#dbe6f0",
  sage: "#e2ead6",
  lavender: "#e9e2f2",
};
const toneTape: Record<string, string> = {
  rose: "var(--rose-deep)",
  powder: "var(--powder)",
  sage: "var(--sage)",
  lavender: "var(--lavender)",
};
const rotations = [-3, 4, -5, 3, -2];

function FragmentsSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref}
      className="relative w-full px-5 pt-20 pb-16 paper-texture"
      style={{
        background: "var(--paper)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <p className="font-hand text-xl text-[var(--ink-soft)] mb-1">07</p>
      <h2 className="font-hand text-3xl text-[var(--ink)] mb-8">Fragmentos</h2>
      <div className="flex flex-col gap-8 max-w-[440px] mx-auto">
        {fragments.map((f, i) => {
          const rotate = rotations[i % rotations.length];
          return (
            <div
              key={i}
              className="relative rounded-sm px-5 py-6 w-full"
              style={{
                background: toneBg[f.tone],
                transform: `rotate(${rotate}deg)`,
                boxShadow: "0 4px 10px -4px rgba(59,50,66,0.28)",
              }}
            >
              <WashiTape
                className="-top-2 left-1/2 -translate-x-1/2"
                color={toneTape[f.tone]}
                rotate={rotate < 0 ? 4 : -4}
                width={46}
              />
              <p className="font-serif-page italic text-[16px] leading-relaxed text-[var(--ink)] text-center">
                &ldquo;{f.text}&rdquo;
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Sobre pendiente ──────────────────────────────────────── */

function EnvelopeSection() {
  const [opened, setOpened] = useState(false);
  const [pressed, setPressed] = useState(false);
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref}
      className="relative w-full px-6 pt-20 pb-16 flex flex-col items-center text-center"
      style={{
        background: tintBg["night"],
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <Starfield count={14} />
      <p className="font-hand text-xl text-[#cfd6ea] mb-1">08</p>
      <h2 className="font-hand text-3xl text-[#f4ecd8] mb-8">Un sobre pendiente</h2>
      <p className="font-serif-page text-[16px] text-[#e3e6f0] max-w-[26ch] mb-2">
        {pendingEnvelopeIntro.heading}
      </p>
      <p className="font-serif-page italic text-[14px] text-[#c3c9dd] max-w-[26ch] mb-10">
        {pendingEnvelopeIntro.sub}
      </p>

      <button
        onClick={() => setOpened(true)}
        disabled={opened}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        aria-label="Tocar el sobre para abrirlo"
        className="relative w-[230px] h-[160px] mx-auto block"
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
          <path
            d="M4 8 L115 90 L226 8"
            fill="none"
            stroke="#c4b183"
            strokeWidth="1.4"
            opacity={0.7}
          />
          <rect
            x="4"
            y="8"
            width="222"
            height="148"
            rx="6"
            fill="none"
            stroke="#c4b183"
            strokeWidth="1"
            opacity={0.6}
          />
        </svg>
        <div
          className="absolute top-0 left-0 w-full h-[92px] origin-top"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.9s cubic-bezier(.22,1,.36,1)",
            transform: opened ? "rotateX(-150deg)" : "rotateX(0deg)",
          }}
        >
          <svg viewBox="0 0 230 92" className="w-full h-full absolute top-0 left-0">
            <path
              d="M4 6 L115 88 L226 6 Z"
              fill="url(#flapGradient2)"
              stroke="#c4b183"
              strokeWidth="1"
            />
            <defs>
              <linearGradient id="flapGradient2" x1="0" y1="0" x2="0" y2="1">
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
        <p className="font-hand text-xl text-[#cfd6ea] mt-8 animate-rise">
          {pendingEnvelopeIntro.cta}
        </p>
      )}
      {opened && (
        <div
          className="mt-10 max-w-[30ch] animate-rise"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="font-hand text-2xl text-[#f4ecd8] mb-4">
            {pendingEnvelopeReveal.to}
          </p>
          <div className="flex flex-col gap-3">
            {pendingEnvelopeReveal.paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-serif-page text-[16px] leading-relaxed text-[#e3e6f0]"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── Última página ────────────────────────────────────────── */

function LastSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] w-full px-6 pt-20 pb-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #2c3557 0%, #7d7fa0 32%, #d4a3a8 62%, #f3d3c4 82%, #fbe8d6 100%)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div className="max-w-[36ch] mx-auto flex flex-col gap-4 relative z-10">
        {lastPage.map((p, i) => (
          <p
            key={i}
            className="font-serif-page text-[16.5px] leading-[1.75] text-[#2f2a3a] text-center"
          >
            {p}
          </p>
        ))}
        <p className="font-hand text-2xl text-center text-[#3b3242] mt-4">
          Con cariño,
          <br />
          E. 🤍
        </p>
        <p className="font-hand text-3xl text-center text-[#3b3242]/80 mt-10">Fin.</p>
      </div>
      <MountainDawn className="absolute bottom-0 left-0 w-full h-36 z-0" />
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
          50% { transform: translateY(8px); }
        }
      `}</style>

      <main className="w-full max-w-[500px] mx-auto min-h-dvh">
        <Cover />
        <TableOfContents />
        <TextSection
          number="01"
          title="Lo que nunca dije"
          paragraphs={neverSaid}
          tint="none"
        />
        <TextSection
          number="02"
          title="Lo que pasó"
          paragraphs={whatHappened}
          tint="cold"
        />
        <TextSection
          number="03"
          title="Lo que aprendí"
          paragraphs={whatILearned}
          tint="sage"
        >
          <Sprig className="absolute top-10 right-5" size={44} />
          <Sprig
            className="absolute top-20 left-4 rotate-180"
            size={30}
            color="var(--lavender)"
          />
        </TextSection>
        <TextSection
          number="04"
          title="Sobre Eli"
          paragraphs={aboutEli}
          tint="none"
          quiet
        >
          <PressedFlower className="top-10 right-5" size={28} color="var(--powder)" />
        </TextSection>
        <MemoriesSection />
        <MusicSection />
        <FragmentsSection />
        <EnvelopeSection />
        <LastSection />
      </main>
    </>
  );
}
