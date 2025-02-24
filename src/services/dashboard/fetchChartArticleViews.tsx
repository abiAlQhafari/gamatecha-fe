import { BaseApiResponse } from "../../types/api";
import { request } from "../api";
import { generateUrl } from "../url";

export const fetchChartArticleViews = async (): Promise<
  BaseApiResponse<{ name: string; value: number }[]>
> => {
  return await request(generateUrl("dashboard/chart-article-views"), {
    method: "GET",
  });
};
