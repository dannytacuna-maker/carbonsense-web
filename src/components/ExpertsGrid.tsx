"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ExpertPortrait } from "@/components/ExpertPortrait";
import type { Author } from "@/lib/types";

type ExpertsGridProps = {
  authors: Author[];
};

export function ExpertsGrid({ authors }: ExpertsGridProps) {
  const firstSix = authors.slice(0, 6);
  const remainder = authors.slice(6);

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
        {firstSix.map((author, i) => (
          <ExpertCard key={author.slug} author={author} index={i} />
        ))}
      </div>

      {remainder.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          <div className="hidden lg:block" aria-hidden />
          {remainder.map((author, i) => (
            <ExpertCard key={author.slug} author={author} index={6 + i} />
          ))}
          <div className="hidden lg:block" aria-hidden />
        </div>
      ) : null}
    </div>
  );
}

function ExpertCard({ author, index }: { author: Author; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/experts/${author.slug}`} className="group block">
        <div className="relative mx-auto aspect-square w-full max-w-[280px]">
          <ExpertPortrait
            src={author.avatar}
            alt={author.name}
            sizes="(max-width:768px) 45vw, 280px"
            hoverScale
          />
        </div>
        <div className="mt-3 text-center md:mt-4">
          <h3 className="display text-xl text-ink transition group-hover:text-accent md:text-2xl">
            {author.name}
          </h3>
          <p className="mt-1.5 text-sm leading-snug text-muted">{author.role}</p>
        </div>
      </Link>
    </motion.article>
  );
}
