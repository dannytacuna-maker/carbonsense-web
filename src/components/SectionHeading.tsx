type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
  tone = "light",
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      {eyebrow ? (
        <div className="flex items-center justify-center gap-4">
          <span
            className={`h-px w-10 sm:w-14 ${isDark ? "bg-accent/40" : "bg-[var(--line)]"}`}
            aria-hidden
          />
          <p
            className={`mono text-[0.7rem] uppercase tracking-[0.22em] ${
              isDark ? "text-accent" : "text-muted"
            }`}
          >
            {eyebrow}
          </p>
          <span
            className={`h-px w-10 sm:w-14 ${isDark ? "bg-accent/40" : "bg-[var(--line)]"}`}
            aria-hidden
          />
        </div>
      ) : null}
      <h2
        className={`display text-3xl md:text-5xl ${eyebrow ? "mt-4" : ""} ${
          isDark ? "text-[#efefef]" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mx-auto mt-4 max-w-xl leading-relaxed ${
            isDark ? "text-white/60" : "text-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
