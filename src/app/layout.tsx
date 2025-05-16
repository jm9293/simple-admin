import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Simple Admin',
  description: 'Simple Admin Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-gray-100">
        <div className="flex h-screen flex-col">
          {/* 헤더 */}
          <header className="z-10 bg-white shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Link href="/users">
                  <h1 className="text-xl font-bold">Simple Admin</h1>
                </Link>
              </div>
            </div>
          </header>

          {/* 콘텐츠 영역 */}
          <main className="flex-1 overflow-y-auto">{children}</main>
          <footer className="flex items-center justify-center p-4">
            <p className="text-sm text-gray-500">Simple Admin</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
