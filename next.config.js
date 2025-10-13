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
    minimumCacheTTL: 2592000, // 30 days
    loader: 'default',
    unoptimized: false,
    domains: [],
    disableStaticImages: false,
  },
  webpack: (config) => {
    // Fix for "Cannot read properties of null (reading 'useContext')" error
    // Ensures only one copy of React is used
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
    }
    return config
  },
};
