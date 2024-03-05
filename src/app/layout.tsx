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
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#1d232a" }],
  userScalable: false,
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "bg-gray-800 text-white",
          }}
        />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {props.children}
            <BottomTabs />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
