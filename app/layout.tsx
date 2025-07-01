import '../globals.css';
import Link from 'next/link';
import SessionWrapper from './SessionWrapper';

export const metadata = {
  title: 'HomiBot.ai',
  description: 'Let HomiBot do the talking.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <SessionWrapper>
          <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">🏠 HomiBot.ai</h1>
            <nav>
              <Link href="/account" className="text-blue-600 hover:underline">
                Account Settings
              </Link>
            </nav>
          </header>
          <main className="p-6">{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}