import { z } from "zod";
import { userInstagramSchema } from "../../schemas/userInstagram";
import { request } from "../../lib/request";
import { generateUrl } from "../url";

export const createUserInstagram = async (
  data: z.infer<typeof userInstagramSchema>
) => {
  return await request(generateUrl("user-instagram"), {
    method: "POST",
    body: JSON.stringify(data),
  });
};
