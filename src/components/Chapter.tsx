"use client";

import { ReactNode } from "react";
import Paper from "./Paper";

export default function Chapter({
  number,
  title,
  paragraphs,
  tint = "none",
  quiet = false,
  decorations,
  onContinue,
  continueLabel = "Seguir leyendo",
}: {
  number: string;
  title: string;
  paragraphs: string[];
  tint?: "none" | "cold" | "sage" | "lavender";
  quiet?: boolean;
  decorations?: ReactNode;
  onContinue?: () => void;
  continueLabel?: string;
}) {
  return (
    <Paper tint={tint} className={quiet ? "px-6 pt-24 pb-16" : "px-6 pt-24 pb-16"}>
      {decorations}
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

        {onContinue && (
          <button
            onClick={onContinue}
            className="font-hand text-xl text-[var(--ink-soft)] mt-10 flex items-center gap-2"
          >
            {continueLabel}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </Paper>
  );
}
