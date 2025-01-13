import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 800, // Polling interval (ms)
      aggregateTimeout: 300, // Time to wait before rebuilding after a change (ms)
    };
    return config;
  },
};

export default nextConfig;
