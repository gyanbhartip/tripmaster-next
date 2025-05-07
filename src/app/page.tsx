import auth, { getExistingUser, storeUserData } from '@/lib/appwrite/auth';
import { createAdminClient } from '@/lib/appwrite/client';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { userId, secret } = await searchParams;
    try {
        if (userId && secret) {
            await auth.createUserIdSecretSession(userId, secret);
        }
        const { account } = await createAdminClient();
        const user = await account.get();
        // if (!user.$id) {
        //     redirect('/sign-in');
        // }
        const existingUser = await getExistingUser(user.$id);
        if (!existingUser?.$id) {
            await storeUserData();
        }

        // return existingUser?.$id ? existingUser : await storeUserData();

        if (existingUser?.status === 'admin') {
            return redirect('/dashboard');
        }
    } catch (error) {
        console.error(error);
    }
    return (
        <div className="grid min-h-screen justify-items-center font-[family-name:var(--font-figtree-sans)]">
            <main className="flex items-center gap-8">
                {/* <Link
                    href={'/sign-in'}
                    className="flex items-center justify-between gap-2 rounded-2xl border-2 border-amber-900 px-3 py-2 text-[#ededed] shadow-[0_0_12px_2px_rgba(255,0,0,0.7)] transition-all hover:shadow-[0_0_17px_3px_rgba(255,0,0,0.8)]">
                    <Image
                        src="/assets/icons/logout.svg"
                        alt="logout"
                        width={24}
                        height={24}
                    />
                    Log Out
                </Link> */}
                <Link
                    href={'/dashboard'}
                    className="rounded-2xl border-2 px-3 py-2 shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] transition-shadow hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.9)]">
                    Dashboard
                </Link>
                <Link
                    href={'/trip'}
                    className="rounded-2xl border-2 px-3 py-2 shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] transition-shadow hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.9)]">
                    All Trips
                </Link>
            </main>
        </div>
    );
}
