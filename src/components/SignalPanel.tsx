"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Annual CO₂e tonnes basis aligned with worldemissions.io / existing site. */
const ANNUAL_CO2_TONNES = 60_402_739_000;
const SECONDS_PER_YEAR = 365.25 * 24 * 60 * 60;
const TONNES_PER_SECOND = ANNUAL_CO2_TONNES / SECONDS_PER_YEAR;

function formatTonnes(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function SignalMetric({
  label,
  value,
  note,
}: {
  label: string;
  value: ReactNode;
  note: ReactNode;
}) {
  return (
    <div className="flex min-w-[12.5rem] flex-1 flex-col justify-center px-7 py-8 md:px-8 md:py-9">
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-[#3d4a44]">
        {label}
      </p>
      <p className="display mt-7 text-[clamp(2rem,3vw,2.45rem)] leading-none tracking-tight text-ink">
        {value}
      </p>
      <div className="mt-5 text-sm leading-relaxed text-[#4a5a53]">{note}</div>
    </div>
  );
}

function useLiveTonnesCounter() {
  const valueRef = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = new Date(new Date().getFullYear(), 0, 1).getTime();
    let frame = 0;
    let lastPaint = 0;
    let markedReady = false;

    const tick = (now: number) => {
      // ~8 updates/sec — enough for a live feel without React re-render storms
      if (now - lastPaint >= 120) {
        lastPaint = now;
        const elapsed = Math.max(0, (Date.now() - start) / 1000);
        const el = valueRef.current;
        if (el) el.textContent = formatTonnes(elapsed * TONNES_PER_SECOND);
        if (!markedReady) {
          markedReady = true;
          setReady(true);
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return { valueRef, ready };
}

export function SignalPanel() {
  const { valueRef, ready } = useLiveTonnesCounter();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[rgba(11,15,13,0.1)] bg-[rgba(255,255,255,0.94)] shadow-[0_16px_48px_rgba(11,15,13,0.1)]">
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/80 via-[rgba(246,248,245,0.55)] to-[rgba(246,248,245,0.75)]"
        aria-hidden
      />
      <div className="relative flex flex-col lg:flex-row lg:items-stretch">
        <div className="relative min-w-0 flex-[1.75] px-7 py-8 pr-8 md:px-8 md:py-9 md:pr-10 lg:min-w-[22rem]">
          <div className="flex items-start justify-between gap-4">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-[#3d4a44]">
              GHG emitted since Jan 1
            </p>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-accent">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Live
            </span>
          </div>

          <div className="mt-7">
            <p className="display break-words text-[clamp(1.7rem,2.8vw,2.35rem)] leading-[0.95] tracking-tight text-ink tabular-nums">
              <span ref={valueRef}>{ready ? "" : "—"}</span>
            </p>
            <p className="mt-2 text-sm font-medium tracking-wide text-[#4a5a53]">tCO₂e</p>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-[#4a5a53]">
            Now:{" "}
            <span className="font-semibold text-accent">
              {TONNES_PER_SECOND.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              tCO₂e / second
            </span>
          </p>
        </div>

        <div className="h-px w-full bg-[rgba(11,15,13,0.1)] lg:h-auto lg:w-px" />

        <SignalMetric
          label="Expected warming by 2100"
          value="~2.6°C"
          note={
            <span className="block max-w-[15rem]">Based on current policies and action</span>
          }
        />

        <div className="h-px w-full bg-[rgba(11,15,13,0.1)] lg:h-auto lg:w-px" />

        <SignalMetric
          label="Closest IPCC pathway"
          value={
            <>
              SSP<span className="text-accent">2-4.5</span>
            </>
          }
          note="Middle of the Road"
        />
      </div>
    </div>
  );
}
