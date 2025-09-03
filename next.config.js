const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com','lh3.googleusercontent.com','imagekit.io','framer.com','images.pexels.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'https://nextjsshop-test1.vercel.app', 'https://www.nextjsshop.com'],
    },
  },
  // This enables `.mdx` pages inside `app` or `pages`
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production' 
              ? 'https://nextjsshop.com, https://www.nextjsshop.com, http://nextjsshop-test1.vercel.app'
              : 'http://localhost:3000',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, x-csrf-token',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
      // Removed preview route headers since middleware now handles them
    ];
  },
};

module.exports = withMDX(nextConfig);