import { BasePaginatedApiResponse } from "../../types/api";
import { UserInstagram } from "../../types/user-instagram";
import { request } from "../api";
import { generateUrl } from "../url";

export const fetchUserInstagram = async (queryParams: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<BasePaginatedApiResponse<UserInstagram>> => {
  return await request(generateUrl(`user-instagram`, queryParams), {
    method: "GET",
  });
};
