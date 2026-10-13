import type { Metadata } from "next";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Carbon Sense.",
};

export default function ContactPage() {
  return (
    <div className="pt-[72px]">
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="ambient opacity-50" />
        <div className="relative mx-auto max-w-2xl px-5 md:px-8">
          <Reveal>
            <p className="mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">Contact</p>
            <h1 className="display mt-3 text-4xl text-ink md:text-5xl">Get in touch</h1>
            <p className="mt-5 text-muted leading-relaxed">
              Best for feedback, questions, and collaboration ideas. Send a message to the desk —
              we read everything.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted">
              <li className="rounded-2xl border border-[var(--line)] bg-[var(--bg-panel)] px-5 py-4 transition hover:border-accent/35">
                Feedback on essays and methods
              </li>
              <li className="rounded-2xl border border-[var(--line)] bg-[var(--bg-panel)] px-5 py-4 transition hover:border-accent/35">
                Collaboration and speaking ideas
              </li>
              <li className="rounded-2xl border border-[var(--line)] bg-[var(--bg-panel)] px-5 py-4 transition hover:border-accent/35">
                Press and partnership notes
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton href={`mailto:${site.email}`} external>
                Email {site.email}
              </MagneticButton>
              <MagneticButton href={site.linkedIn} variant="ghost" external>
                LinkedIn
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
