
import type { Metadata } from "next";
import "./globals.css";

import AnnouncementBar from "../src/components/layout/AnnouncementBar";
import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";

import { AuthProvider } from "../src/context/AuthContext";
import { CartProvider } from "../src/components/chart/CartProvider";
import { WishlistProvider } from "../src/context/WishlistContext";
import { ThemeProvider } from "../src/context/ThemeContext";
import { AIProvider } from "../src/context/AIContext";

import AIChatbot from "../src/components/ai/AIChatbot";

import ProjectVisitTracker from "../src/components/analyticsa/ProjectVisitTracker";

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
      <body className="min-h-screen w-full overflow-x-hidden bg-white text-gray-900 antialiased">
        <ProjectVisitTracker
          projectName="Luxora Store"
          projectSlug="luxora"
        />

        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <AIProvider>
                  <div className="flex min-h-screen w-full flex-col">
                    {/* Announcement */}
                    <AnnouncementBar />

                    {/* Global Navigation */}
                    <Navbar />

                    {/* Page Content */}
                    <main className="min-w-0 w-full flex-1">
                      {children}
                    </main>

                    {/* Footer */}
                    <Footer />

                    {/* LUXORA AI Personal Shopper */}
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
