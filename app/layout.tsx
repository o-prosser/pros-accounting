import type { Metadata } from "next";
import localFont from "next/font/local";
import "./app.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { ThemeProvider } from "@/components/theme-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ViewTransitions } from "next-view-transitions";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/next";

const generalSans = localFont({
  src: [
    {
      path: "./fonts/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/GeneralSans-Light.woff2",
      weight: "300",
      style: "normal",
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
    "og:type": "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider delayDuration={300}>
      {/* <ViewTransitions> */}
      <html lang="en" suppressHydrationWarning>
        <body
          className={
            generalSans.className + " antialiased select-none cursor-default"
          }
          style={{ viewTransitionName: "app" }}
        >
          <SpeedInsights />
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
      {/* </ViewTransitions> */}
    </TooltipProvider>
  );
}
