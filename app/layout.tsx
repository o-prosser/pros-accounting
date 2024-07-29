import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { ThemeProvider } from "@/components/theme-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import {ViewTransitions} from 'next-view-transitions'

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
    template: "%s – ProsAccounting",
  },
  description: "Your accounts, made simple.",
  other: {
    "twitter:image": "https://prosaccounting.owenprosser.co.uk/thumbnail.jpg",
    "twitter:card": "summary_large_image",
    "og:url": "https://prosaccounting.owenprosser.co.uk",
    "og:image": "https://prosaccounting.owenprosser.co.uk/thumbnail.jpg",
    "og:type": "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={generalSans.className + " antialiased"}
          style={{ viewTransitionName: "app" }}
        >
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
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
    </ViewTransitions>
  );
}
