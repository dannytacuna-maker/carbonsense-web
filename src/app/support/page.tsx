import type { Metadata } from "next";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Support Us",
  description: "Support independent climate-economics writing at Carbon Sense.",
};

const ways = [
  {
    title: "Leave a review",
    body: "A short, honest review encourages others to read Carbon Sense.",
    href: site.reviewForm,
    lead: "Open",
    trailing: "form",
  },
  {
    title: "Subscribe",
    body: "Join the Substack newsletter for new essays as they publish.",
    href: site.substack,
    lead: "Open",
    trailing: "Substack",
  },
  {
    title: "Follow on LinkedIn",
    body: "Follow Carbon Sense on LinkedIn for updates.",
    href: site.linkedIn,
    lead: "Follow",
    trailing: "us",
  },
  {
    title: "Buy us a coffee",
    body: "If you prefer a small one-off contribution, you can always buy us a coffee.",
    href: site.goFundMe,
    lead: "Open",
    trailing: "GoFundMe",
  },
] as const;

export default function SupportPage() {
  return (
    <div className="pt-[72px]">
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="ambient opacity-45" />
        <div className="relative mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <p className="mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">Support</p>
            <h1 className="display mt-3 text-4xl text-ink md:text-5xl">Support our work</h1>
            <p className="mt-5 max-w-2xl text-muted leading-relaxed">
              If you value the work we do, we would be grateful for your support — reading, sharing,
              reviewing, and helping fund independent climate-economics analysis.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {ways.map((way, i) => (
              <Reveal key={way.title} delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-[var(--line)] bg-[var(--bg-panel)] p-6 transition duration-300 hover:border-accent/40">
                  <div>
                    <h2 className="display text-xl text-ink">{way.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{way.body}</p>
                  </div>
                  <div>
                    <MagneticButton
                      href={way.href}
                      external
                      variant="primary"
                      lead={way.lead}
                      trailing={way.trailing}
                      arrow
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
