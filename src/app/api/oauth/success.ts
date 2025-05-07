import type { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
    console.log('🚀 ~ GET ~ oauth/success:', request);
};
