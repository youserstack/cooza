import TanstackQueryProvider from "@/providers/tanstack-query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { inter } from "@/lib/utils/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cooza | E-Commerce",
  description: "cooza는 youserstack이 개발한 이커머스 웹 애플리케이션입니다.",
  keywords: ["cooza", "youserstack", "e-commerce"],
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <TanstackQueryProvider>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
              {/* <Footer /> */}
            </ThemeProvider>
          </SessionProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
