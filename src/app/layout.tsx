import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/ui/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Tax-Solutions",
  description: "AI-powered automation opportunities for banking tax functions",
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            {/* Global Header - appears on all pages */}
            <header className="sticky top-0 z-40 flex h-14 md:h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex items-center gap-2 px-4 w-full">
                <SidebarTrigger className="-ml-1 md:ml-0" />
                <Separator orientation="vertical" className="mr-2 h-4 hidden sm:block" />
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm md:text-base">AI Tax Use Cases</span>
                </div>
              </div>
            </header>
            {children}
            <Footer />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
