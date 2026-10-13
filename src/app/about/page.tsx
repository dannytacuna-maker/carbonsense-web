import type { Metadata } from "next";
import { AboutStory } from "@/components/AboutStory";
import { ExpertsGrid } from "@/components/ExpertsGrid";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { authors } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Making sense of the economics of climate change.",
};

export default function AboutPage() {
  return (
    <div className="pt-[72px]">
      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <p className="mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">About</p>
            <h1 className="display mt-3 text-4xl text-ink md:text-5xl">
              Making sense of the economics of climate change
            </h1>
            <AboutStory />
          </Reveal>
        </div>
      </section>

      <section id="who-we-are" className="scroll-mt-[72px] bg-elevated py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal className="mb-10 md:mb-12">
            <SectionHeading
              title="Who we are"
              description="Select a portrait to open a full profile — education, expertise, and LinkedIn."
            />
          </Reveal>
          <ExpertsGrid authors={authors} />
        </div>
      </section>
    </div>
  );
}
