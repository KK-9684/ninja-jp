/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.jp",
        port: "",
        pathname: "/**",
      },
      {
        hostname: "images.ctfassets.net",
        protocol: "https",
        pathname: `/${process.env.CF_SPACE_ID}/**`,
      },
    ],
  },
};

export default nextConfig;
