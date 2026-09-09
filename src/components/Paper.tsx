import { ReactNode } from "react";

type Tint = "none" | "cold" | "sage" | "lavender" | "night";

const tintBg: Record<Tint, string> = {
  none: "var(--paper)",
  cold: "linear-gradient(180deg, var(--wash-cold), var(--paper) 55%)",
  sage: "linear-gradient(180deg, var(--wash-sage), var(--paper) 55%)",
  lavender: "linear-gradient(180deg, var(--wash-lavender), var(--paper) 55%)",
  night: "linear-gradient(180deg, var(--night-deep), var(--night) 70%)",
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
