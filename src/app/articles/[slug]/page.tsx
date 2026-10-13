import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticleSlugs, getArticleWithBody } from "@/lib/articles";
import { articles, getAuthor, site } from "@/lib/content";
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

function formatArticleDate(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
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
      <header className="border-b border-[var(--line)] px-5 pb-8 pt-12 md:px-8 md:pb-10 md:pt-14">
        <div className="mx-auto max-w-[1100px]">
          <h1 className="display max-w-4xl text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.15] tracking-tight text-[#10241d]">
            {article.title}
          </h1>

          <div className="article-meta mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.95rem] text-[#6d7a75]">
            <span className="meta-item inline-flex items-start gap-2">
              <span className="meta-label pt-1">By</span>
              <span className="authors-list flex flex-col gap-1.5">
                {article.authors.map((a, i) => {
                  const profile = a.slug ? getAuthor(a.slug) : undefined;
                  const avatar = a.avatar ?? profile?.avatar;
                  const name = a.name;
                  const href = a.slug ? `/experts/${a.slug}` : undefined;

                  return (
                    <span key={`${name}-${i}`} className="author-item inline-flex items-center gap-2">
                      {avatar ? (
                        <Image
                          src={avatar}
                          alt=""
                          width={28}
                          height={28}
                          className="meta-avatar h-7 w-7 rounded-full object-cover"
                        />
                      ) : null}
                      {href ? (
                        <Link href={href} className="font-medium text-[#2b6cb0] hover:underline">
                          {name}
                        </Link>
                      ) : (
                        <span className="font-medium text-[#2a2f2e]">{name}</span>
                      )}
                    </span>
                  );
                })}
              </span>
            </span>

            <span className="meta-sep text-[#c5ccc8]" aria-hidden>
              •
            </span>
            <time className="meta-item" dateTime={article.date}>
              {formatArticleDate(article.date)}
            </time>
            <span className="meta-sep text-[#c5ccc8]" aria-hidden>
              •
            </span>
            <span className="meta-item">{article.readTime} min read</span>
          </div>

          <p className="mt-4 max-w-3xl text-[1.125rem] leading-relaxed text-[#6d7a75]">
            {article.deck}
          </p>
        </div>
      </header>

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
    </article>
  );
}
