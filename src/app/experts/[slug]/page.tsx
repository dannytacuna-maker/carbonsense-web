import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExpertProfileView } from "@/components/ExpertProfileView";
import { authors, getArticlesByAuthor, getAuthor } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return { title: "Expert" };
  return {
    title: author.name,
    description: author.profession,
  };
}

export default async function ExpertProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  return (
    <ExpertProfileView author={author} articles={getArticlesByAuthor(slug)} />
  );
}
