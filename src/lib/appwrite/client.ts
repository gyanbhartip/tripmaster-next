'use server';

import { cookies } from 'next/headers';
import { Account, Client, Databases } from 'node-appwrite';

const appwriteConfig = {
    endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '',
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '',
    apiKey: process.env.NEXT_APPWRITE_KEY ?? '',
};

const createAdminClient = async () => {
    const client = new Client()

        .setEndpoint(appwriteConfig.endpointUrl)
        .setProject(appwriteConfig.projectId)
        .setKey(appwriteConfig.apiKey);

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
    };
};

const createSessionClient = async () => {
    const client = new Client()
        .setEndpoint(appwriteConfig.endpointUrl)
        .setProject(appwriteConfig.projectId);

    const session = (await cookies()).get('session');

    if (!session || !session.value) {
        console.error(
            '🚀 ~ No session found from cookies in createSessionClient',
        );
    }

    if (session) {
        client.setSession(session.value);
    }

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
    };
};

export { createAdminClient, createSessionClient };
