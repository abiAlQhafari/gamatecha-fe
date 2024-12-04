import { ArticleStatus } from "../app/enum/article-status.enum";

export type Article = {
  id: number;
  title: string;
  slug: string;
  mediaUrl: string;
  status: ArticleStatus;
  content: string;
  publishedAt?: string;
  postInstagram?: unknown;
  createdAt?: string;
  updatedAt?: string;
};
