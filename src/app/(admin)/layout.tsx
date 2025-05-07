import DesktopSidebar from '@/components/sidebar-desktop';
import MobileSidebar from '@/components/sidebar-mobile';
import auth from '@/lib/appwrite/auth';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/actions/user';
import type { ReactNode } from 'react';

const Layout = async ({ children }: { children: ReactNode }) => {
    const user = await getCurrentUser();
    if (!user || !user?.$id) {
        redirect('/sign-in');
    }
    if (user?.status === 'user') {
        redirect('/');
    }

    return (
        <div className="admin-layout">
            <MobileSidebar user={user} />
            <aside className="hidden w-full max-w-[270px] lg:block">
                <DesktopSidebar user={user} />
            </aside>
            <aside className="children">{children}</aside>
        </div>
    );
};
export default Layout;
