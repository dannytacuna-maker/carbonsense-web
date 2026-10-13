export type TocItem = { id: string; text: string; level: number };

/** Inject heading ids and build TOC (Word migrations often use h1 sections). */
export function withToc(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  let i = 0;

  const nextHtml = html.replace(
    /<h([1-3])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_match, level: string, attrs: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (!text) return _match;
      const id =
        attrs.match(/\bid=["']([^"']+)["']/i)?.[1] ??
        `sec-${++i}-${text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
          .slice(0, 48)}`;
      toc.push({ id, text, level: Number(level) });
      if (/\bid=/i.test(attrs)) {
        return `<h${level}${attrs}>${inner}</h${level}>`;
      }
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    }
  );

  return { html: nextHtml, toc };
}
