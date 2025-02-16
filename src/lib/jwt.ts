import { decode, JwtPayload } from "jsonwebtoken";

export function decodeJWT(token?: string | null): JwtPayload {
  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = decode(token);

  if (!decoded) {
    throw new Error("Invalid token");
  }

  return decoded as JwtPayload;
}
