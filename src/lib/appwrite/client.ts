import { Account, Client, Databases } from 'node-appwrite';

const appwriteConfig = {
    endpointUrl: process.env.NEXT_APPWRITE_ENDPOINT ?? '',
    projectId: process.env.NEXT_APPWRITE_PROJECT_ID ?? '',
    apiKey: process.env.NEXT_APPWRITE_KEY ?? '',
    databaseId: process.env.NEXT_APPWRITE_DATABASE_ID ?? '',
    userCollectionId: process.env.NEXT_APPWRITE_USERS_COLLECTION_ID ?? '',
    tripCollectionId: process.env.NEXT_APPWRITE_TRIPS_COLLECTION_ID ?? '',
};

const createAdminClient = async () => {
    'use server';
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

const createSessionClient = async (session: string) => {
    'use server';
    const client = new Client()
        .setEndpoint(appwriteConfig.endpointUrl)
        .setProject(appwriteConfig.projectId);

    if (session) {
        client.setSession(session);
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

export { appwriteConfig, createAdminClient, createSessionClient };
