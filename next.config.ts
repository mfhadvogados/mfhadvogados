import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "mfhadvogados.com.br" }],
        destination: "https://www.mfhadvogados.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
