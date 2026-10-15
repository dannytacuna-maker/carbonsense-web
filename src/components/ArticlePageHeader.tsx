import Image from "next/image";
import Link from "next/link";
import { getAuthor } from "@/lib/content";
import type { Article } from "@/lib/types";

function formatArticleDate(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ArticleAuthors({ authors }: { authors: Article["authors"] }) {
  return (
    <span className="meta-item inline-flex items-start gap-2">
      <span className="meta-label pt-1">By</span>
      <span className="authors-list flex flex-col gap-1.5">
        {authors.map((a, i) => {
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
  );
}

export function ArticlePageHeader({ article }: { article: Article }) {
  return (
    <header className="border-b border-[var(--line)] px-5 pb-8 pt-12 md:px-8 md:pb-10 md:pt-14">
      <div className="mx-auto max-w-[1100px]">
        <h1 className="display max-w-4xl text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.15] tracking-tight text-[#10241d]">
          {article.title}
        </h1>

        <div className="article-meta mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.95rem] text-[#6d7a75]">
          <ArticleAuthors authors={article.authors} />

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
  );
}
