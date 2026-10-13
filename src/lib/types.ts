export type Author = {
  name: string;
  slug: string;
  avatar: string;
  /** Large portrait for the expert page when it differs from the grid cutout */
  portfolioAvatar?: string;
  role: string;
  profession: string;
  education: string[];
  languages?: string[];
  country?: string;
  linkedIn?: string;
  email?: string;
  bio: string;
  expertise: string[];
};

export type ArticleAuthor = {
  name: string;
  slug?: string;
  avatar?: string;
};

export type Article = {
  slug: string;
  title: string;
  deck: string;
  date: string;
  readTime: number;
  tags: string[];
  image: string;
  authors: ArticleAuthor[];
  bodyHtml?: string;
};
