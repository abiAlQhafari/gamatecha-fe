import { z } from "zod";
import { authSchema } from "../schemas/auth";
import { request } from "../lib/request";
import { generateUrl } from "./url";

export const login = async (data: z.infer<typeof authSchema>) => {
  return await request(generateUrl("auth/login"), {
    method: "POST",
    body: JSON.stringify(data),
  });
};
