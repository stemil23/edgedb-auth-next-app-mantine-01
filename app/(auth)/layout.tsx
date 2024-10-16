import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { AuthShell } from './components/AuthShell';
import { theme } from '../../theme';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider theme={theme}>
                    <AuthShell>{children}</AuthShell>
                </MantineProvider>
            </body>
        </html>
    );
}