import { BaseApiResponse } from "../../types/api";
import { request } from "../api";
import { generateUrl } from "../url";

export const fetchTotalArticle = async (): Promise<BaseApiResponse<number>> => {
  return await request(generateUrl(`dashboard/total-article`), {
    method: "GET",
  });
};
