import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AI Daily - Latest Generative AI News',
    description: 'Daily digest of GPT-5, Gemini 3, and more.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} min-h-screen`}>
                <LanguageProvider>
                    <div className="relative z-10">
                        <Header />
                        <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                            {children}
                        </main>
                    </div>
                </LanguageProvider>
            </body>
        </html>
    );
}
