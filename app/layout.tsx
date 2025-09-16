import type { Metadata } from 'next';
import './globals.css';
import MobileLayout from '@/components/MobileLayout';

export const metadata: Metadata = {
  title: 'Rocket',
  description: 'Rocket',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <MobileLayout>{children}</MobileLayout>
      </body>
    </html>
  );
}
