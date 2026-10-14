"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { ExpertPortrait } from "@/components/ExpertPortrait";
import { IconEmail, IconLinkedIn } from "@/components/Icons";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/content";
import type { Article, Author } from "@/lib/types";

type ExpertProfileViewProps = {
  author: Author;
  articles?: Article[];
};

function ProfileList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
        {items.map((item) => (
          <li key={item}>· {item}</li>
        ))}
      </ul>
    </div>
  );
}

function ProfileSocial({ author }: { author: Author }) {
  return (
    <div className="flex items-center gap-2">
      {author.linkedIn ? (
        <a
          href={author.linkedIn}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-accent transition hover:bg-[var(--accent-soft)]"
          aria-label={`${author.name} on LinkedIn`}
        >
          <IconLinkedIn className="h-[18px] w-[18px]" />
        </a>
      ) : null}
      <a
        href={`mailto:${site.email}?subject=${encodeURIComponent(`Regarding ${author.name}`)}`}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-accent transition hover:bg-[var(--accent-soft)]"
        aria-label={`Email about ${author.name}`}
      >
        <IconEmail className="h-[18px] w-[18px]" />
      </a>
    </div>
  );
}

function ProfileCopy({ author }: { author: Author }) {
  return (
    <>
      <Link
        href="/about#who-we-are"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-accent"
      >
        <span aria-hidden className="text-base leading-none">
          ←
        </span>
        Who we are
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <h1 className="text-4xl font-medium tracking-tight text-ink md:text-5xl">
          {author.name}
        </h1>
        <ProfileSocial author={author} />
      </div>

      <p className="mt-4 max-w-xl text-muted leading-relaxed">{author.profession}</p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <ProfileList title="Expertise" items={author.expertise} />
        <ProfileList title="Education" items={author.education} />
        {author.languages ? (
          <ProfileList title="Languages" items={author.languages} />
        ) : null}
        {author.country ? (
          <ProfileList title="Country" items={[author.country]} />
        ) : null}
      </div>

      <p className="mt-10 max-w-xl text-sm leading-relaxed text-muted">{author.bio}</p>
    </>
  );
}

export function ExpertProfileView({
  author,
  articles = [],
}: ExpertProfileViewProps) {
  const reduce = useReducedMotion();
  const firstName = author.name.split(" ")[0];

  return (
    <div className="pt-[72px]">
      <section className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-6xl items-end gap-8 overflow-hidden px-5 pb-0 pt-10 md:grid-cols-[minmax(0,0.85fr)_minmax(480px,1.35fr)] md:gap-8 md:px-8 md:pt-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(560px,1.5fr)] lg:overflow-visible">
        <motion.div
          className="order-2 self-center pb-12 md:order-1 md:pb-16 md:pt-4"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProfileCopy author={author} />
        </motion.div>

        <motion.div
          className="order-1 group relative mx-auto aspect-square w-full max-w-lg self-end md:order-2 md:mx-0 md:max-w-none md:min-h-[min(70vh,720px)] md:w-full lg:min-h-[min(78vh,820px)] lg:origin-bottom lg:scale-[1.08]"
          initial={reduce ? false : { opacity: 0, x: 72 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <ExpertPortrait
            src={author.portfolioAvatar ?? author.avatar}
            alt={author.name}
            priority
            objectPosition="bottom"
            sizes="(max-width:768px) 95vw, 760px"
          />
        </motion.div>
      </section>

      {articles.length > 0 ? (
        <section className="border-t border-[var(--line)] bg-elevated py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionHeading
              title={`Articles by ${firstName}`}
              description={
                articles.length === 1
                  ? "One piece published on Carbon Sense."
                  : `${articles.length} pieces published on Carbon Sense.`
              }
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {articles.map((article, i) => (
                <ArticleCard key={article.slug} article={article} index={i} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
