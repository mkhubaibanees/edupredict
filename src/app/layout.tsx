import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduPredict AI | Advanced Analytics Dashboard",
  description: "Next-generation predictive analytics platform for modern educational institutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="bg-slate-950 text-slate-100 flex overflow-hidden h-screen w-screen">

        {/* Sidebar remains stable on the left */}
        <Sidebar />

        {/* Main Content Area: Now loads instantly for best UX */}
        <main className="flex-1 relative flex flex-col overflow-hidden w-full">

          {/* Background Glows (Static and Performant) */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />

          {/* Main Scrollable Container */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 pt-20 md:p-10 custom-scrollbar">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}