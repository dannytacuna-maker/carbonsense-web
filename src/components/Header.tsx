"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CarbonLogo } from "@/components/CarbonLogo";
import { DesktopNav, MobileNav } from "@/components/HeaderNav";
import { useOverDarkSlab } from "@/hooks/useOverDarkSlab";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { solid, dark } = useOverDarkSlab(pathname);

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
