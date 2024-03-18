import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import Header from "./header";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./footer";
import { ThemeProvider } from "./themeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "File Drive",
  description: "File drive app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <Header />
            <div className="min-h-[calc(100vh-250px)]">{children}</div>
            <Footer />
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
