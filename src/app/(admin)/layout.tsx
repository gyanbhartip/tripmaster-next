import DesktopSidebar from '@/components/sidebar-desktop';
import MobileSidebar from '@/components/sidebar-mobile';
import { getCurrentUser } from '@/lib/actions/user';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

const Layout = async ({ children }: { children: ReactNode }) => {
    const user = await getCurrentUser();

    if (!user) {
        return redirect('/');
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
