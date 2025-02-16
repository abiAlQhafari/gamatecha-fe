import { z } from "zod";
import { authSchema } from "../schemas/auth";
import { generateUrl } from "./url";
import { request } from "./api";

export async function login(data: z.infer<typeof authSchema>) {
  return await request(
    generateUrl("auth/login"),
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    true
  );
}

export async function refresh(payload: { refreshToken: string }) {
  return await request(
    generateUrl("auths/refresh"),
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    true
  );
}
