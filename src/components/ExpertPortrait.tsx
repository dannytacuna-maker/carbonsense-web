"use client";

import Image from "next/image";

type ExpertPortraitProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  hoverScale?: boolean;
  objectPosition?: "center" | "bottom";
};

/** Single-image cutout: grayscale → green wash → color on hover (no dual Image decode). */
export function ExpertPortrait({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  hoverScale = false,
  objectPosition = "center",
}: ExpertPortraitProps) {
  const positionClass =
    objectPosition === "bottom" ? "object-contain object-bottom" : "object-contain object-center";

  return (
    <div className={`portrait-reveal relative h-full w-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`portrait-reveal-img ${positionClass} ${
          hoverScale ? "transition duration-700 ease-out group-hover:scale-[1.02]" : ""
        }`}
      />
      <span
        className="portrait-reveal-wave"
        style={{
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: objectPosition === "bottom" ? "center bottom" : "center",
          maskPosition: objectPosition === "bottom" ? "center bottom" : "center",
        }}
        aria-hidden
      />
    </div>
  );
}
