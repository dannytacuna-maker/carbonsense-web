"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/** Align hash targets with the fixed header (72px) so dark-slab color sync flips on arrival. */
const HASH_OFFSET = -72;

function shouldUseLenis() {
  if (typeof window === "undefined") return false;
  // Skip heavy smooth-scroll on low-power / battery-saver / reduced-motion machines
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const cores = navigator.hardwareConcurrency ?? 8;
  if (cores > 0 && cores <= 4) return false;
  const saveData =
    "connection" in navigator &&
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  if (saveData) return false;
  return true;
}

function scrollToElement(el: HTMLElement, lenis: Lenis | null, immediate: boolean) {
  if (lenis) {
    lenis.scrollTo(el, { offset: HASH_OFFSET, immediate, duration: 1.0 });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY + HASH_OFFSET;
  window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
}

function jumpToHash(hash: string, lenis: Lenis | null, immediate = false) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  scrollToElement(el, lenis, immediate);
  return true;
}

function samePageHashFromClick(event: MouseEvent): string | null {
  if (event.defaultPrevented) return null;
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return null;
  }
  const target = event.target;
  if (!(target instanceof Element)) return null;
  const anchor = target.closest("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return null;
  if (anchor.target === "_blank") return null;

  let url: URL;
  try {
    url = new URL(anchor.href);
  } catch {
    return null;
  }
  if (url.origin !== window.location.origin) return null;
  if (url.pathname !== window.location.pathname) return null;
  if (!url.hash || url.hash === "#") return null;
  return url.hash;
}

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
