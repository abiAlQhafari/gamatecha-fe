import { User } from "../../types/user";
import { request } from "../api";
import { generateUrl } from "../url";

export const fetchUsers = async (): Promise<{
  data: User[] | [];
}> => {
  return await request(generateUrl(`users`), {
    method: "GET",
  });
};
