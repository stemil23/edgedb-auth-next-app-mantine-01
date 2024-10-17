"use client";

import { useRouter } from 'next/navigation'
import { Button } from '@mantine/core';

export default function ButtonLogout() {
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            const response = await fetch('/api/auth/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                router.push('/bye')
            } else {
                console.error('Signout failed');
            }
        } catch (error) {
            console.error('Error during signout:', error);
        }
    }   

    return (
        <Button onClick={handleSignOut}>
            Sign out
        </Button>
    )
}
