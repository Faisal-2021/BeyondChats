// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (isServer) {
        config.externals.push("re2"); // Ignore re2 for server builds
      }
      return config;
    },
  };
  
  export default nextConfig;
  