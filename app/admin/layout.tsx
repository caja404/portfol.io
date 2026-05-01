'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Toaster } from 'sonner';
import { Geist } from 'next/font/google';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Add New Work', href: '/admin/upload' },
  { label: 'All Items', href: '/admin/items' },
  { label: 'Site Settings', href: '/admin/settings' },
  { label: 'Contact Messages', href: '/admin/messages' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <html lang="en" className={geistSans.variable}>
      <body className="bg-white text-zinc-900 antialiased">
        <div className="min-h-screen flex bg-white">
          {/* Sidebar */}
          <aside className="w-52 border-r border-zinc-100 flex flex-col shrink-0">
            <div className="px-5 py-6 border-b border-zinc-100">
              <p className="text-xs text-zinc-400 uppercase tracking-widest">Admin</p>
            </div>
            <nav className="flex-1 py-4">
              <ul className="space-y-0.5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-5 py-2.5 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="px-5 py-4 border-t border-zinc-100">
              <button
                onClick={handleLogout}
                className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-widest"
              >
                Logout
              </button>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-8 py-10">
              {children}
            </div>
          </main>
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
