'use client'

import { auth } from '@/edgedb';
import { Button } from '@mantine/core';
export default function ButtonSignup() {
    return (
        <Button onClick={() => window.location.href = auth.getBuiltinUISignUpUrl()}>    
            Sign up
        </Button>
    )
}