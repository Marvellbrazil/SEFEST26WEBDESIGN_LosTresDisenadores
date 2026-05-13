import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Saverish - Rescue Delicious Food. Save Our Planet.",
  description: "Turning daily surplus into sustainable value. Join the movement to end food waste while enjoying your favorite treats at flash-sale prices.",
  keywords: ["food waste", "sustainability", "flash sale", "rescue food", "save planet", "zero waste"],
  authors: [{ name: "Saverish" }],
  openGraph: {
    title: "Saverish - Rescue Delicious Food. Save Our Planet.",
    description: "Turning daily surplus into sustainable value. Join the movement to end food waste.",
    type: "website",
  },
  icons: {
    icon: 'https://images.unsplash.com/vector-1778639108685-395007c80714?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-[#F4F3EE] antialiased">
        {children}
      </body>
    </html>
  );
}