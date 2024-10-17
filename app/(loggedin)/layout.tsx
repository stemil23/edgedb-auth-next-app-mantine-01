import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { AuthShell } from './components/AuthShell';
import { theme } from '../../theme';
import { auth } from "@/edgedb";
import { redirect } from "next/navigation";
import Navbar from './components/NavBar';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.getSession();
    const signedIn = await session.isSignedIn();
  
    if (!signedIn) {
      redirect(auth.getBuiltinUIUrl());
    }

    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider theme={theme}>

                    <AuthShell>
                    <Navbar signedIn={signedIn} />{children}</AuthShell>
                </MantineProvider>
            </body>
        </html>
    );
}
