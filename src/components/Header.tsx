"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CarbonLogo } from "@/components/CarbonLogo";
import { navLinks, site } from "@/lib/content";

const HEADER_H = 72;

function linkIsActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopNav({ pathname, dark }: { pathname: string; dark: boolean }) {
  return (
    <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          data-active={linkIsActive(pathname, link.href) ? "true" : "false"}
          className={`nav-link px-3.5 py-2 text-sm font-medium ${dark ? "nav-link-on-dark" : ""}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function MobileNav({
  pathname,
  dark,
  open,
  onClose,
}: {
  pathname: string;
  dark: boolean;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className={`overflow-hidden border-t md:hidden ${
            dark ? "border-white/10 bg-[#232323]" : "border-[var(--line)] bg-white"
          }`}
        >
          <div className="flex flex-col gap-1 px-5 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-active={linkIsActive(pathname, link.href) ? "true" : "false"}
                onClick={onClose}
                className={`nav-link rounded-xl px-3 py-3 text-base ${dark ? "nav-link-on-dark" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={site.substack}
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="mt-2 rounded-full bg-accent px-4 py-3 text-center text-sm font-medium !text-white"
            >
              Subscribe
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
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

  const dark = overDarkSlab || onArticlesLibrary;

  return (
    <header className="fixed inset-x-0 top-0 z-40" data-over-dark={dark ? "true" : "false"}>
      <div
        className={`border-b transition-[background,border-color,backdrop-filter,color] duration-300 ${
          dark
            ? "border-white/10 bg-[#232323]"
            : solid || open
              ? "border-[var(--line)] bg-white/90 backdrop-blur-xl"
              : "border-[var(--line)] bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 md:px-8">
          <Link
            href="/"
            className="group flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <CarbonLogo size={40} className="logo-shine" />
            <span className="flex flex-col leading-none">
              <span
                className={`display text-[1.1rem] tracking-tight transition-colors duration-300 ${
                  dark
                    ? "text-white group-hover:text-accent"
                    : "text-ink group-hover:text-accent"
                }`}
              >
                Carbon Sense
              </span>
              <span className="mono mt-1 text-[0.58rem] uppercase tracking-[0.18em] text-accent">
                Climate Economics Desk
              </span>
            </span>
          </Link>

          <DesktopNav pathname={pathname} dark={dark} />

          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border md:hidden ${
              dark
                ? "border-white/20 text-white"
                : "border-[var(--line)] text-ink"
            }`}
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-4 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-current transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-full bg-current transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>

        <MobileNav
          pathname={pathname}
          dark={dark}
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </header>
  );
}
