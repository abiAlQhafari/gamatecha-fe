import { Article } from "./article";
import { UserInstagram } from "./user-instagram";

export type PostInstagram = {
  id: number;
  instagramPk: string;
  instagramId: string;
  code: string;
  takenAt: string;
  thumbnailUrl: string;
  mediaUrl: string;
  caption: string;
  user?: UserInstagram;
  articles?: Article[];
  createdAt?: string;
  updatedAt?: string;
};
