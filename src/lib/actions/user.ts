'use server';

import { redirect } from 'next/navigation';
import {
    getExistingUserFromDB,
    getLoggedInUserFromSessionClient,
    storeUserDataInDB,
} from '../appwrite/auth';
export const getCurrentUser = async () => {
    try {
        const user = await getLoggedInUserFromSessionClient();
        if (!user || !user.$id) {
            return redirect('/sign-in');
        }

        const existingUser = await getExistingUserFromDB(user.$id);

        if (existingUser?.status === 'user') {
            return redirect('/');
        }
        return existingUser?.$id ? existingUser : await storeUserDataInDB();
    } catch (error) {
        console.error(' 🚀 Error in client loader: ', error);
        return redirect('/sign-in');
    }
};

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
        return photos?.[0]?.url || null;
    } catch (error) {
        console.error('Error fetching Google picture: ', error);
        return null;
    }
};
