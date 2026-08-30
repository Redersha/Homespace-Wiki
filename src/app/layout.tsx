import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Sans_SC, JetBrains_Mono } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { getSearchEntriesSync } from "@/lib/content/fs";
import "./globals.css";

const notoSans = Noto_Sans_SC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HOMESPACE ALL IN ONE",
  description: "还没写",
};

const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ea5216" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#c55218" />
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body
        className={`${notoSans.variable} ${jetbrainsMono.variable} min-h-screen bg-base text-content font-sans antialiased`}
      >
        <AppShell searchEntries={getSearchEntriesSync()}>{children}</AppShell>
      </body>
    </html>
  );
}