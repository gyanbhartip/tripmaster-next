'use client';

import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import NavItems from './nav-items';

const DesktopSidebar = ({ user }) => {
    return (
        <SidebarComponent width={270} enableGestures={false}>
            <NavItems handleClick={() => {}} user={user} />
        </SidebarComponent>
    );
};

export default DesktopSidebar;
