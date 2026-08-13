/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    qualities: [25, 50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "humanova-docs-app.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/demo',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/aboutUs',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/platformOverview',
        destination: '/platform-overview',
        permanent: true,
      },
      {
        source: '/contactUs',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
