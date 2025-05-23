'use client';

import NavItems from './nav-items';
import { Sidebar } from './ui/sidebar';

type Props = {
    user: UserDocument;
};

const DesktopSidebar = ({ user }: Props) => {
    return (
        <Sidebar>
            <NavItems user={user} />
        </Sidebar>
    );
};

export default DesktopSidebar;
