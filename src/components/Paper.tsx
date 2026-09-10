import { ReactNode } from "react";

type Tint = "none" | "cold" | "sage" | "lavender" | "night";

const tintBg: Record<Tint, string> = {
  none:     "var(--grad-section-base)",
  cold:     "var(--grad-section-cold)",
  sage:     "var(--grad-section-sage)",
  lavender: "var(--grad-section-lavender)",
  night:    "var(--grad-section-night)",
};

export default function Paper({
  children,
  tint = "none",
  className = "",
}: {
  children: ReactNode;
  tint?: Tint;
  className?: string;
}) {
  return (
    <div
      className={`paper-texture relative min-h-full w-full ${className}`}
      style={{ background: tintBg[tint] }}
    >
      {children}
    </div>
  );
}
