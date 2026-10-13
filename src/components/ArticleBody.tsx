"use client";

import katex from "katex";
import { useEffect, useRef } from "react";
import type { TocItem } from "@/lib/toc";
import "katex/dist/katex.min.css";

type ArticleBodyProps = {
  html: string;
  toc: TocItem[];
};

// Mammoth migration placeholders → hosted Plotly pages
const EMBED_SRC: Record<string, { src: string; minHeight: number; title: string }> = {
  "es_dashboard_tabs.html": {
    src: "/assets/es_dashboard_tabs.html",
    minHeight: 720,
    title: "Spanish economy dashboard",
  },
  "scope1_center_2d_with_year_slider.html": {
    src: "/assets/scope1_center_2d_with_year_slider.html",
    minHeight: 720,
    title: "Scope 1 emissions by industry",
  },
  ES_SCC_DAMAGE_INTERACTIVE_GVA_XCAP: {
    src: "/assets/es_scc_damage_interactive_gva_xcap.html",
    minHeight: 780,
    title: "Social cost of carbon by industry",
  },
  "es_scc_damage_interactive_gva_xcap.html": {
    src: "/assets/es_scc_damage_interactive_gva_xcap.html",
    minHeight: 780,
    title: "Social cost of carbon by industry",
  },
};

const MATH_PATTERN =
  /\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$\$([\s\S]+?)\$\$|\$([^\$\n]+?)\$/g;

function collectMathTextNodes(root: HTMLElement) {
  const texts: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent) continue;
    if (parent.closest(".katex, script, style, noscript, .article-embed")) continue;
    const value = node.textContent ?? "";
    if (value.includes("\\(") || value.includes("\\[") || value.includes("$$") || value.includes("$")) {
      texts.push(node as Text);
    }
  }
  return texts;
}

function renderTexMatch(match: RegExpExecArray) {
  const display = Boolean(match[1] || match[3]);
  const tex = (match[1] ?? match[2] ?? match[3] ?? match[4] ?? "").trim();
  const span = document.createElement(display ? "div" : "span");
  if (display) span.className = "katex-block";
  try {
    katex.render(tex, span, {
      displayMode: display,
      throwOnError: false,
      strict: "ignore",
      trust: false,
    });
  } catch {
    span.textContent = match[0];
  }
  return span;
}

function renderMathInElement(root: HTMLElement) {
  for (const textNode of collectMathTextNodes(root)) {
    const text = textNode.textContent ?? "";
    const frag = document.createDocumentFragment();
    let last = 0;
    let match: RegExpExecArray | null;
    MATH_PATTERN.lastIndex = 0;
    while ((match = MATH_PATTERN.exec(text)) !== null) {
      if (match.index > last) {
        frag.appendChild(document.createTextNode(text.slice(last, match.index)));
      }
      frag.appendChild(renderTexMatch(match));
      last = match.index + match[0].length;
    }
    if (last === 0) continue;
    if (last < text.length) {
      frag.appendChild(document.createTextNode(text.slice(last)));
    }
    textNode.parentNode?.replaceChild(frag, textNode);
  }
}

function createEmbedFrame(key: string) {
  const embed = EMBED_SRC[key];
  if (!embed) return null;

  const wrap = document.createElement("div");
  wrap.className = "article-embed";
  wrap.dataset.embedKey = key;

  const iframe = document.createElement("iframe");
  iframe.src = embed.src;
  iframe.title = embed.title;
  iframe.loading = "lazy";
  iframe.setAttribute("scrolling", "no");
  iframe.style.width = "100%";
  iframe.style.height = `${embed.minHeight}px`;
  iframe.style.border = "0";
  iframe.style.borderRadius = "0.75rem";
  iframe.style.background = "#fff";
  wrap.appendChild(iframe);
  return wrap;
}

function hydrateEmbedPlaceholders(root: HTMLElement) {
  root.querySelectorAll("p, div").forEach((el) => {
    if (el.querySelector("iframe, .article-embed")) return;
    const text = (el.textContent ?? "").trim();
    const match = text.match(/^\[([^\]]+)\]$/);
    if (!match) return;
    const frame = createEmbedFrame(match[1]);
    if (!frame) return;
    el.replaceWith(frame);
  });
}

function bindEmbedResize(root: HTMLElement) {
  const onMessage = (event: MessageEvent) => {
    const data = event.data as { type?: string; height?: number } | null;
    if (!data || data.type !== "plot-size") return;
    const height = Number(data.height);
    if (!Number.isFinite(height) || height < 200) return;

    root.querySelectorAll<HTMLIFrameElement>(".article-embed iframe").forEach((iframe) => {
      if (iframe.contentWindow !== event.source) return;
      const next = Math.max(480, Math.min(1200, Math.round(height)));
      iframe.style.height = `${next}px`;
    });
  };

  window.addEventListener("message", onMessage);
  return () => window.removeEventListener("message", onMessage);
}

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
