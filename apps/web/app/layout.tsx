import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "./components/nav-bar";
import { ThemeProvider } from "./components/theme-provider";

export const metadata: Metadata = {
  title: "PulseRec",
  description: "Track your sports stats. Share your pulse.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-black dark:text-white antialiased pb-20 transition-colors">
        <ThemeProvider>
          {children}
          <NavBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
