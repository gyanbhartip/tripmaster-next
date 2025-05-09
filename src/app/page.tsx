import LogoutButton from '@/components/logout-button';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="grid min-h-screen justify-items-center font-[family-name:var(--font-figtree-sans)]">
            <main className="flex items-center gap-8">
                <LogoutButton />
                <Link
                    href={'/dashboard'}
                    className="rounded-2xl border-2 px-3 py-2 shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] transition-shadow hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.9)]">
                    Dashboard
                </Link>
                <Link
                    href={'/trip'}
                    className="rounded-2xl border-2 px-3 py-2 shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] transition-shadow hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.9)]">
                    All Trips
                </Link>
            </main>
        </div>
    );
}
