"use client";

import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { jumpToHash, samePageHashFromClick, shouldUseLenis } from "@/lib/smoothScroll";

export function SmoothScroll() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    if (reduce || !shouldUseLenis()) {
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 1,
      anchors: false,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onClick = (event: MouseEvent) => {
      const hash = samePageHashFromClick(event);
      if (!hash) return;
      event.preventDefault();
      history.pushState(null, "", hash);
      jumpToHash(hash, lenis);
    };

    document.addEventListener("click", onClick, true);

    if (window.location.hash) {
      requestAnimationFrame(() => jumpToHash(window.location.hash, lenis, true));
    }

    return () => {
      document.removeEventListener("click", onClick, true);
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduce]);

  useEffect(() => {
    if (pathnameRef.current === pathname) return;
    pathnameRef.current = pathname;

    const lenis = lenisRef.current;
    const hash = window.location.hash;

    // Cross-route hash links: wait for paint; content may mount a frame later.
    if (hash) {
      requestAnimationFrame(() => {
        if (jumpToHash(hash, lenis, true)) return;
        window.setTimeout(() => jumpToHash(hash, lenis, true), 80);
      });
      return;
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
