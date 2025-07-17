/** @type {import('next').NextConfig} */
export default {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "o6so15s6oe.ufs.sh",
        pathname: "/f/IF7FvZlZ7vKm*",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    loader: 'default',
    quality: 75,
    unoptimized: false,
    domains: [],
    disableStaticImages: false,
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
  },
};
