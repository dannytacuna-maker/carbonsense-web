import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { Reveal } from "@/components/Reveal";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "All Articles",
  description:
    "Clear insights and analysis to understand where climate economics and policy are taking us.",
};

export default function ArticlesPage() {
  return (
    <div className="pt-[72px]">
      <section
        id="articles-library"
        className="w-full bg-[#232323] px-5 pb-16 pt-12 md:px-[48px] md:pb-[80px] md:pt-[80px] lg:px-[90px]"
      >
        <Reveal className="mb-10 md:mb-14">
          <p className="text-center text-[0.7rem] font-medium uppercase tracking-[0.22em] text-accent">
            Library
          </p>
          <h1 className="display mt-4 text-center text-4xl text-[#efefef] md:text-5xl">
            All Articles
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/60">
            Long-form explainers and opinion on carbon markets, climate finance, modelling tools,
            and the politics of the transition.
          </p>
        </Reveal>
        <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {articles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} surface="dark" />
          ))}
        </div>
      </section>
    </div>
  );
}
