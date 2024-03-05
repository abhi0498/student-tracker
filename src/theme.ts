"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { extendTheme } from "@mui/material-next";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#a36af0",
    },
    secondary: {
      main: "#4c25f6",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {},
});

export const md3Theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: { main: "#a36af0" },
        secondary: { main: "#4c25f6" },
      },
    },
  },
});

export default theme;
