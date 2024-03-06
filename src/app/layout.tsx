import BottomTabs from "@/components/BottomTabs";
import theme from "@/theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Metadata, Viewport } from "next";
import * as React from "react";
import { Toaster } from "react-hot-toast";
import { ConfirmProvider } from "material-ui-confirm";
import AppWrapper from "@/components/AppWrapper";
import Head from "next/head";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Student Tracker",
  description: " Track students and contact them",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["student", "tracker", "contact", "management"],
  authors: [{ name: "Abhishek V" }],

  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#121212" }],
  userScalable: false,
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Script
        src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
        defer
      ></Script>
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "bg-gray-800 text-white",
          }}
        />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <AppWrapper>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {props.children}
              <BottomTabs />
            </AppWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
