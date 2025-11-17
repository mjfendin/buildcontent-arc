import Link from 'next/link';
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/90 border-b py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/"><a className="font-semibold text-xl">Arc Content App</a></Link>
          <nav>
            <Link href="/"><a className="mr-4">Home</a></Link>
            <a href="/admin/" className="px-3 py-1 border rounded">Admin</a>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex-1">{children}</main>
      <footer className="border-t py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Arc Content App
      </footer>
    </div>
  );
}
