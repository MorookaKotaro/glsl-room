/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = Object.assign(config.resolve.alias, {
      "~": "./src",
      "@assets": "./public",
    });

    return config;
  },
};

module.exports = nextConfig;
