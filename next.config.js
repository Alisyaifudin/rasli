// @ts-nocheck
/* eslint-disable @typescript-eslint/no-var-requires */
const { env } = require('./src/server/env');
const nextTranslate = require('next-translate')

/** @type {import('next').NextConfig} */
const nextConfig =  nextTranslate({
  webpack: (config, { isServer, webpack }) => {
    return config;
  },
	reactStrictMode: true,
  publicRuntimeConfig: {
    NODE_ENV: env.NODE_ENV,
    KEY: env.KEY,
  },
})

/**
 * @link https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
module.exports = nextConfig
