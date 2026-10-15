"use client";

import { useEffect, type RefObject } from "react";

export function useHeroVideo(videoRef: RefObject<HTMLVideoElement | null>, reduce: boolean | null) {
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
