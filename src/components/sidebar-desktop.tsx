'use client';

import NavItems from './nav-items';
import { Sidebar } from './ui/sidebar';

const DesktopSidebar = ({ user }) => {
    return (
        <Sidebar>
            <NavItems user={user} />
        </Sidebar>
    );
};

export default DesktopSidebar;
