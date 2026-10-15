"use client";

import { useEffect, useRef } from "react";
import { bindEmbedResize, hydrateEmbedPlaceholders } from "@/lib/articleEmbeds";
import { renderMathInElement } from "@/lib/articleMath";
import type { TocItem } from "@/lib/toc";
import "katex/dist/katex.min.css";

type ArticleBodyProps = {
  html: string;
  toc: TocItem[];
};

function ArticleToc({ toc }: { toc: TocItem[] }) {
  return (
    <aside
      className="article-toc md:sticky md:top-[5.75rem] md:max-h-[calc(100vh-6.5rem)] md:self-start md:overflow-auto"
      aria-label="On this page"
    >
      <p className="toc-title">On this page</p>
      <ul className="toc-list">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={item.level > 2 ? "toc-sub" : undefined}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function ArticleBody({ html, toc }: ArticleBodyProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    hydrateEmbedPlaceholders(el);
    renderMathInElement(el);
    return bindEmbedResize(el);
  }, [html]);

  const hasToc = toc.length > 0;

  return (
    <div className="article-section mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-12">
      <div
        className={`article-layout ${
          hasToc
            ? "grid gap-6 md:grid-cols-[minmax(210px,240px)_minmax(0,1fr)] md:gap-[26px]"
            : "block"
        }`}
      >
        {hasToc ? <ArticleToc toc={toc} /> : null}

        <div className="article-main min-w-0">
          <div
            ref={bodyRef}
            className="prose-article"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
