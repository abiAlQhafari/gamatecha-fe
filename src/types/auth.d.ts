import { BaseApiResponse } from "./api";

export type TokenType = BaseApiResponse<{
  accessToken: string;
  refreshToken: string;
}>;
