import { request } from "../../lib/request";
import { Article } from "../../types/article";
import { generateUrl } from "../url";

export const fetchOneArticles = async (
  slug?: string
): Promise<{ data: Article }> => {
  return await request(generateUrl(`articles${slug ? "/" + slug : ""}`), {
    method: "GET",
  });
};
