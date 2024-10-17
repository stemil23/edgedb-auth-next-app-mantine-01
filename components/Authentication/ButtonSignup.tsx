'use client';

import { Button } from '@mantine/core';
import { auth } from '@/edgedb';

export function ButtonSignup() {
    return (
        <Button onClick={() => {
            const signUpUrl = auth.getBuiltinUISignUpUrl();
            window.location.href = signUpUrl;
        }}>
            Sign up
        </Button>
    );
}
