"use client";

import { useState } from "react";
import { pendingEnvelopeIntro, pendingEnvelopeReveal } from "@/data/content";
import Envelope from "./Envelope";
import Paper from "./Paper";
import ContinueLink from "./ContinueLink";
import { Starfield } from "./DecorativeElements";

export default function EnvelopeChapter({ onContinue }: { onContinue: () => void }) {
  const [opened, setOpened] = useState(false);

  return (
    <Paper tint="night" className="px-6 pt-24 pb-16 flex flex-col items-center text-center min-h-full">
      <Starfield count={14} />

      <p className="font-hand text-xl text-[#cfd6ea] mb-1">08</p>
      <h2 className="font-hand text-3xl text-[#f4ecd8] mb-8">Un sobre pendiente</h2>

      <p className="font-serif-page text-[16px] text-[#e3e6f0] max-w-[26ch] mb-2">
        {pendingEnvelopeIntro.heading}
      </p>
      <p className="font-serif-page italic text-[14px] text-[#c3c9dd] max-w-[26ch] mb-10">
        {pendingEnvelopeIntro.sub}
      </p>

      <Envelope opened={opened} onOpen={() => setOpened(true)} />

      {!opened && (
        <p className="font-hand text-xl text-[#cfd6ea] mt-8 animate-rise">
          {pendingEnvelopeIntro.cta}
        </p>
      )}

      {opened && (
        <div className="mt-10 max-w-[30ch] animate-rise" style={{ animationDelay: "0.3s" }}>
          <p className="font-hand text-2xl text-[#f4ecd8] mb-4">{pendingEnvelopeReveal.to}</p>
          <div className="flex flex-col gap-3">
            {pendingEnvelopeReveal.paragraphs.map((p, i) => (
              <p key={i} className="font-serif-page text-[16px] leading-relaxed text-[#e3e6f0]">
                {p}
              </p>
            ))}
          </div>
          <ContinueLink label="Última página" onClick={onContinue} light />
        </div>
      )}
    </Paper>
  );
}
