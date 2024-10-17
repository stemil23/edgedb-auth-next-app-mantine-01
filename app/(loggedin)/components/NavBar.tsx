'use client';

import { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@mantine/core';
import { signout } from '@/app/api/auth/signout/route';

export default function Navbar({
    signedIn: boolean
}: {
    signedIn: boolean
}) {
    const router = useRouter();

    const handleSignOut = async () => {
        await signout();
        router.push('/bye'); // or wherever you want to redirect after signout
    };

    return (
        <>
            <Link href="/user/profile">
                <Button>Your Profile</Button>
            </Link>
            <Button onClick={handleSignOut}>Sign out
            </Button>
        </>
    );
}
