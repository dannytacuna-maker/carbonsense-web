"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { MagneticButton } from "@/components/MagneticButton";
import { SignalPanel } from "@/components/SignalPanel";
import { useHeroVideo } from "@/hooks/useHeroVideo";
import { site } from "@/lib/content";

type HeroCenteredProps = {
  latestHref: string;
};

function heroPop(reduce: boolean | null, delay: number) {
  if (reduce) return {};
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };
}

export function HeroCentered({ latestHref }: HeroCenteredProps) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  useHeroVideo(videoRef, reduce);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-white pt-[72px]">
      <HeroBackdrop videoRef={videoRef} reduce={reduce} />

      <div className="relative z-[1] mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 pb-[clamp(8rem,24vh,14rem)] pt-6 text-center sm:pt-8 md:max-w-5xl md:px-8">
        <div className="flex w-full translate-y-[clamp(0.75rem,3vh,2.25rem)] flex-col items-center">
          <motion.h1
            {...heroPop(reduce, 0.06)}
            className="display max-w-3xl text-[clamp(2.1rem,5.2vw,3.85rem)] leading-[1.08] tracking-tight text-ink"
          >
            Climate{" "}
            <span className="font-semibold text-accent">economics</span>
            {", clearly "}
            <span className="font-semibold">reasoned</span>
            {"."}
          </motion.h1>

          <motion.p
            {...heroPop(reduce, 0.12)}
            className="mt-4 max-w-xl text-base leading-relaxed text-muted md:mt-5 md:text-lg"
          >
            For curious thinkers who want to cut through the noise — clear analysis on where climate
            economics and policy are taking us, and why the trade-offs matter.
          </motion.p>

          <motion.div
            {...heroPop(reduce, 0.18)}
            className="mt-7 flex flex-wrap items-center justify-center gap-3.5 md:mt-8 md:gap-4"
          >
            <MagneticButton href={latestHref} lead="Read" trailing="latest" arrow />
            <MagneticButton
              href={site.substack}
              variant="ghost"
              external
              lead="Subscribe"
              trailing="now"
              arrow
            />
          </motion.div>

          <motion.div {...heroPop(reduce, 0.26)} className="mt-8 w-full max-w-5xl text-left md:mt-10">
            <SignalPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
