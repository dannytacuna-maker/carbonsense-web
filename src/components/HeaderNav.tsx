"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { navLinks, site } from "@/lib/content";

function linkIsActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav({ pathname, dark }: { pathname: string; dark: boolean }) {
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

export function MobileNav({
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
