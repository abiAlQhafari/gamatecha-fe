import { request } from "../../lib/request";
import { UserInstagram } from "../../types/user-instagram";
import { generateUrl } from "../url";

export const fetchUserInstagram = async (): Promise<{
  data: UserInstagram[] | [];
}> => {
  return await request(generateUrl(`user-instagram`), {
    method: "GET",
  });
};
