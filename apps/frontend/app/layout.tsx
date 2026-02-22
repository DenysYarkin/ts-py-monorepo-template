import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AuthBootstrap } from '@/entities/auth/ui/auth-bootstrap';
import { ThemeProvider } from '@shared/components/theme-provider';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Template App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthBootstrap />
          <div className="bg-background">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
