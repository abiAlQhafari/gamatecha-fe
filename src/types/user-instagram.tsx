import { PostInstagram } from "./post-instagram";

export type UserInstagram = {
  id: number;
  username: string;
  profilePic?: string;
  PostInstagram?: PostInstagram[];
  lastScrapedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};
