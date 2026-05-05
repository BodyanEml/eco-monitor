import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Вимикаємо суворий режим, щоб Leaflet не крашився при HMR (гарячому перезавантаженні)
  reactStrictMode: false, 
  
  // Налаштування для зовнішніх зображень
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.openstreetmap.org',
      },
    ],
  },
};

export default nextConfig;