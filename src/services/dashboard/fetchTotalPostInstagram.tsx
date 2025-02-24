import { BaseApiResponse } from "../../types/api";
import { request } from "../api";
import { generateUrl } from "../url";

export const fetchTotalPostInstagram = async (): Promise<
  BaseApiResponse<number>
> => {
  return await request(generateUrl(`dashboard/total-post-instagram`), {
    method: "GET",
  });
};
