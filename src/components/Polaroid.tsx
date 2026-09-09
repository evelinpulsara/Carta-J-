import Image from "next/image";
import { WashiTape } from "./DecorativeElements";

export default function Polaroid({
  src,
  caption,
  rotate = 0,
  tapeColor = "var(--powder)",
}: {
  src: string;
  caption?: string;
  rotate?: number;
  tapeColor?: string;
}) {
  return (
    <div
      className="bg-white p-2.5 pb-6 shadow-[0_6px_16px_-6px_rgba(59,50,66,0.35)] relative w-full"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <WashiTape
        className="-top-2.5 left-1/2 -translate-x-1/2"
        color={tapeColor}
        rotate={rotate < 0 ? -3 : 3}
        width={54}
      />
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#e8e2d3]">
        <Image src={src} alt={caption || "Recuerdo"} fill className="object-cover" unoptimized />
      </div>
      {caption && (
        <p className="font-hand text-center text-[15px] text-[var(--ink-soft)] mt-2 leading-tight px-1">
          {caption}
        </p>
      )}
    </div>
  );
}
