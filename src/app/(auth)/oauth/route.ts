import { createAdminClient } from '@/lib/appwrite/client';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get('userId');
    const secret = request.nextUrl.searchParams.get('secret');

    if (!userId || !secret) {
        return new NextResponse('OAuth2 did not provide token', {
            status: 400,
        });
    }

    const { account } = await createAdminClient();
    const session = await account.createSession(userId, secret);

    if (!session || !session.secret) {
        return new NextResponse('Failed to create session from token', {
            status: 400,
        });
    }

    (await cookies()).set('session', session.secret, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
    });

    // [GITHUB - PR]('https://github.com/appwrite/demos-for-react/pull/29/files');
    const response = NextResponse.redirect(
        `${request.nextUrl.origin}/dashboard`,
    );
    response.cookies.set('session', session.secret);
    return response;
}
