import { request } from "../../lib/request";
import { generateUrl } from "../url";

export const fetchArticles = async () => {
  return await request(generateUrl(`articles`), {
    method: "GET",
  });
};
