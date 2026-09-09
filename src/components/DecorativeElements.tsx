"use client";

import { CSSProperties } from "react";

/** Cielo con estrellas titilando lentamente. Uso decorativo, opacidad baja. */
export function Starfield({ count = 18, className = "" }: { count?: number; className?: string }) {
  const stars = Array.from({ length: count }).map((_, i) => {
    const seed = (i * 37) % 100;
    const top = (seed * 1.7) % 92;
    const left = (i * 53) % 100;
    const delay = (i % 7) * 0.4;
    const size = 1 + (i % 3);
    return (
      <span
        key={i}
        style={
          {
            position: "absolute",
            top: `${top}%`,
            left: `${left}%`,
            width: size,
            height: size,
            borderRadius: "50%",
            background: "#f4ecd8",
            animation: `twinkle ${3 + (i % 4)}s ease-in-out ${delay}s infinite`,
          } as CSSProperties
        }
      />
    );
  });
  return <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>{stars}</div>;
}

export function CrescentMoon({ className = "", size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ animation: "drift 9s ease-in-out infinite" }}
      aria-hidden
    >
      <path
        d="M62 12C40 12 22 30 22 52c0 22 18 40 40 40 8 0 15-2 21-6-14-2-25-16-25-32s11-30 25-32c-6-4-13-10-21-10z"
        fill="#f4ecd8"
        opacity={0.92}
      />
    </svg>
  );
}

export function WashiTape({
  className = "",
  color = "var(--rose)",
  rotate = -4,
  width = 76,
}: {
  className?: string;
  color?: string;
  rotate?: number;
  width?: number;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{
        width,
        height: width * 0.34,
        background: color,
        opacity: 0.55,
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
      }}
    />
  );
}

export function Paperclip({ className = "", size = 30 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 30 48"
      className={`pointer-events-none absolute ${className}`}
      aria-hidden
    >
      <path
        d="M9 6v27a6 6 0 0012 0V10a3.5 3.5 0 00-7 0v20a1 1 0 002 0V11"
        fill="none"
        stroke="#9a9186"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sprig({ className = "", size = 40, color = "var(--sage)" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" className={className} aria-hidden>
      <path d="M30 55V20" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M30 34c-8-2-12-10-10-18 8 0 14 6 14 14" fill={color} opacity={0.55} />
      <path d="M30 26c8-2 12-9 10-16-8 0-13 5-14 12" fill={color} opacity={0.4} />
      <circle cx="30" cy="16" r="4" fill={color} opacity={0.7} />
    </svg>
  );
}

export function PressedFlower({ className = "", size = 34, color = "var(--lavender)" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={`pointer-events-none absolute ${className}`} aria-hidden>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="20"
          cy="10"
          rx="5"
          ry="9"
          fill={color}
          opacity={0.55}
          transform={`rotate(${deg} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="4" fill="var(--gold)" opacity={0.8} />
    </svg>
  );
}

export function ShorelineSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 160" className={className} preserveAspectRatio="none" aria-hidden>
      <path
        d="M0 120 Q60 100 120 118 T240 112 T400 122 V160 H0 Z"
        fill="#1b2340"
      />
      {/* silueta de gato, mirando al mar */}
      <g transform="translate(150 78)" fill="#141a30">
        <path d="M0 40 C-2 20 4 4 16 2 C15 -6 20 -10 24 -6 C26 -10 31 -9 30 -3 C40 0 44 16 40 40 Z" />
        <path d="M2 40 L2 30 M10 40 L10 32" stroke="#141a30" strokeWidth="3" />
      </g>
    </svg>
  );
}

export function MountainDawn({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} preserveAspectRatio="none" aria-hidden>
      <path d="M0 160 L70 90 L120 140 L190 60 L260 150 L320 100 L400 150 V200 H0 Z" fill="#5c6a92" opacity={0.55} />
      <path d="M0 180 L90 130 L160 170 L230 110 L300 175 L400 140 V200 H0 Z" fill="#3d4a70" opacity={0.75} />
    </svg>
  );
}

export function WaxSeal({ className = "", cracked = false }: { className?: string; cracked?: boolean }) {
  return (
    <svg
      width={54}
      height={54}
      viewBox="0 0 54 54"
      className={className}
      style={cracked ? { animation: "seal-crack 0.5s ease forwards" } : undefined}
      aria-hidden
    >
      <circle cx="27" cy="27" r="24" fill="var(--rose-deep)" />
      <circle cx="27" cy="27" r="24" fill="none" stroke="#7c3f30" strokeWidth="1" opacity={0.5} />
      <path d="M27 15c-4 3-8 4-8 9 0 4 3 6 3 6s-2 1-2 4c0 3 3 5 7 5s7-2 7-5c0-3-2-4-2-4s3-2 3-6c0-5-4-6-8-9z" fill="#e8cba8" opacity={0.85} />
    </svg>
  );
}
