import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
            hmrRefreshes: true,
        },
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    productionBrowserSourceMaps: true,
    /* config options here */
    experimental: {
        reactCompiler: false,
        // serverActions: {
        //     allowedOrigins: [
        // 'my-proxy.com', '*.my-proxy.com'\ //for allowing reverse proxied apps to run server actions
        //     ],
        // },
    },
};

export default nextConfig;
