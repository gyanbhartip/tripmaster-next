'use server';

import { logoutUser, getExistingUser, storeUserData } from '@lib/appwrite/auth';
import { account } from '@lib/appwrite/client';
import { redirect } from 'next/navigation';
export const getCurrentUser = async () => {
    try {
        const user = await account.get();
        if (!user.$id) {
            return redirect('/sign-in');
        }

        const existingUser = await getExistingUser(user.$id);

        if (existingUser?.status === 'user') {
            return redirect('/');
        }
        return existingUser?.$id ? existingUser : await storeUserData();
    } catch (error) {
        console.error('Error in client loader: ', error);
        return redirect('/sign-in');
    }
};

export const logout = async () => {
    logoutUser();
    redirect('/sign-in');
};
