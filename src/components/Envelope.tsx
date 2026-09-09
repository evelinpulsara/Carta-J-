"use client";

import { useState } from "react";
import { WaxSeal } from "./DecorativeElements";

export default function Envelope({
  opened,
  onOpen,
}: {
  opened: boolean;
  onOpen: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onOpen}
      disabled={opened}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      aria-label="Tocar el sobre para abrirlo"
      className="relative w-[230px] h-[160px] mx-auto block"
      style={{ perspective: "900px" }}
    >
      {/* cuerpo del sobre */}
      <div
        className="absolute inset-0 rounded-md"
        style={{
          background: "linear-gradient(160deg, #ece0cb, #ddcba9)",
          boxShadow: "0 14px 30px -10px rgba(0,0,0,0.45)",
          transform: pressed && !opened ? "scale(0.98)" : "scale(1)",
          transition: "transform 0.15s ease",
        }}
      />
      {/* costuras */}
      <svg viewBox="0 0 230 160" className="absolute inset-0 w-full h-full">
        <path d="M4 8 L115 90 L226 8" fill="none" stroke="#c4b183" strokeWidth="1.4" opacity={0.7} />
        <rect x="4" y="8" width="222" height="148" rx="6" fill="none" stroke="#c4b183" strokeWidth="1" opacity={0.6} />
      </svg>

      {/* solapa, gira al abrir */}
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
            fill="url(#flapGradient)"
            stroke="#c4b183"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="flapGradient" x1="0" y1="0" x2="0" y2="1">
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
  );
}
