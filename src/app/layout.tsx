import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { ThemeProvider } from "@/lib/theme-provider";
import { PasswordProtection } from "@/components/password-protection";

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
        <ThemeProvider>
          <PasswordProtection>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <AppBreadcrumb />
                {children}
              </SidebarInset>
            </SidebarProvider>
          </PasswordProtection>
        </ThemeProvider>
      </body>
    </html>
  );
}
