"use client";

import { CrescentMoon, ShorelineSilhouette, Starfield } from "./DecorativeElements";

export default function BookCover({ onOpen }: { onOpen: () => void }) {
  return (
    <div
      className="relative h-full w-full flex flex-col items-center justify-between px-6 pt-24 pb-14 overflow-hidden text-center"
      style={{
        background:
          "linear-gradient(180deg, var(--night-deep) 0%, var(--night) 45%, var(--night-mist) 100%)",
      }}
    >
      <Starfield count={26} />
      <CrescentMoon className="absolute top-16 right-10" size={72} />

      <div className="animate-rise" style={{ animationDelay: "0.1s" }}>
        <h1 className="font-hand text-6xl leading-[1.05] text-[#f4ecd8]">
          Para ti…
        </h1>
      </div>

      <div className="flex flex-col items-center gap-8">
        <p
          className="animate-rise font-serif-page text-[17px] leading-relaxed text-[#dbe0ee]/90 max-w-[280px]"
          style={{ animationDelay: "0.25s" }}
        >
          Hay cosas que nunca dije.
          <br />
          Y otras que tardé demasiado en entender.
        </p>

        <button
          onClick={onOpen}
          className="animate-rise font-hand text-2xl text-[#f4ecd8] border border-[#f4ecd8]/40 rounded-full px-10 py-2.5 transition-colors hover:bg-[#f4ecd8]/10 active:scale-[0.97]"
          style={{ animationDelay: "0.45s" }}
        >
          Abrir
        </button>
      </div>

      <ShorelineSilhouette className="absolute bottom-0 left-0 w-full h-40" />
    </div>
  );
}
