import { Geist } from 'next/font/google';
import '@/app/globals.css';
import { Toaster } from 'sonner';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="bg-white text-zinc-900 antialiased">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
