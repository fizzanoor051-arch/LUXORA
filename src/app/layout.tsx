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

export const metadata: Metadata = {
  title: {
    default: "LUXORA | Premium AI-Powered Shopping",
    template: "%s | LUXORA",
  },

  description:
    "LUXORA is a premium AI-powered multi-category e-commerce marketplace for fashion, beauty, jewelry, lifestyle and more.",

  keywords: [
    "LUXORA",
    "online shopping",
    "ecommerce",
    "fashion",
    "makeup",
    "jewelry",
    "bags",
    "shoes",
    "watches",
    "gifts",
    "AI shopping",
  ],

  authors: [{ name: "LUXORA" }],

  openGraph: {
    title: "LUXORA | Premium AI-Powered Shopping",
    description:
      "Discover premium fashion, beauty, jewelry, lifestyle and more with LUXORA.",
    type: "website",
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
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <AIProvider>
                  <div className="flex min-h-screen flex-col">
                    <AnnouncementBar />

                    <Navbar />

                    <main className="flex-1">{children}</main>

                    <Footer />
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