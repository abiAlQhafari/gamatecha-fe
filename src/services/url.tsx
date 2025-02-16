export const generateUrl = (
  path: string,
  queryParams?: {
    search?: string;
    categories_id?: number;
    page?: number;
    limit?: number;
  }
) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${path}`);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (typeof value === "number" && value === 0) return;
      if (typeof value === "string" && value === "") return;

      url.searchParams.append(key, value.toString());
    });
  }

  return url.toString();
};
