import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { site } from "@/lib/content";
import type { Article } from "@/lib/types";

export function ArticleKeepReading({ related }: { related: Article[] }) {
  return (
    <section className="border-t border-[var(--line)] bg-[#232323] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <h2 className="display text-2xl text-white md:text-3xl">Keep reading</h2>
          <Link
            href={site.substack}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium !text-white transition-colors duration-200 hover:!text-accent"
          >
            Subscribe →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {related.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} surface="dark" />
          ))}
        </div>
      </div>
    </section>
  );
}
