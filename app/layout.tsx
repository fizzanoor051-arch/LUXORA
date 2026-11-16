
import type { Metadata } from "next";
import "./globals.css";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/components/chart/CartProvider";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AIProvider } from "@/context/AIContext";

import AIChatbot from "@/components/ai/AIChatbot";

import GlobalFX from "@/components/fx/GlobalFX";
import ConsentAndAnalytics from "@/components/analyticsa/ConsentAndAnalytics";
import PageTracker from "@/components/analyticsa/PageTracker";
import StoreChrome from "@/components/layout/StoreChrome";
import ProjectVisitTracker from "@/components/analyticsa/ProjectVisitTracker";

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

  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),

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
        <PageTracker />
        <GlobalFX />
        <ConsentAndAnalytics />
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
                    <StoreChrome>
                      <AnnouncementBar />
                      <Navbar />
                    </StoreChrome>

                    {/* Page Content (each page renders its own <main>) */}
                    <div id="luxora-page" className="min-w-0 w-full flex-1">{children}</div>

                    <StoreChrome>
                      <Footer />
                      {/* LUXORA AI Personal Shopper */}
                      <AIChatbot />
                      <div className="h-16 lg:hidden" aria-hidden />
                    </StoreChrome>
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
