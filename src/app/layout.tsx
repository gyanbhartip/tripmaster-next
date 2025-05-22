import { SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { Figtree, Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const figtreeSans = Figtree({
    variable: '--font-figtree-sans',
    subsets: ['latin'],
});

const interSans = Inter({
    variable: '--font-inter-sans',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Trip Master Next - AI Powered Trip Planning',
    description: 'An AI powered trip planning application.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${figtreeSans.variable} ${interSans.variable} antialiased`}>
                <SidebarProvider>{children}</SidebarProvider>
            </body>
        </html>
    );
}
