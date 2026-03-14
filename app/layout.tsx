import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OMG CYBERZONE",
  description: "OMG CYBERZONE",
  icons: {
    icon: "/logo.ico",
  },
};
const inter = Inter({
  subsets: ["latin", "cyrillic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
