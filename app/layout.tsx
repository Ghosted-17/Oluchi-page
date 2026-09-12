import type {Metadata} from 'next';
import { Geist } from 'next/font/google';
import './globals.css'; // Global styles

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Multiverse of Oluchi',
  description: 'A personal portfolio exploring the many versions of Oluchi.',
  openGraph: {
    title: 'The Multiverse of Oluchi',
    description: 'A personal portfolio exploring the many versions of Oluchi.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Multiverse of Oluchi',
    description: 'A personal portfolio exploring the many versions of Oluchi.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${geist.className} dark`}>
      <body className="bg-obsidian text-white antialiased min-h-screen selection:bg-red-primary/30 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
