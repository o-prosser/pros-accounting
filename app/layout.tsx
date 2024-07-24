import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { ThemeProvider } from "@/components/theme-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

const generalSans = localFont({
  src: [
    {
      path: "./generalsans-variable.woff2",
      style: "normal",
    },
    {
      path: "./generalsans-variableitalic.woff2",
      style: "italic",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ProsAccounting",
    template: "%s – ProsAccounting"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={generalSans.className + " antialiased"}>
        <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
