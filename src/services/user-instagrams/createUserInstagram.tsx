import { z } from "zod";
import { userInstagramSchema } from "../../schemas/userInstagram";
import { generateUrl } from "../url";
import { request } from "../api";

export const createUserInstagram = async (
  data: z.infer<typeof userInstagramSchema>
) => {
  return await request(generateUrl("user-instagram"), {
    method: "POST",
    body: JSON.stringify(data),
  });
};
