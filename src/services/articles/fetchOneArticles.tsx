import { request } from "../../lib/request";
import { generateUrl } from "../url";

export const fetchOneArticles = async (slug?: string) => {
  return await request(generateUrl(`articles${slug ? "/" + slug : ""}`), {
    method: "GET",
  });
};
