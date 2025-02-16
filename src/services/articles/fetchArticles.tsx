
import { request } from "../api";
import { generateUrl } from "../url";

export const fetchArticles = async () => {
  return await request(generateUrl(`articles`), {
    method: "GET",
  });
};
