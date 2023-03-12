/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    remotePatterns:[
      {
        hostname:'**.ipfs.dweb.link',
        protocol:'https',
      }
    ]
  }
}

module.exports = nextConfig
