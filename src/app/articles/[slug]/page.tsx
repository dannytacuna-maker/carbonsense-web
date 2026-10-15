import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleKeepReading } from "@/components/ArticleKeepReading";
import { ArticlePageHeader } from "@/components/ArticlePageHeader";
import { getAllArticleSlugs, getArticleWithBody } from "@/lib/articles";
import { articles, site } from "@/lib/content";
import { withToc } from "@/lib/toc";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleWithBody(slug);
  if (!article) return { title: "Article" };
  return {
    title: article.title,
    description: article.deck,
    openGraph: {
      title: article.title,
      description: article.deck,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleWithBody(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);
  const { html, toc } = article.bodyHtml
    ? withToc(article.bodyHtml)
    : { html: "", toc: [] };

  return (
    <article className="article-page bg-white pt-[72px]">
      <ArticlePageHeader article={article} />

      <div className="bg-white">
        {html ? (
          <ArticleBody html={html} toc={toc} />
        ) : (
          <p className="mx-auto max-w-2xl px-5 py-16 text-muted">
            Full essay content is being migrated. Meanwhile, reach us at{" "}
            <a href={`mailto:${site.email}`} className="text-accent underline">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>

      <ArticleKeepReading related={related} />
    </article>
  );
}
