import { request } from "../../lib/request";
import { generateUrl } from "../url";

export const UploadFile = async (file: File) => {
  console.log(file);

  const body = new FormData();
  body.append("file", file);

  return await request(generateUrl("storage/upload-file"), {
    method: "POST",
    body,
  });
};
