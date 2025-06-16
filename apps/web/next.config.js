//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
// const nextConfig = {
//   // Use this to set Nx-specific options
//   // See: https://nx.dev/recipes/next/next-config-setup
//   nx: {},
// };

const nextConfig = {
  output: 'export',
  // When using static export every page becomes /index.html under its route.
  // trailingSlash keeps the public URLs consistent ("/about/")
  trailingSlash: true,
  images: { unoptimized: true },
  nx: {
    svgr: false,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
