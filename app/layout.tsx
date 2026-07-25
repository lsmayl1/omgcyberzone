import "./globals.css";

/**
 * Pass-through root layout. <html> and <body> live in app/[locale]/layout.tsx
 * so the lang attribute can follow the active locale.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
