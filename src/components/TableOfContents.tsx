"use client";

import { chapters, ChapterId, TocIcon } from "@/data/chapters";
import { Paperclip, WashiTape } from "./DecorativeElements";
import Paper from "./Paper";

function ChapterIcon({ icon }: { icon: TocIcon }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as const;
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

export default function TableOfContents({ onSelect }: { onSelect: (id: ChapterId) => void }) {
  return (
    <Paper className="px-5 pt-24 pb-14">
      <WashiTape className="top-16 left-6" color="var(--powder)" rotate={-8} />
      <WashiTape className="top-16 right-8" color="var(--rose)" rotate={6} />
      <Paperclip className="top-[4.6rem] right-14 rotate-[8deg]" />

      <p className="font-hand text-3xl text-center text-[var(--ink)] mb-1">Índice</p>
      <p className="font-serif-page italic text-sm text-center text-[var(--ink-soft)] mb-8">
        cada capítulo, a su tiempo
      </p>

      <ul className="flex flex-col gap-3">
        {chapters.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => onSelect(c.id)}
              className={`w-full text-left rounded-lg border px-4 py-3.5 transition-transform active:scale-[0.98] ${
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
                    “{c.teaser}”
                  </p>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </Paper>
  );
}
