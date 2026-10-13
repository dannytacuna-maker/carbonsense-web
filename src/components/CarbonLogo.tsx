import Image from "next/image";

type CarbonLogoProps = {
  className?: string;
  size?: number;
  variant?: "color" | "mono" | "inverse";
};

export function CarbonLogo({
  className = "",
  size = 40,
  variant = "color",
}: CarbonLogoProps) {
  const filter =
    variant === "mono"
      ? "grayscale(1) contrast(1.15)"
      : variant === "inverse"
        ? "brightness(1.15) contrast(1.05)"
        : undefined;

  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden rounded-full bg-transparent ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={size}
        height={size}
        className="relative z-[1] h-full w-full object-cover"
        style={filter ? { filter } : undefined}
        priority={size >= 36}
      />
    </span>
  );
}
