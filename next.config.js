/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * CreatedBy    : Uma Kohila
   * CreatedDate  : Sep 25 2023
   * Description  : This is needed for configuring the reverse proxy using Nginx on top of this UI
   */

  basePath: '/accounts',
  assetPrefix: '/accounts/',

  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig