import { Category } from "../../types/category";
import { request } from "../api";
import { generateUrl } from "../url";

export const fetchOneCategories = async (
  id: string
): Promise<{
  data: Category;
}> => {
  return await request(generateUrl(`categories/${id}/articles`), {
    method: "GET",
  });
};
