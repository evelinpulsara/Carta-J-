import { Fragment } from "@/data/quotes";
import { WashiTape } from "./DecorativeElements";

const toneBg: Record<Fragment["tone"], string> = {
  rose: "#f1dcd3",
  powder: "#dbe6f0",
  sage: "#e2ead6",
  lavender: "#e9e2f2",
};

const toneTape: Record<Fragment["tone"], string> = {
  rose: "var(--rose-deep)",
  powder: "var(--powder)",
  sage: "var(--sage)",
  lavender: "var(--lavender)",
};

export default function QuoteCard({
  fragment,
  rotate = 0,
}: {
  fragment: Fragment;
  rotate?: number;
}) {
  return (
    <div
      className="relative rounded-sm px-5 py-6 w-full"
      style={{
        background: toneBg[fragment.tone],
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 4px 10px -4px rgba(59,50,66,0.28)",
      }}
    >
      <WashiTape
        className="-top-2 left-1/2 -translate-x-1/2"
        color={toneTape[fragment.tone]}
        rotate={rotate < 0 ? 4 : -4}
        width={46}
      />
      <p className="font-serif-page italic text-[16px] leading-relaxed text-[var(--ink)] text-center">
        “{fragment.text}”
      </p>
    </div>
  );
}
