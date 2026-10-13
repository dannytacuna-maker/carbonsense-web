import fs from "node:fs";
import path from "node:path";
import { articles } from "./content";
import type { Article } from "./types";

const contentDir = path.join(process.cwd(), "src/content/articles");

export function getArticleWithBody(slug: string): Article | undefined {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return undefined;

  const file = path.join(contentDir, `${slug}.html`);
  let bodyHtml: string | undefined;
  if (fs.existsSync(file)) {
    bodyHtml = fs.readFileSync(file, "utf8");
  }

  return { ...article, bodyHtml };
}

export function getAllArticleSlugs() {
  return articles.map((a) => a.slug);
}
