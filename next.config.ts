/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
  },
  experimental: {
    legacyBrowsers: false,  // ⛔ Stop adding old JS code
  },
};

module.exports = nextConfig;
