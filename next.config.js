/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'atlanticcatering-gh.com' },
      { protocol: 'https', hostname: 'www.google.com' },
      { protocol: 'https', hostname: 'maps.google.com' },
      { protocol: 'https', hostname: 'www.youtube.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*.svg',
        headers: [{ key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;" }],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://atlanticcatering-gh.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/robots.txt', destination: '/robots.txt' },
      { source: '/sitemap.xml', destination: '/sitemap.xml' },
      { source: '/sitemap-index.xml', destination: '/sitemap-index.xml' },
    ];
  },
};

export default nextConfig;
