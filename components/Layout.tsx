// components/Layout.js
import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children, title = '我的博客' }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content="這是一個使用 Next.js 建立的博客網站" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <Link href="/" className="text-2xl font-bold">
            我的博客
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        © {new Date().getFullYear()} 我的博客. 版權所有。
      </footer>
    </div>
  );
}
