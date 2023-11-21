/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = {
  exportPathMap: async function () {
    return {
      '/transactionUI': { page: '/transactionUI' },
    };
  },
};
