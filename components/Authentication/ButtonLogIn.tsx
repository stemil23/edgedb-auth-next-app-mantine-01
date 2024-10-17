'use client'

import { auth } from '@/edgedb';
import { Button } from '@mantine/core';

export default function ButtonLogIn() {
    return (
        <Button onClick={() => window.location.href = auth.getBuiltinUIUrl()}>
            Sign in
        </Button>
    )
}
