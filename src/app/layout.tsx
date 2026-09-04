import type { Metadata } from "next";
import "./globals.css";

import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { ThemeProvider } from "../context/ThemeContext";
import { AIProvider } from "../context/AIContext";

import AIChatbot from "../components/ai/AIChatbot";

export const metadata: Metadata = {
  title: {
    default: "LUXORA | Premium AI-Powered Shopping",
    template: "%s | LUXORA",
  },

  description:
    "LUXORA is a premium AI-powered e-commerce marketplace for fashion, beauty, jewelry, lifestyle, gifts and more.",

  keywords: [
    "LUXORA",
    "luxury ecommerce",
    "online shopping",
    "fashion",
    "beauty",
    "makeup",
    "jewelry",
    "bags",
    "shoes",
    "watches",
    "gifts",
    "lifestyle",
    "AI shopping",
  ],

  authors: [
    {
      name: "LUXORA",
    },
  ],

  creator: "LUXORA",

  openGraph: {
    title: "LUXORA | Premium AI-Powered Shopping",
    description:
      "Discover premium fashion, beauty, jewelry, lifestyle and more with LUXORA.",
    type: "website",
    siteName: "LUXORA",
  },

  twitter: {
    card: "summary_large_image",
    title: "LUXORA | Premium AI-Powered Shopping",
    description:
      "Discover premium fashion, beauty, jewelry, lifestyle and more with LUXORA.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#fbf8f5] text-[#21152b] antialiased">
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <AIProvider>
                  <div className="flex min-h-screen flex-col">
                    {/* Top Announcement */}
                    <AnnouncementBar />

                    {/* Main Navigation */}
                    <Navbar />

                    {/* Page Content */}
                    <main className="relative flex-1">
                      {children}
                    </main>

                    {/* Footer */}
                    <Footer />

                    {/* AI Shopping Assistant */}
                    <AIChatbot />
                  </div>
                </AIProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}