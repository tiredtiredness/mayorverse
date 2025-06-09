import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "cdn.corenexis.com",
      "i0.imageban.ru",
      "i1.imageban.ru",
      "i2.imageban.ru",
      "i3.imageban.ru",
      "i4.imageban.ru",
      "i5.imageban.ru",
      "i6.imageban.ru",
      "i7.imageban.ru",
      "i8.imageban.ru",
      "i9.imageban.ru",
      "i10.imageban.ru",
      "i11.imageban.ru",
    ],
  },
  env: {
    API_URL: process.env.API_URL,
    IMAGE_API_URL: process.env.IMAGE_API_URL,
    IMAGE_TOKEN: process.env.IMAGE_TOKEN,
  },
};

export default nextConfig;
