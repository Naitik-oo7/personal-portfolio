import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Naitik Koladiya - MERN Stack Developer",
  description:
    "Professional portfolio of Naitik Koladiya, a passionate MERN stack developer specializing in building scalable web applications.",
  keywords:
    "MERN stack developer, React developer, Node.js developer, JavaScript developer, web developer",
  authors: [{ name: "Naitik Koladiya" }],
  viewport: "width=device-width, initial-scale=1",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
