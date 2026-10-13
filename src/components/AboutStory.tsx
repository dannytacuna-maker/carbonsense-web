"use client";

import { useId, useState } from "react";

function AboutStoryIntro() {
  return (
    <div className="space-y-4 text-[1.05rem] leading-relaxed text-[#47524e]">
      <p>
        We are seven friends from different countries who met during our master’s in the
        economics of climate change and energy. We are economists with training across climate
        economics, energy economics, and applied policy analysis.
      </p>
      <p>
        We come from economics, engineering, policy, finance, and data. Different toolkits, same
        goal: to help make climate action smarter through clear analysis and practical ideas.
      </p>
      <p>
        <em>Carbon Sense is where those perspectives meet.</em> We built it because the transition
        is messy, and too often decisions are made with partial facts or misunderstood models.
      </p>
    </div>
  );
}

function AboutStoryExpanded() {
  return (
    <div className="space-y-4 pt-4 text-[1.05rem] leading-relaxed text-[#47524e]">
      <p>
        Our goal is simple: to make the economics of climate change understandable, rigorous,
        and relevant. We bridge the gap between academic research and real-world policy,
        showing how economic reasoning can help (and sometimes hinder) effective climate
        action.
      </p>
      <p>
        Our backgrounds complement each other: market design and power systems; climate finance
        and investment; regulation and competition; measurement, reporting, and verification;
        data and visualisation. We test claims against data, show our methods, and keep the
        writing plain.
      </p>
      <p>
        We also became close friends through the program. That helps. We argue, we revise, and
        we keep each other honest. The result is work that is independent, readable, and useful
        to people building, regulating, financing, or studying the transition.
      </p>

      <h2 className="display pt-4 text-[clamp(1.4rem,2vw,1.85rem)] text-[#10241d]">
        What We Publish
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="font-semibold text-[#10241d]">Deep dives</strong> into the tools
          of climate economics, from carbon pricing and cost–benefit analysis to energy system
          modelling.
        </li>
        <li>
          <strong className="font-semibold text-[#10241d]">Accessible summaries</strong> of
          research and policy debates shaping the net zero transition.
        </li>
        <li>
          <strong className="font-semibold text-[#10241d]">Clear takeaways</strong> for anyone
          curious about how economics can guide climate action.
        </li>
        <li>
          <strong className="font-semibold text-[#10241d]">Opinion pieces</strong> on current
          policy choices, emerging debates, and big ideas in climate and energy economics.
        </li>
      </ul>
      <p>
        We do not push one model or ideology. Our aim is to help readers think like economists
        about climate change, to understand trade-offs, assumptions, and the reasoning behind
        the numbers.
      </p>

      <h2 className="display pt-4 text-[clamp(1.4rem,2vw,1.85rem)] text-[#10241d]">
        Our Approach
      </h2>
      <p>
        We aim to publish weekly. Each post stands alone, but together they form a growing
        library of concepts, case studies, and insights at the intersection of economics and
        climate policy.
      </p>
      <p>We test ideas, share data, and stay transparent about assumptions. We write for clarity, not clicks.</p>
      <p className="font-medium text-ink">Let’s make sense of climate economics together.</p>
    </div>
  );
}

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
