/** @type {import('next').NextConfig} */
const dotenv = require('dotenv')
dotenv.config()
const nextConfig = {
  reactStrictMode: true,
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  }
}

module.exports = nextConfig
