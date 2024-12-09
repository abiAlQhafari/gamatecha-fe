import { z } from "zod";
import { articleSchema } from "../../schemas/article";
import { request } from "../../lib/request";
import { generateUrl } from "../url";

export const updateArticle = async (
  id: number,
  data: Partial<z.infer<typeof articleSchema>>
) => {
  return await request(generateUrl(`articles/${id}`), {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
