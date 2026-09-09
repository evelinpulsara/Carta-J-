"use client";

import { useBook } from "@/lib/useBook";
import { chapters, ChapterId } from "@/data/chapters";
import BookFrame from "./BookFrame";
import PageTransition from "./PageTransition";
import BookCover from "./BookCover";
import TableOfContents from "./TableOfContents";
import Chapter from "./Chapter";
import MemoriesChapter from "./MemoriesChapter";
import MusicPlayer from "./MusicPlayer";
import FragmentsChapter from "./FragmentsChapter";
import EnvelopeChapter from "./EnvelopeChapter";
import LastPage from "./LastPage";
import { Sprig, PressedFlower } from "./DecorativeElements";
import {
  aboutEli,
  neverSaid,
  whatHappened,
  whatILearned,
} from "@/data/content";

const titles: Record<ChapterId, string> = {
  cover: "Para ti…",
  index: "Índice",
  "never-said": "Lo que nunca dije",
  "what-happened": "Lo que pasó",
  "what-i-learned": "Lo que aprendí",
  "about-eli": "Sobre Eli",
  memories: "Recuerdos",
  soundtrack: "Banda sonora",
  fragments: "Fragmentos",
  envelope: "Índice",
  "last-page": "Última página",
};

export default function BookApp() {
  const { current, canGoBack, direction, liked, goTo, goBack, goToIndex, toggleLike } =
    useBook();

  const pageLabel = (() => {
    const idx = chapters.findIndex((c) => c.id === current);
    if (idx === -1) return null;
    return `${idx + 1} de ${chapters.length}`;
  })();

  const dark = current === "envelope";

  return (
    <BookFrame
      title={titles[current]}
      showBack={canGoBack}
      onBack={goBack}
      liked={liked.has(current)}
      onToggleLike={() => toggleLike(current)}
      pageLabel={current === "cover" || current === "last-page" ? null : pageLabel}
      dark={dark}
    >
      <PageTransition key={current} direction={direction}>
        {current === "cover" && <BookCover onOpen={() => goTo("index")} />}

        {current === "index" && <TableOfContents onSelect={(id) => goTo(id)} />}

        {current === "never-said" && (
          <Chapter
            number="01"
            title="Lo que nunca dije"
            paragraphs={neverSaid}
            onContinue={() => goTo("what-happened")}
          />
        )}

        {current === "what-happened" && (
          <Chapter
            number="02"
            title="Lo que pasó"
            paragraphs={whatHappened}
            tint="cold"
            onContinue={() => goTo("what-i-learned")}
          />
        )}

        {current === "what-i-learned" && (
          <Chapter
            number="03"
            title="Lo que aprendí"
            paragraphs={whatILearned}
            tint="sage"
            decorations={
              <>
                <Sprig className="absolute top-16 right-5" size={44} />
                <Sprig className="absolute top-24 left-4 rotate-180" size={30} color="var(--lavender)" />
              </>
            }
            onContinue={() => goTo("about-eli")}
          />
        )}

        {current === "about-eli" && (
          <Chapter
            number="04"
            title="Sobre Eli"
            paragraphs={aboutEli}
            quiet
            decorations={<PressedFlower className="top-16 right-5" size={28} color="var(--powder)" />}
            onContinue={() => goTo("memories")}
          />
        )}

        {current === "memories" && (
          <MemoriesChapter onContinue={() => goTo("soundtrack")} />
        )}

        {current === "soundtrack" && (
          <MusicPlayer onContinue={() => goTo("fragments")} />
        )}

        {current === "fragments" && (
          <FragmentsChapter onContinue={() => goTo("envelope")} />
        )}

        {current === "envelope" && (
          <EnvelopeChapter onContinue={() => goTo("last-page")} />
        )}

        {current === "last-page" && <LastPage onRestart={() => goTo("cover")} />}
      </PageTransition>

      {/* barra de navegación inferior simple, dentro de las páginas de capítulo */}
      {current !== "cover" && current !== "last-page" && (
        <button
          onClick={goToIndex}
          className="absolute bottom-8 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(59,50,66,0.08)" }}
          aria-label="Ir al índice"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h10" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </BookFrame>
  );
}
