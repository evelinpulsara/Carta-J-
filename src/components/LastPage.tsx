"use client";

import { lastPage } from "@/data/content";
import { MountainDawn } from "./DecorativeElements";

export default function LastPage({ onRestart }: { onRestart: () => void }) {
  return (
    <div
      className="relative min-h-full w-full px-6 pt-24 pb-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #2c3557 0%, #7d7fa0 32%, #d4a3a8 62%, #f3d3c4 82%, #fbe8d6 100%)",
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

        <button
          onClick={onRestart}
          className="font-hand text-xl text-[#3b3242]/70 mx-auto mt-10 underline underline-offset-4"
        >
          cerrar el libro
        </button>
      </div>

      <MountainDawn className="absolute bottom-0 left-0 w-full h-36 z-0" />
    </div>
  );
}
