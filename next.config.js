/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/canceled",
        destination: "/",
        permanent: false, // 307 redirect
      },
    ];
  },
};

module.exports = nextConfig;
