/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["nftstorage.link", "ipfs.io", "chillrx.mypinata.cloud"],
  },
};

module.exports = nextConfig;
