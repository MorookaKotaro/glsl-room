/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = Object.assign(config.resolve.alias, {
      "~": "./src",
      "@assets": "./public",
    });

    config.module.rules.push({
      test: /\.(glsl|frag|vert)$/,
      use: [{ loader: "raw-loader" }, { loader: "glslify-loader" }],
      exclude: /node_modules/,
    });

    return config;
  },
};

module.exports = nextConfig;
