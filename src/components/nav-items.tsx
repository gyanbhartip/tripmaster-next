'use client';

import { logoutAction } from '@/lib/actions/user';
import { sidebarItems } from '@/lib/constants/app-constants';
import { cn } from '@/utils/misc';
import Link from 'next/link';
import { Fragment } from 'react';
import { SheetClose } from './ui/sheet';
import {
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarMenuButton,
    SidebarMenuItem,
} from './ui/sidebar';

type Props = {
    user: unknown;
    withSheetClose?: boolean;
};

const NavItems = ({ user, withSheetClose }: Props) => {
    const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose
        ? [SheetClose, { asChild: true }]
        : [Fragment, {}];

    const isActive = false;
    return (
        <>
            <SidebarContent>
                <SidebarGroup>
                    <Link href="/" className="link-logo">
                        <img
                            src="/assets/icons/logo.svg"
                            alt="logo"
                            className="size-[30px]"
                        />
                        <h1>Trip Master</h1>
                    </Link>
                </SidebarGroup>

                <SidebarGroup>
                    {sidebarItems.map(({ href, icon, id, label }) => (
                        <SheetCloseWrapper {...sheetCloseWrapperProps} key={id}>
                            <SidebarMenuItem className="list-none">
                                <SidebarMenuButton asChild size={'lg'}>
                                    <Link
                                        href={href}
                                        className={cn('group nav-item', {
                                            'bg-primary-100 !text-white':
                                                isActive,
                                        })}>
                                        <img
                                            src={icon}
                                            alt={label}
                                            className={`size-0 group-hover:brightness-0 group-hover:invert ${
                                                isActive
                                                    ? 'brightness-0 invert'
                                                    : 'text-dark-200'
                                            }`}
                                        />
                                        {label}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SheetCloseWrapper>
                    ))}
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <footer className="nav-footer flex items-center justify-between rounded-lg bg-white p-4">
                    <div className="flex items-center justify-center gap-4">
                        <img
                            src={user?.imageUrl || '/assets/images/david.webp'}
                            alt={user?.name || 'User Photo'}
                            referrerPolicy="no-referrer"
                        />
                        <article>
                            <h2>{user?.name}</h2>
                            <p>{user?.email}</p>
                        </article>
                    </div>
                    <button
                        onClick={logoutAction}
                        className="cursor-pointer"
                        type="button">
                        <img
                            src="/assets/icons/logout.svg"
                            alt="logout"
                            className="size-6"
                        />
                    </button>
                </footer>
            </SidebarFooter>
        </>
    );
};

export default NavItems;
