export const generateUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${path}`;
};
