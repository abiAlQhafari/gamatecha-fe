import { request } from "../../lib/request";
import { generateUrl } from "../url";

export const fetchOneUserInstagram = async (id?: number) => {
  return await request(generateUrl(`user-instagram${id ? "/" + id : ""}`), {
    method: "GET",
  });
};