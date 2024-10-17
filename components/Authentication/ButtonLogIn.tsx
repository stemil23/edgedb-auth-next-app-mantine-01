'use client';

import { Button } from '@mantine/core';
import { auth } from '@/edgedb';

export default function ButtonLogIn() {
    return (
        <Button onClick={() => {
            const signInUrl = auth.getBuiltinUIUrl();
            window.location.href = signInUrl;
        }}>
            Sign in
        </Button>
    );
}
