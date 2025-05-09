'use server';

// import auth from '@lib/appwrite/auth'; // storeUserData, // logoutUser, // loginWithGoogle, // getExistingUser,
// import { account } from '@lib/appwrite/client';
import { redirect } from 'next/navigation';
// export const getCurrentUser = async () => {
//     try {
//         // const user = await account.get();
//         // if (!user.$id) {
//         //     return redirect('/sign-in');
//         // }

//         // const existingUser = await getExistingUser(user.$id);

//         // if (existingUser?.status === 'user') {
//         //     return redirect('/');
//         // }
//         // return existingUser?.$id ? existingUser : await storeUserData();
//         const user = await auth.getUser();
//         return !user?.$id ? redirect('/sign-in') : user;
//     } catch (error) {
//         console.error(' 🚀 Error in client loader: ', error);
//         return redirect('/sign-in');
//     }
// };

// export const loginAction = async (formData: FormData) => {
//     // loginWithGoogle();
//     // const { email, password } = Object.fromEntries(formData);

//     // console.log('🚀 ~ loginAction ~ formData:', formData);
//     // await auth.createSession(email, password);

//     await auth.googleLogin();

//     redirect('/dashboard');
// };

export const logoutAction = async () => {
    // await auth.deleteSession();
    redirect('/sign-in');
};
