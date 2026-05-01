import { Geist } from 'next/font/google';
import { Toaster } from 'sonner';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

export default function AuthLayout({ children }: { children: React.ReactNode }) {
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
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
