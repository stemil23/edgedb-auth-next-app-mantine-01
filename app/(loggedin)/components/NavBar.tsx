'use client';

import { Fragment } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@mantine/core';
import UserMenu from './UserMenu';
// import { signout } from '@/app/api/auth/signout/route';

export default function Navbar() {
    return (
        <>
            <UserMenu />
            <Link href="/dashboard">
                <Button>Dashboard</Button>
            </Link>

            <Link href="/user/profile">
                <Button>Your Profile</Button>
            </Link>

        </>
    );
}
