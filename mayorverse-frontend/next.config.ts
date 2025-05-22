import type { NextConfig } from 'next';
import { i18n } from './next-i18next.config';

const nextConfig: NextConfig = {
  i18n,
  images: {
    domains: [
      'cdn.corenexis.com',
      'i0.imageban.ru',
      'i1.imageban.ru',
      'i2.imageban.ru',
      'i3.imageban.ru',
      'i4.imageban.ru',
      'i5.imageban.ru',
      'i6.imageban.ru',
      'i7.imageban.ru',
      'i8.imageban.ru',
      'i9.imageban.ru',
      'i10.imageban.ru',
      'i11.imageban.ru',
    ], // Добавьте ваш домен сюда
    // Или используйте более гибкий подход с remotePatterns:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.corenexis.com',
        port: '',
        pathname: '/**', // Разрешает все пути на этом домене
      },
    ],
  },
};

export default nextConfig;
