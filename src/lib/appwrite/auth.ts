'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ID, OAuthProvider, Query } from 'node-appwrite';
import { getGooglePicture } from '../actions/user';
import {
    appwriteConfig,
    createAdminClient,
    createSessionClient,
} from './client';

async function getLoggedInUserFromSessionClient() {
    try {
        const { account } = await createSessionClient();
        return await account.get();
    } catch (error) {
        console.error('🚀 ~ getLoggedInUserFromSessionClient ~ error:', error);
        return null;
    }
}

async function signInWithGoogle() {
    const { account } = await createAdminClient();

    const origin = (await headers()).get('origin');
    const successUrl = `${origin}/oauth`;
    const failureUrl = `${origin}/sign-in`;

    const redirectUrl = await account.createOAuth2Token(
        OAuthProvider.Google,
        successUrl,
        failureUrl,
    );

    redirect(redirectUrl);
}

async function signOut() {
    const { account } = await createSessionClient();

    (await cookies()).delete('session');
    await account.deleteSession('current');

    redirect('/');
}

const getExistingUserFromDB = async (id: string) => {
    try {
        const { databases } = await createSessionClient();
        const { documents, total } =
            await databases.listDocuments<UserDocument>(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                [Query.equal('accountId', id)],
            );
        return total > 0 ? documents[0] : null;
    } catch (error) {
        console.error('Error fetching user: ', error);
    }
};

const storeUserDataInDB = async () => {
    try {
        const { account, databases } = await createSessionClient();
        const user = await account.get();
        if (!user) throw new Error('User not found');

        const { providerAccessToken } =
            (await account.getSession('current')) || {};
        const profilePicture = providerAccessToken
            ? await getGooglePicture(providerAccessToken)
            : null;

        const createdUser = await databases?.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
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
    } catch (error) {
        console.error('Error storing user data: ', error);
    }
};

const getAllUsers = async (limit: number, offset: number) => {
    const { databases } = await createSessionClient();
    try {
        const { documents: users, total } = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
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

export {
    getAllUsers,
    getExistingUserFromDB,
    getLoggedInUserFromSessionClient,
    signInWithGoogle,
    signOut,
    storeUserDataInDB,
};
