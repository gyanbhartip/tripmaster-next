'use server';

import auth, { getExistingUser } from '@lib/appwrite/auth';
import { redirect } from 'next/navigation';
export const getCurrentUser = async () => {
    try {
        const user = await auth.getUser();
        // if (!user?.$id) {
        //     return redirect('/sign-in');
        // }
        const existingUser = await getExistingUser(user?.$id);
        console.log('🚀 ~ getCurrentUser ~ existingUser:', existingUser);
        console.log('🚀 ~ getCurrentUser ~ user:', user);
        return !user?.$id ? redirect('/sign-in') : existingUser;
    } catch (error) {
        console.error(' 🚀 Error in client loader: ', error);
        return redirect('/sign-in');
    }
};

// export const loginAction = async (formData: FormData) => {
//     const { email, password } = Object.fromEntries(formData);

//     console.log('🚀 ~ loginAction ~ formData:', formData);
//     await auth.createEmailPassSession(email, password);

//     redirect('/dashboard');
// };

export const googleLoginAction = async () => {
    await auth.googleLogin();
    // redirect('/dashboard');
};

export const logoutAction = async () => {
    await auth.deleteSession();
    redirect('/sign-in');
};
