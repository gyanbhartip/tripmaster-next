import type { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    console.log('🚀 ~ POST ~ formData:', formData);
};
