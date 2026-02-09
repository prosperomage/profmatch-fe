import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  headers: async () => {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
  output: "standalone",
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_USE_MOCK: process.env.NEXT_PUBLIC_USE_MOCK,
  },
    reactStrictMode: true,

  // 👇 This silences the Turbopack warning
  turbopack: {},
};

export default nextConfig;


// const withPWA = require("next-pwa")({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
// });


// module.exports = withPWA(nextConfig);