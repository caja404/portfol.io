import { Geist } from 'next/font/google';
import { Toaster } from 'sonner';
import AdminSidebar from '@/components/admin/AdminSidebar';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body
        style={{
          margin: 0,
          background: '#f7f7f6',
          color: '#111',
          fontFamily: 'var(--font-geist-sans, system-ui), sans-serif',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        <div style={{ minHeight: '100vh', display: 'flex' }}>
          <AdminSidebar />
          <main style={{ flex: 1, overflowY: 'auto', background: '#f7f7f6' }}>
            <div style={{ maxWidth: 820, margin: '0 auto', padding: '44px 36px' }}>
              {children}
            </div>
          </main>
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

