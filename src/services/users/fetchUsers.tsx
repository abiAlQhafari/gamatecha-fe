import { request } from "../../lib/request";
import { User } from "../../types/user";
import { generateUrl } from "../url";

export const fetchUsers = async (): Promise<{
  data: User[] | [];
}> => {
  return await request(generateUrl(`users`), {
    method: "GET",
  });
};
