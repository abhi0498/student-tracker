// Configuration options for Next.js
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
  images: {
    domains: ["daisyui.com"], // Allow images from example.com
  },
  typescript: {
    // ignoreBuildErrors: true, // Ignore TypeScript build errors
  },
};

// Configuration object tells the next-pwa plugin
const withPWA = require("next-pwa")({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
  importScripts: ["https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js"], // Import custom service worker
});

// Export the combined configuration for Next.js with PWA support
module.exports = withPWA(nextConfig);
