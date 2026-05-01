import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "../globals.css";
import { Toaster } from 'sonner';

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Creative portfolio",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
