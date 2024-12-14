/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.pravatar.cc",
        protocol: "https",
      },
      {
        hostname: "gamatecha.sgp1.digitaloceanspaces.com",
        protocol: "https",
      },
      {
        hostname: "*",
        protocol: "https",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
