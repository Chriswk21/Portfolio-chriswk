import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chris William Kurniawan — Software Engineer",
  description:
    "Computer Science student at BINUS University building management software, POS systems, and workflow automation for real operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen">
        {/* Without JS the scroll reveals never fire; keep content visible. */}
        <noscript>
          <style>{`.slide-in{opacity:1!important;transform:none!important}.slide-in .rule{transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
