import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ReqAI — Enterprise Requirements Studio",
  description: "Transform business problems into professional IT requirements documents with AI.",
  keywords: ["IT requirements", "enterprise AI", "digital transformation", "solution architecture"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
