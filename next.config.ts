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
    serverExternalPackages: [
        '@syncfusion/ej2-react-charts',
        '@syncfusion/ej2-react-grids',
    ],
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
