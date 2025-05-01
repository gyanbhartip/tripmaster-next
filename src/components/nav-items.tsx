// import { Link, NavLink, useLoaderData, useNavigate } from 'react-router';

import { logoutUser } from '@/lib/appwrite/auth';
import { sidebarItems } from '@/lib/constants';
import Link from 'next/link';

type Props = {
    handleClick: () => void;
};

const NavItems = ({ handleClick }: Props) => {
    // const user = useLoaderData();
    // const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        // navigate("/sign-in");
    };
    return (
        <section className="nav-items">
            <Link href="/" className="link-logo">
                <img
                    src="/assets/icons/logo.svg"
                    alt="logo"
                    className="size-[30px]"
                />
                <h1>Trip Master</h1>
            </Link>
            <div className="container">
                <nav>
                    {sidebarItems.map(({ href, icon, id, label }) => (
                        <Link href={href} key={id}>
                            {({ isActive }: { isActive: boolean }) => (
                                <div
                                    className={cn('group nav-item', {
                                        'bg-primary-100 !text-white': isActive,
                                    })}
                                    onClick={handleClick}>
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
                                </div>
                            )}
                        </Link>
                    ))}
                </nav>
                <footer className="nav-footer">
                    <img
                        src={user?.imageUrl || '/assets/images/david.webp'}
                        alt={user?.name || 'User Photo'}
                        referrerPolicy="no-referrer"
                    />
                    <article>
                        <h2>{user?.name}</h2>
                        <p>{user?.email}</p>
                    </article>
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer"
                        type="button">
                        <img
                            src="/assets/icons/logout.svg"
                            alt="logout"
                            className="size-6"
                        />
                    </button>
                </footer>
            </div>
        </section>
    );
};

export default NavItems;
