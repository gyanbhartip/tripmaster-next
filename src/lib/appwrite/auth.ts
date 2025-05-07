import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
// import { ID, OAuthProvider, Query } from 'node-appwrite';
import {
    createAdminClient,
    // account,
    appwriteConfig,
    createSessionClient,
} from './client';
import { ID, OAuthProvider, Query } from 'node-appwrite';
import { redirect } from 'next/navigation';

const { databaseId, userCollectionId } = appwriteConfig;

// export const loginWithGoogle = async () => {
//     try {
//         account.createOAuth2Session(
//             OAuthProvider.Google,
//             `${'http://localhost:3000'}/`,
//             `${'http://localhost:3000'}/404`,
//         );
//     } catch (error) {
//         console.error('Error during OAuth2 session creation: ', error);
//     }
// };

// export const logoutUser = async () => {
//     try {
//         await account?.deleteSession('current');
//     } catch (error) {
//         console.error('Error during logout: ', error);
//     }
// };

// export const getUser = async () => {
//     try {
//         const user = await account.get();
//         if (!user) {
//             return redirect('/sign-in');
//         }

//         const { documents } = await database.listDocuments(
//             databaseId,
//             userCollectionId,
//             [
//                 Query.equal('accountId', user.$id),
//                 Query.select([
//                     'name',
//                     'email',
//                     'imageUrl',
//                     'joinedAt',
//                     'accountId',
//                 ]),
//             ],
//         );

//         return documents.length > 0 ? documents[0] : redirect('/sign-in');
//     } catch (error) {
//         console.error('Error fetching user: ', error);
//         return null;
//     }
// };

export const getGooglePicture = async (accessToken: string) => {
    try {
        const response = await fetch(
            'https://people.googleapis.com/v1/people/me?personFields=photos',
            { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        if (!response.ok) {
            throw new Error('Failed to fetch Google profile picture');
        }

        const { photos } = await response.json();
        return (photos?.[0]?.url as string) || null;
    } catch (error) {
        console.error('Error fetching Google picture: ', error);
        return null;
    }
};

export const storeUserData = async () => {
    try {
        const { account, databases } = await createAdminClient();
        const user = await account.get();
        if (!user) throw new Error('User not found');

        const { providerAccessToken } =
            (await account.getSession('current')) || {};
        const profilePicture = providerAccessToken
            ? await getGooglePicture(providerAccessToken)
            : null;

        const createdUser = await databases?.createDocument(
            databaseId,
            userCollectionId,
            ID.unique(),
            {
                accountId: user.$id,
                email: user.email,
                name: user.name,
                imageUrl: profilePicture,
                joinedAt: new Date().toISOString(),
            },
        );

        if (!createdUser.$id) {
            redirect('/sign-in');
        }
        return createdUser;
    } catch (error) {
        console.error('Error storing user data: ', error);
        return null;
    }
};

export const getExistingUser = async (id: string) => {
    try {
        const { databases } = await createAdminClient();
        const { documents, total } = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId', id)],
        );
        return total > 0 ? documents[0] : null;
    } catch (error) {
        console.error('Error fetching user: ', error);
    }
};

export const getAllUsers = async (limit: number, offset: number) => {
    const { databases } = await createAdminClient();
    try {
        const { documents: users, total } = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.limit(limit), Query.offset(offset)],
        );
        return {
            total,
            users: total < 1 ? [] : users,
        };
    } catch (error) {
        console.error('Error fetching users: ', error);
        return {
            total: 0,
            users: [],
        };
    }
};

type Auth = {
    user: Awaited<
        ReturnType<
            Awaited<ReturnType<typeof createSessionClient>>['account']['get']
        >
    > | null;
    sessionCookie: ReturnType<
        Awaited<ReturnType<typeof cookies>>['get']
    > | null;
    getUser: () => Promise<Auth['user']>;
    createEmailPassSession: (email: string, password: string) => Promise<void>;
    createUserIdSecretSession: (
        userId: string,
        session: string,
    ) => Promise<void>;
    googleLogin: () => Promise<void>;
    deleteSession: () => Promise<void>;
};

const auth: Auth = {
    user: null,
    sessionCookie: null,
    getUser: async () => {
        // 'use server';

        auth.sessionCookie = (await cookies()).get('session');
        try {
            // if (!auth.sessionCookie?.value) {
            //     throw new Error('No existing session');
            // }
            const { account } = await createSessionClient(
                auth.sessionCookie?.value,
            );
            auth.user = await account.get();
        } catch (error) {
            console.error('error in auth.getUser: ', error);
            auth.user = null;
            auth.sessionCookie = null;
        }
        return auth.user;
    },
    createEmailPassSession: async (email, password) => {
        const { account } = await createAdminClient();

        const session = await account.createEmailPasswordSession(
            (email as string) ?? 'test@mail.com',
            (password as string) ?? 'password',
        );

        (await cookies()).set('session', session.secret, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            expires: new Date(session.expire),
            path: '/',
        });
    },
    createUserIdSecretSession: async (userId: string, secret: string) => {
        const { account } = await createAdminClient();
        const session = await account.createSession(userId, secret);

        (await cookies()).set('session', session.secret, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            expires: new Date(session.expire),
            path: '/',
        });
    },
    googleLogin: async () => {
        const { account } = await createAdminClient();

        const res = await account.createOAuth2Token(
            OAuthProvider.Google,
            'http://localhost:3000/oauth/success',
            'http://localhost:3000/oauth/failure',
        );
        console.log('🚀 ~ googleLogin: ~ res:', res);
    },
    deleteSession: async () => {
        auth.sessionCookie = (await cookies()).get('session');
        // if (!auth.sessionCookie?.value) {
        //     throw new Error('No existing session');
        // }
        try {
            const { account } = await createSessionClient(
                auth.sessionCookie?.value,
            );
            await account.deleteSession('current');
        } catch (error) {
            console.error('error in auth.deleteSession: ', error);
        }
        (await cookies()).delete('session');
        auth.user = null;
        auth.sessionCookie = null;
    },
};

export default auth;
