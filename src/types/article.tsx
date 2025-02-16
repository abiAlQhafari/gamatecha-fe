import { ArticleStatus } from "../app/enum/article-status.enum";
import { Category } from "./category";

export type Article = {
  id: number;
  title: string;
  slug: string;
  mediaUrl: string;
  status?: ArticleStatus;
  content: string;
  categories?: Category[];
  publishedAt?: string;
  postInstagram?: unknown;
  createdAt?: string;
  updatedAt?: string;
};
