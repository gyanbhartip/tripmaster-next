'use client';

import { googleLoginAction } from '@/lib/actions/user';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import Link from 'next/link';

const SignInPage = () => {
    return (
        <main className="auth">
            <section className="glassmorphism flex-center size-full px-6">
                <div className="sign-in-card">
                    <header className="header">
                        <Link href="/">
                            <img
                                src="/assets/icons/logo.svg"
                                alt="logo"
                                className="size-[30px]"
                            />
                        </Link>
                        <h1 className="p-28-bold text-dark-100">Trip Master</h1>
                    </header>
                    <article>
                        <h2 className="p-28-semibold text-dark-100 text-center">
                            Start Your Travel Journey
                        </h2>
                        <p className="p-18-regular text-center !leading-7 text-gray-100">
                            Sign in with Google to manage destinations,
                            itineraries, and user activity with ease.
                        </p>
                    </article>

                    <form action={googleLoginAction} className="flex flex-col">
                        {/* <div className="text-dark-100 mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className="form-input w-full"
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-input mb-2 w-full"
                            />
                        </div> */}
                        <ButtonComponent
                            type="submit"
                            iconCss="e-search-icon"
                            className="button-class !h-11 !w-full">
                            <img
                                src="/assets/icons/google.svg"
                                className="size-5"
                                alt="google"
                            />
                            <span className="p-18-semibold text-white">
                                Sign in with Google
                            </span>
                        </ButtonComponent>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default SignInPage;
