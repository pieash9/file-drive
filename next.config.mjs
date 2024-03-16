/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "greedy-kangaroo-615.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
