import type Lenis from "lenis";

/** Align hash targets with the fixed header (72px) so dark-slab color sync flips on arrival. */
export const HASH_OFFSET = -72;

export function shouldUseLenis() {
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

export function jumpToHash(hash: string, lenis: Lenis | null, immediate = false) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  scrollToElement(el, lenis, immediate);
  return true;
}

export function samePageHashFromClick(event: MouseEvent): string | null {
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
