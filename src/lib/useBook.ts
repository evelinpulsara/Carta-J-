"use client";

import { useCallback, useMemo, useState } from "react";
import { chapterOrder, ChapterId } from "@/data/chapters";

export type Direction = "forward" | "back";

export function useBook() {
  const [stack, setStack] = useState<ChapterId[]>(["cover"]);
  const [direction, setDirection] = useState<Direction>("forward");
  const [liked, setLiked] = useState<Set<ChapterId>>(new Set());

  const current = stack[stack.length - 1];

  const goTo = useCallback((id: ChapterId) => {
    setDirection("forward");
    setStack((s) => [...s, id]);
  }, []);

  const goBack = useCallback(() => {
    setDirection("back");
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  const goToIndex = useCallback(() => {
    setDirection("back");
    setStack((s) => (s[s.length - 1] === "index" ? s : [...s, "index"]));
  }, []);

  const toggleLike = useCallback((id: ChapterId) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const nextChapterId = useMemo(() => {
    const idx = chapterOrder.indexOf(current);
    if (idx === -1 || idx === chapterOrder.length - 1) return null;
    const candidate = chapterOrder[idx + 1];
    return candidate === "index" ? null : candidate;
  }, [current]);

  return {
    current,
    canGoBack: stack.length > 1,
    direction,
    liked,
    goTo,
    goBack,
    goToIndex,
    toggleLike,
    nextChapterId,
  };
}
