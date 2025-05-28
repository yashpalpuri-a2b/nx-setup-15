//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  
  // Configure module transpilation
  transpilePackages: [
    '@nx-workspace/multi-tenant',
    '@nx-workspace/shared',
    '@nx-workspace/feature',
    '@nx-workspace/ui',
    '@nx-workspace/data-access',
    '@nx-workspace/util',
  ],

  // Environment variables that will be available at build time
  // These are in addition to the ones in .env.local
  env: 
  {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  
  // Ensure static assets are correctly handled
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Configure output directory explicitly
  distDir: '.next',
  
  // Ensure proper asset prefix for static files
  assetPrefix: '',
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
