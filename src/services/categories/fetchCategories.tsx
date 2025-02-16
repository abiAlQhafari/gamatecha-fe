import { BasePaginatedApiResponse } from "../../types/api";
import { Category } from "../../types/category";
import { request } from "../api";
import { generateUrl } from "../url";

export const fetchCategories = async (queryParams: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<BasePaginatedApiResponse<Category>> => {
  return await request(generateUrl(`categories`, queryParams), {
    method: "GET",
  });
};
