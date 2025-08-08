/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.qrms.mn', 'cdn.qmenu.mn'],
  },
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  async rewrites() {
    return [
      {
        source: '/api/sale',
        destination: 'http://localhost:8501/xac/sale',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Allow Windows service
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,PUT,DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
