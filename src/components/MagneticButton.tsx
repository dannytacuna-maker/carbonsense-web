"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type MagneticButtonProps = {
  href: string;
  children?: ReactNode;
  lead?: string;
  trailing?: string;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
  arrow?: boolean;
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden className="hero-pill-arrow-svg">
      <path
        d="M3.75 9h9M9 14.25 14.25 9 9 3.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function resolvePillLabels(
  lead: string | undefined,
  trailing: string | undefined,
  children: ReactNode
) {
  if (lead) return { leadText: lead, trailText: trailing };
  if (typeof children !== "string") return { leadText: lead, trailText: trailing };

  const parts = children.trim().split(/\s+/);
  if (parts.length >= 2) {
    return {
      leadText: parts.slice(0, -1).join(" "),
      trailText: parts[parts.length - 1],
    };
  }
  return { leadText: children, trailText: "→" };
}

function ButtonShell({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className: string;
  children: ReactNode;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function plainButtonClass(isPrimary: boolean) {
  return isPrimary
    ? "inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[var(--forest)]"
    : "inline-flex items-center justify-center rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent";
}

export function MagneticButton({
  href,
  children,
  lead,
  trailing,
  variant = "primary",
  external,
  className = "",
  arrow = false,
}: MagneticButtonProps) {
  const isPrimary = variant === "primary";
  const { leadText, trailText } = resolvePillLabels(lead, trailing, children);
  const useSwap = Boolean(arrow || lead || trailing || typeof children === "string");

  if (!useSwap) {
    return (
      <ButtonShell
        href={href}
        external={external}
        className={`${plainButtonClass(isPrimary)} ${className}`}
      >
        {children}
      </ButtonShell>
    );
  }

  const classNames = [
    "hero-pill",
    isPrimary ? "hero-pill-primary" : "hero-pill-ghost",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ButtonShell href={href} external={external} className={classNames}>
      <span className="hero-pill-inner">
        <span className="hero-pill-lead">{leadText}</span>
        <span className="hero-pill-swap">
          <span className="hero-pill-word">{trailText}</span>
          <span className="hero-pill-arrow" aria-hidden>
            <ArrowIcon />
          </span>
        </span>
      </span>
    </ButtonShell>
  );
}
