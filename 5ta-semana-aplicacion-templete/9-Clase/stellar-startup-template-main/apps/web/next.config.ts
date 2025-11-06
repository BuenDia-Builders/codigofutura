import type { NextConfig } from "next";

const transpilePackages = [
  process.env.NEXT_PUBLIC_HELLO_WORLD_BINDING || "",
  process.env.NEXT_PUBLIC_INCREMENT_BINDING || "",
].filter(Boolean) as string[];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  transpilePackages,
};

export default nextConfig;


