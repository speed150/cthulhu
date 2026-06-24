import RootLayout from "@/app/layout";
import { Navbar } from "@/components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Providers } from "@/app/providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function CharactersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </body>
      </html>
    </>
  );
}
