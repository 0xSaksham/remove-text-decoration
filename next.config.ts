import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "storage.ko-fi.com" }],
  },
  /* config options here */
};

export default nextConfig;
