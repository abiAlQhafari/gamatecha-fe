import { request } from "../api";
import { generateUrl } from "../url";

export const UploadFile = async (file: File) => {
  const body = new FormData();
  body.append("file", file);

  return await request(generateUrl("storage/upload-file"), {
    method: "POST",
    body,
  });
};
