'use client';

import { cn } from '@/utils/misc';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

type Props = {
    ctaText?: string;
    ctaUrl?: string;
    description: string;
    title: string;
};

const Header = ({ ctaText, ctaUrl, title, description }: Props) => {
    const pathName = usePathname();
    return (
        <header className="header">
            <article>
                <h1
                    className={cn(
                        'text-dark-100',
                        pathName === '/dashboard'
                            ? 'text-2xl font-bold md:text-4xl'
                            : 'text-xl font-semibold md:text-2xl',
                    )}>
                    {title}
                </h1>
                <p
                    className={cn(
                        'font-normal text-gray-500',
                        pathName === '/dashboard'
                            ? 'text-base md:text-lg'
                            : 'text-sm md:text-lg',
                    )}>
                    {description}
                </p>
            </article>
            {ctaText && ctaUrl ? (
                <Link href={ctaUrl}>
                    <Button
                        type="button"
                        className="button-class h-11! w-full! md:w-[240px]">
                        <img
                            src="/assets/icons/plus.svg"
                            alt="plus"
                            className="size-5"
                        />
                        <span className="p-16-semibold text-white">
                            {ctaText}
                        </span>
                    </Button>
                </Link>
            ) : null}
        </header>
    );
};

export default Header;
