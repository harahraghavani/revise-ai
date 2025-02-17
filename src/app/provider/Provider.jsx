"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  fonts: {
    heading: "var(--font-lexend)",
    body: "var(--font-lexend)",
  },
});

export function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
