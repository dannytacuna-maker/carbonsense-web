"use client";

import type { RefObject } from "react";

export function HeroBackdrop({
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
