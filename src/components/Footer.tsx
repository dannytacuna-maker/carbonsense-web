import Link from "next/link";
import { CarbonLogo } from "@/components/CarbonLogo";
import { IconEmail, IconLinkedIn, IconSubstack } from "@/components/Icons";
import { navLinks, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative z-20 mt-auto border-t border-[var(--line)] bg-[var(--bg-elevated)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <CarbonLogo size={36} />
            <p className="display text-2xl text-ink">{site.name}</p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {site.description}
          </p>
        </div>
        <div>
          <p className="mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink/90 transition hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="text-ink/90 transition hover:text-accent">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
            Contact
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-ink transition hover:border-accent hover:text-accent"
              aria-label={`Email ${site.email}`}
            >
              <IconEmail className="h-[18px] w-[18px]" />
            </a>
            <a
              href={site.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-ink transition hover:border-accent hover:text-accent"
              aria-label="Carbon Sense on LinkedIn"
            >
              <IconLinkedIn className="h-[18px] w-[18px]" />
            </a>
            <a
              href={site.substack}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-ink transition hover:border-accent hover:text-accent"
              aria-label="Carbon Sense on Substack"
            >
              <IconSubstack className="h-[17px] w-[17px]" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 text-xs text-muted md:px-8">
          <span>© {new Date().getFullYear()} Carbon Sense</span>
          <span className="mono">Evidence · Trade-offs · Clarity</span>
        </div>
      </div>
    </footer>
  );
}
