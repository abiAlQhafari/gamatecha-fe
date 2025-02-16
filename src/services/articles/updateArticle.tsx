import { z } from "zod";
import { articleSchema } from "../../schemas/article";
import { generateUrl } from "../url";
import { request } from "../api";

export const updateArticle = async (
  id: number,
  data: Partial<z.infer<typeof articleSchema>>
) => {
  return await request(generateUrl(`articles/${id}`), {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
