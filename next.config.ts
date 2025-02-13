import { NextConfig } from "next/types";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });
    return config;
  } /* config options here */,
};

export default nextConfig;
