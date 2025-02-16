/* eslint-disable @typescript-eslint/no-empty-object-type */
import NextAuth, { User } from "next-auth";
import "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { TokenType } from "../types/auth";
import { login, refresh } from "../services/auth";
import { decodeJWT } from "./jwt";

declare module "next-auth/jwt" {
  interface JWT extends TokenType {}
}

declare module "next-auth" {
  interface User extends TokenType {}
  interface Session extends TokenType {}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials as Record<
          "username" | "password",
          string
        >;

        try {
          return (await login({ username, password })) as User;
        } catch (error) {
          console.log("[auth][error]", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        return {
          ...token,
          data: user.data,
        };
      }

      const now = Math.floor(Date.now() / 1000);
      const { exp } = decodeJWT(
        (token?.data as { accessToken: string })?.accessToken
      );

      if (exp && exp > now) {
        return token;
      }

      try {
        const refreshedToken: TokenType = await refresh({
          refreshToken: token?.data?.refreshToken,
        });

        if (!refreshedToken) {
          return null;
        }

        return {
          ...token,
          data: refreshedToken.data,
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_e) {
        return null;
      }
    },
    session: async ({ token, session }) => {
      if (token) {
        const decoded = decodeJWT(token?.data?.accessToken);

        return {
          ...session,
          user: {
            ...session.user,
            name: decoded.username,
          },
          data: token.data,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  //   logger: {
  //     error: (e) => {
  //       if (process.env.NODE_ENV === "development") {
  //         const { stack: _, name, ...error } = e;
  //         console.error("[auth][error]", name, { ...error });
  //       }
  //     },
  //   },
  trustHost: true,
});
