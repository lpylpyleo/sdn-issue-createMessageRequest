/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: '/dapp',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.read2n.space',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  webpack: (config) => {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use))
    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (
          moduleLoader.loader !== undefined &&
          moduleLoader.loader.includes('css-loader') &&
          typeof moduleLoader.options.modules === 'object'
        ) {
          moduleLoader.options = {
            ...moduleLoader.options,
            modules: {
              ...moduleLoader.options.modules,
              // This is where we allow camelCase class names
              exportLocalsConvention: 'camelCase',
            },
          }
        }
      })
    })

    return config
  },
}

module.exports = nextConfig
