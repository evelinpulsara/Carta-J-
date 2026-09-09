"use client";

import { ReactNode, useEffect, useState } from "react";

/**
 * Se debe montar con `key={route}` desde el componente padre: eso garantiza
 * un remount limpio (y por tanto el estado `entered` reinicia solo) cada vez
 * que cambia de página, en vez de reiniciarlo a mano dentro de un efecto.
 */
export default function PageTransition({
  direction,
  children,
}: {
  direction: "forward" | "back";
  children: ReactNode;
}) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const startX = direction === "forward" ? 18 : -18;

  return (
    <div
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? "translateX(0)" : `translateX(${startX}px)`,
        transition: "opacity 0.55s cubic-bezier(.22,1,.36,1), transform 0.55s cubic-bezier(.22,1,.36,1)",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}
