//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
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
  trailingSlash: true,
  images: { unoptimized: true },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
}

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
