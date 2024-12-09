import { z } from "zod";
import { articleSchema } from "../../schemas/article";
import { request } from "../../lib/request";
import { generateUrl } from "../url";

export const createArticle = async (data: z.infer<typeof articleSchema>) => {
  return await request(generateUrl("articles"), {
    method: "POST",
    body: JSON.stringify(data),
  });
};
