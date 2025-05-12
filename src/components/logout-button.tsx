'use client';

import { signOut } from '@/lib/appwrite/auth';
import Image from 'next/image';

const LogoutButton = () => {
    const handleLogout = async () => {
        await signOut();
    };
    return (
        <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center justify-between gap-2 rounded-2xl border-2 border-amber-900 px-3 py-2 text-[#ededed] shadow-[0_0_12px_2px_rgba(255,0,0,0.7)] transition-all hover:shadow-[0_0_17px_3px_rgba(255,0,0,0.8)]"
            type="button">
            <Image
                src="/assets/icons/logout.svg"
                alt="logout"
                width={24}
                height={24}
            />
            Log Out
        </button>
    );
};

export default LogoutButton;
