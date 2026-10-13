"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/content";
import type { Article } from "@/lib/types";

type ArticleCardProps = {
  article: Article;
  index?: number;
  surface?: "light" | "dark";
};

function ArticleLayoutPreview({ article }: { article: Article }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-[0_16px_40px_rgba(11,15,13,0.18)]">
      <div className="border-b border-[var(--line)] px-4 pb-4 pt-5 text-center">
        <p className="display text-[0.95rem] leading-snug text-ink">{article.title}</p>
        <p className="mt-2 text-[0.62rem] text-muted">
          By {article.authors.map((a) => a.name).join(", ")}
          <span className="mx-1.5 text-[#c5ccc8]">·</span>
          {formatDate(article.date)}
          <span className="mx-1.5 text-[#c5ccc8]">·</span>
          {article.readTime} min read
        </p>
        <p className="mt-2 line-clamp-2 text-[0.68rem] text-muted">{article.deck}</p>
      </div>
      <div className="grid grid-cols-[72px_1fr] gap-3 px-3 py-3">
        <div className="rounded-lg bg-[#f3f5f3] px-2 py-2">
          <p className="text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-ink">
            On this page
          </p>
          <div className="mt-2 space-y-1.5">
            <div className="h-1.5 w-full rounded bg-[#dfe5e1]" />
            <div className="h-1.5 w-4/5 rounded bg-[#dfe5e1]" />
            <div className="h-1.5 w-3/5 rounded bg-[#dfe5e1]" />
          </div>
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="h-1.5 w-full rounded bg-[#e7ebe8]" />
          <div className="h-1.5 w-[92%] rounded bg-[#e7ebe8]" />
          <div className="h-1.5 w-[88%] rounded bg-[#e7ebe8]" />
          <div className="relative mt-2 h-14 overflow-hidden rounded-md">
            <Image
              src={article.image}
              alt=""
              fill
              className="object-cover"
              sizes="200px"
              loading="lazy"
            />
          </div>
          <div className="h-1.5 w-full rounded bg-[#e7ebe8]" />
          <div className="h-1.5 w-3/4 rounded bg-[#e7ebe8]" />
        </div>
      </div>
      <p className="border-t border-[var(--line)] px-4 py-2 text-center text-[0.65rem] text-accent">
        Open full article →
      </p>
    </div>
  );
}

export function ArticleCard({ article, index = 0, surface = "light" }: ArticleCardProps) {
  const dark = surface === "dark";
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        href={`/articles/${article.slug}`}
        className={
          dark
            ? "article-card group relative flex h-full flex-col overflow-hidden rounded-[18px] bg-[#313131] px-6 py-[18px] transition-[background-color] duration-300 hover:bg-[#383838] focus-within:bg-[#383838]"
            : "article-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white p-4 shadow-[0_8px_28px_rgba(11,15,13,0.04)] transition duration-300 hover:border-accent/40 hover:shadow-[0_18px_44px_rgba(11,15,13,0.1)] md:rounded-[2rem] md:p-5"
        }
      >
        <div
          className={
            dark
              ? "relative aspect-[16/10] overflow-hidden rounded-[12px]"
              : "relative aspect-[16/10] overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem]"
          }
        >
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover grayscale transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 group-focus-within:scale-[1.03] group-focus-within:grayscale-0"
          />
        </div>

        <div className={`relative mt-4 flex flex-1 flex-col ${dark ? "" : "px-1 pb-1"}`}>
          <h3
            className={
              dark
                ? "display text-lg leading-snug text-[#efefef] transition-colors group-hover:text-accent group-focus-within:text-accent md:text-xl"
                : "display text-lg leading-snug text-ink transition-colors group-hover:text-accent group-focus-within:text-accent md:text-xl"
            }
          >
            {article.title}
          </h3>
          <p className="mt-2 text-sm font-medium text-accent">
            {article.authors.map((a) => a.name).join(" · ")}
          </p>
        </div>

        <div
          className={`article-card-preview pointer-events-none absolute inset-x-0 bottom-0 z-10 ${
            dark ? "px-3 pb-3" : "px-3 pb-3 md:px-4 md:pb-4"
          }`}
        >
          <ArticleLayoutPreview article={article} />
        </div>
      </Link>
    </motion.article>
  );
}
