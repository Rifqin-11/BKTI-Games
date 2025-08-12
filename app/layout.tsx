import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BKTI Games - Coding Sprint & Hack Password",
  description:
    "Play exciting coding puzzle games including Coding Sprint and Hack Password. Test your programming logic with HTML, JavaScript, TypeScript challenges and cryptography puzzles.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "BKTI Games - Coding Sprint & Hack Password",
    description:
      "Play exciting coding puzzle games including Coding Sprint and Hack Password. Test your programming logic with HTML, JavaScript, TypeScript challenges and cryptography puzzles.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "BKTI Games Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BKTI Games - Coding Sprint & Hack Password",
    description:
      "Play exciting coding puzzle games including Coding Sprint and Hack Password. Test your programming logic with HTML, JavaScript, TypeScript challenges and cryptography puzzles.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
