import { Article } from "../../types/article";
import { request } from "../api";
import { generateUrl } from "../url";

export const fetchOneArticles = async (
  slug?: string
): Promise<{ data: Article }> => {
  return await request(generateUrl(`articles${slug ? "/" + slug : ""}`), {
    method: "GET",
  });
};
