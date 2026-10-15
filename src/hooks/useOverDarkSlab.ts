"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";

const HEADER_H = 72;

export function useOverDarkSlab(pathname: string) {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [overDarkSlab, setOverDarkSlab] = useState(false);
  const onArticlesLibrary = pathname === "/articles";

  const syncDarkSlab = () => {
    if (onArticlesLibrary) {
      setOverDarkSlab(true);
      return;
    }
    const section =
      document.getElementById("recent-pieces") ??
      document.getElementById("articles-library");
    if (!section) {
      setOverDarkSlab(false);
      return;
    }
    const rect = section.getBoundingClientRect();
    // Header overlaps the dark slab while any part of the slab is under the bar
    setOverDarkSlab(rect.top < HEADER_H && rect.bottom > 0);
  };

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 16);
    syncDarkSlab();
  });

  useEffect(() => {
    syncDarkSlab();
    window.addEventListener("resize", syncDarkSlab);
    return () => window.removeEventListener("resize", syncDarkSlab);
  }, [pathname, onArticlesLibrary]);

  return {
    solid,
    dark: overDarkSlab || onArticlesLibrary,
  };
}
