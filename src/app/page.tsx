import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { ExpertsGrid } from "@/components/ExpertsGrid";
import { HeroCentered } from "@/components/HeroCentered";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { articles, authors, site } from "@/lib/content";

export default function HomePage() {
  const latest = articles.slice(0, 6);

  return (
    <>
      <HeroCentered latestHref="#recent-pieces" />

      <section
        id="recent-pieces"
        className="relative z-10 w-full scroll-mt-[72px] bg-[#232323] px-5 pb-16 pt-12 md:px-[48px] md:pb-[80px] md:pt-[80px] lg:px-[90px]"
      >
        <Reveal className="mb-8 w-full md:mb-[42px]">
          <SectionHeading
            tone="dark"
            title="Recent pieces"
            description="Clear essays on carbon markets, energy policy, and the trade-offs shaping the climate transition — written to be rigorous and readable."
          />
          <div className="mt-5 text-center">
            <Link
              href="/articles"
              className="text-sm font-medium !text-white transition-colors duration-200 hover:!text-accent"
            >
              All articles →
            </Link>
          </div>
        </Reveal>
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {latest.map((article, i) => (
            <div key={article.slug} className={i >= 3 ? "hidden sm:block" : undefined}>
              <ArticleCard article={article} index={i} surface="dark" />
            </div>
          ))}
        </div>
      </section>

      <section id="who-we-are" className="border-t border-[var(--line)] bg-night py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal className="mb-10 md:mb-12">
            <SectionHeading
              title="Who we are"
              description="Seven economists who met during a master’s in the economics of climate change and energy — independent, rigorous, and readable."
            />
          </Reveal>
          <ExpertsGrid authors={authors} />
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-elevated py-20">
        <Reveal className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <h2 className="display text-3xl text-ink md:text-4xl">Stay with the work</h2>
          <p className="mt-4 text-muted">
            Weekly essays on carbon pricing, energy markets, and the tools of climate economics.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <MagneticButton href={site.substack} external lead="Subscribe" trailing="now" arrow />
            <MagneticButton href="/support" variant="ghost" lead="Support" trailing="us" arrow />
          </div>
        </Reveal>
      </section>
    </>
  );
}
