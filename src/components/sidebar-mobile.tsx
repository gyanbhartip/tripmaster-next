'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Link from 'next/link';
import NavItems from './nav-items';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet';

const MobileSidebar = ({ user }) => {
    return (
        <div className="mobile-sidebar wrapper">
            <header>
                <Link href="/" className="link-logo">
                    <img
                        src="/assets/icons/logo.svg"
                        alt="logo"
                        className="size-[30px]"
                    />
                    <h1>Trip Master</h1>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <img
                            src="/assets/icons/menu.svg"
                            alt="menu"
                            className="size-7"
                        />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetTitle>
                            <VisuallyHidden>
                                mobile navigation drawer
                            </VisuallyHidden>
                        </SheetTitle>
                        <SheetDescription>
                            <VisuallyHidden>
                                This is the mobile navigation drawer containing
                                the navigation links, user information and
                                logout button.
                            </VisuallyHidden>
                        </SheetDescription>
                        <NavItems user={user} withSheetClose={true} />
                    </SheetContent>
                </Sheet>
            </header>
        </div>
    );
};

export default MobileSidebar;
