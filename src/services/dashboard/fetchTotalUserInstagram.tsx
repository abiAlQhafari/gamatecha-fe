import { BaseApiResponse } from "../../types/api";
import { request } from "../api";
import { generateUrl } from "../url";

export const fetchTotalUserInstagram = async (): Promise<
  BaseApiResponse<number>
> => {
  return await request(generateUrl(`dashboard/total-user-instagram`), {
    method: "GET",
  });
};
