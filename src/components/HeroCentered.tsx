"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, type RefObject } from "react";
import { MagneticButton } from "@/components/MagneticButton";
import { SignalPanel } from "@/components/SignalPanel";
import { site } from "@/lib/content";

type HeroCenteredProps = {
  latestHref: string;
};

function useHeroVideo(videoRef: RefObject<HTMLVideoElement | null>, reduce: boolean | null) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    if (reduce) {
      video.pause();
      return;
    }

    const tryPlay = () => {
      const play = video.play();
      if (play !== undefined) play.catch(() => {});
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    const onInteract = () => tryPlay();
    window.addEventListener("pointerdown", onInteract, { once: true });
    window.addEventListener("keydown", onInteract, { once: true });

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
    };
  }, [videoRef, reduce]);
}

function HeroBackdrop({
  videoRef,
  reduce,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  reduce: boolean | null;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[72px]" aria-hidden>
      <video
        ref={videoRef}
        className="absolute inset-x-0 bottom-0 h-[118%] w-full object-cover object-bottom max-[900px]:h-[132%] lg:h-full lg:object-[center_78%]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero/earth-poster.jpg"
        disablePictureInPicture
      >
        <source src="/hero/earth-hero.mp4" type="video/mp4" />
      </video>
      {reduce ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/hero/earth-poster.jpg"
          alt=""
          className="absolute inset-x-0 bottom-0 h-[118%] w-full object-cover object-bottom max-[900px]:h-[132%]"
        />
      ) : null}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(255,255,255,0.94) 0%,
              rgba(255,255,255,0.82) 24%,
              rgba(255,255,255,0.62) 48%,
              rgba(255,255,255,0.48) 68%,
              rgba(255,255,255,0.38) 100%
            )
          `,
        }}
      />
      <div className="absolute inset-0 bg-white/25" aria-hidden />
    </div>
  );
}

export function HeroCentered({ latestHref }: HeroCenteredProps) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  useHeroVideo(videoRef, reduce);

  const pop = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.65,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-white pt-[72px]">
      <HeroBackdrop videoRef={videoRef} reduce={reduce} />

      <div className="relative z-[1] mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 pb-[clamp(8rem,24vh,14rem)] pt-6 text-center sm:pt-8 md:max-w-5xl md:px-8">
        <div className="flex w-full translate-y-[clamp(0.75rem,3vh,2.25rem)] flex-col items-center">
          <motion.h1
            {...pop(0.06)}
            className="display max-w-3xl text-[clamp(2.1rem,5.2vw,3.85rem)] leading-[1.08] tracking-tight text-ink"
          >
            Climate{" "}
            <span className="font-semibold text-accent">economics</span>
            {", clearly "}
            <span className="font-semibold">reasoned</span>
            {"."}
          </motion.h1>

          <motion.p
            {...pop(0.12)}
            className="mt-4 max-w-xl text-base leading-relaxed text-muted md:mt-5 md:text-lg"
          >
            For curious thinkers who want to cut through the noise — clear analysis on where climate
            economics and policy are taking us, and why the trade-offs matter.
          </motion.p>

          <motion.div
            {...pop(0.18)}
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

          <motion.div {...pop(0.26)} className="mt-8 w-full max-w-5xl text-left md:mt-10">
            <SignalPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
