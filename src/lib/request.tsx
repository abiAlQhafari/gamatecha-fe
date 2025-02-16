export const request = async (url: string, options?: RequestInit) => {
  const headers = new Headers(options?.headers);

  if (!headers.get("Content-Type")) {
    if (typeof options?.body === "string") {
      headers.set("Content-Type", "application/json");
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
