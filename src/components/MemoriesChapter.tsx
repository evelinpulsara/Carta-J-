"use client";

import { memories } from "@/data/memories";
import Paper from "./Paper";
import Polaroid from "./Polaroid";
import ContinueLink from "./ContinueLink";
import { PressedFlower } from "./DecorativeElements";

const tapeColors = ["var(--powder)", "var(--rose)", "var(--lavender)", "var(--sage)"];

export default function MemoriesChapter({ onContinue }: { onContinue: () => void }) {
  return (
    <Paper className="px-5 pt-24 pb-16">
      <PressedFlower className="top-16 right-4" size={30} />
      <p className="font-hand text-xl text-[var(--ink-soft)] mb-1">05</p>
      <h2 className="font-hand text-3xl text-[var(--ink)] mb-1">Recuerdos</h2>
      <p className="font-serif-page italic text-[14px] text-[var(--ink-soft)] mb-7">
        porque algunas cosas merecen ser recordadas, sin necesidad de querer volver
      </p>

      <div className="columns-2 gap-4">
        {memories.map((m, i) => (
          <div key={i} className="mb-5 break-inside-avoid">
            <Polaroid
              src={m.src}
              caption={m.caption}
              rotate={m.rotate}
              tapeColor={tapeColors[i % tapeColors.length]}
            />
          </div>
        ))}
      </div>

      <ContinueLink label="Escuchar nuestra banda sonora" onClick={onContinue} />
    </Paper>
  );
}
