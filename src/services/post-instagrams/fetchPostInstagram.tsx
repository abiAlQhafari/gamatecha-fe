import { request } from "../../lib/request";
import { generateUrl } from "../url";

export const fetchPostInstagram = async (id?: number) => {
  return await request(
    generateUrl(`user-instagram${id ? "/" + id : ""}/post-instagram`),
    {
      method: "GET",
    }
  );
};
