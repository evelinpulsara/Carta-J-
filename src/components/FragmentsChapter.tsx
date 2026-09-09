import { fragments } from "@/data/quotes";
import Paper from "./Paper";
import QuoteCard from "./QuoteCard";
import ContinueLink from "./ContinueLink";

const rotations = [-3, 4, -5, 3, -2];

export default function FragmentsChapter({ onContinue }: { onContinue: () => void }) {
  return (
    <Paper className="px-5 pt-24 pb-16">
      <p className="font-hand text-xl text-[var(--ink-soft)] mb-1">07</p>
      <h2 className="font-hand text-3xl text-[var(--ink)] mb-8">Fragmentos</h2>

      <div className="flex flex-col gap-8">
        {fragments.map((f, i) => (
          <QuoteCard key={i} fragment={f} rotate={rotations[i % rotations.length]} />
        ))}
      </div>

      <ContinueLink label="Hay algo más" onClick={onContinue} />
    </Paper>
  );
}
