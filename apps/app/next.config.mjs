import "./src/env.mjs";
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@bu/supabase"],
  experimental: {
    instrumentationHook: process.env.NODE_ENV === "production",
    serverActions: { 
      bodySizeLimit: "10mb",
    }
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "**.coingecko.com",
      },
      {
        protocol: "https",
        hostname: "**.dynamic.xyz",
      },
    ],
  },
};


export default withSentryConfig(nextConfig, {
  silent: !process.env.CI,
  telemetry: false,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  tunnelRoute: "/monitoring",
});
