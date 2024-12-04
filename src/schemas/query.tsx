import { z } from "zod";

export const querySchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
  orderBy: z.string().optional().default("createdAt"),
  orderDirection: z.string().optional().default("DESC"),
});
