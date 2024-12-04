import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(6, {
    message: "Content must be at least 6 characters.",
  }),
  mediaUrl: z
    .string()
    .min(6, {
      message: "Image URL must be a valid URL.",
    })
    .default("Hello world"),
  categories: z.array(z.any()).min(1, {
    message: "Categories must have at least 1 item.",
  }),
});
