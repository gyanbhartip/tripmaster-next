import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        reactCompiler: false,
    },
    output: 'standalone',
};

export default nextConfig;
