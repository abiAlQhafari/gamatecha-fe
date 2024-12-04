import { request } from "../../lib/request";
import { Category } from "../../types/category";
import { generateUrl } from "../url";

export const fetchCategories = async (): Promise<{
  data: Category[] | [];
}> => {
  return await request(generateUrl(`categories`), {
    method: "GET",
  });
};
