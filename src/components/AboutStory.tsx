"use client";

import { useId, useState } from "react";
import { AboutStoryExpanded, AboutStoryIntro } from "@/components/AboutStoryContent";

export function AboutStory() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-8">
      <AboutStoryIntro />

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <AboutStoryExpanded />
        </div>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:text-[var(--forest)]"
      >
        <span>{open ? "Show less" : "Read more"}</span>
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M3.5 6.25 8 10.75l4.5-4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
