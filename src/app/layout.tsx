import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AIChatBot from "@/components/AIChatBot";
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
  title: "Green Landscape - Vật liệu ngoại thất xanh",
  description:
    "Green Landscape cung cấp giải pháp gỗ nhựa ngoài trời từ HDPE tái chế cho sân vườn, ban công, hồ bơi, tường ốp và lan can.",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <AIChatBot />
      </body>
    </html>
  );
}
