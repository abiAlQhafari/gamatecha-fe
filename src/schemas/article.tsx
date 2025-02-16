import { z } from "zod";
import { ArticleStatus } from "../app/enum/article-status.enum";

export const articleSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(6, {
    message: "Content must be at least 6 characters.",
  }),
  mediaUrl: z.string().url("Media URL harus berupa URL yang valid"),
  categories: z.array(z.any()).min(1, {
    message: "Categories must have at least 1 item.",
  }),
  status: z.optional(z.string().default(ArticleStatus.ARCHIVED)),
});
