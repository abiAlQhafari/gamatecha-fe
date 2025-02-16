import { signOut as clientSignOut, getSession } from "next-auth/react";
import { auth, signOut } from "../lib/auth";
import { BaseApiErrorResponse } from "../types/api";
import { RequestError } from "./error";

/**
 * Makes an HTTP request to the specified URL with the given options.
 *
 * @param url - The URL to which the request is sent. Can be a string or a URL object.
 * @param options - Optional configuration for the request, such as method, headers, body, etc.
 * @param noAuth - Optional flag to indicate whether to skip adding the Authorization header. Defaults to false.
 *
 * @returns A promise that resolves to the JSON response from the server.
 *
 * @throws {RequestError} If the response is not ok or if an error occurs during the request.
 */
export async function request(
  url: RequestInfo | URL,
  options?: RequestInit,
  noAuth?: boolean
) {
  const headers = new Headers(options?.headers);

  if (!headers.get("Content-Type")) {
    if (typeof options?.body === "string") {
      headers.set("Content-Type", "application/json");
    }
  }

  if (!noAuth) {
    const session =
      typeof window === "undefined" ? await auth() : await getSession();

    if (!session) {
      if (typeof window === "undefined") {
        await signOut();
      } else {
        await clientSignOut();
      }
    }

    if (session?.data?.accessToken) {
      headers.set("Authorization", `Bearer ${session.data.accessToken}`);
    }
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const json = await res.json();

    if (!res.ok) {
      const { type, errors } = json as BaseApiErrorResponse;
      throw new RequestError({
        name: type,
        errors: errors,
      });
    }

    return json;
  } catch (error) {
    if (error instanceof RequestError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new RequestError({
        name: "serverError",
        cause: JSON.stringify(error.cause),
      });
    }

    throw new RequestError({
      name: "unknownError",
    });
  }
}
