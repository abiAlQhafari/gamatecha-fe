import { z } from "zod";
import { articleSchema } from "../../schemas/article";
import { generateUrl } from "../url";
import { request } from "../api";

export const createArticle = async (data: z.infer<typeof articleSchema>) => {
  return await request(generateUrl("articles"), {
    method: "POST",
    body: JSON.stringify(data),
  });
};
