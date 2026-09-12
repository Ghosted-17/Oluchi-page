// @ts-expect-error CSS side-effect import
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "🎀Oluchi's Multiverse🎀",
  description: "One person, multiple eras.",
  openGraph: {
    title: "🎀Oluchi's Multiverse🎀",
    description: "One person, multiple eras.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "🎀Oluchi's Multiverse🎀",
    description: "One person, multiple eras.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0D0B0C] text-[#F8F9FA] antialiased min-h-screen selection:bg-[#FF334B] selection:text-white">
        {children}
      </body>
    </html>
  );
}