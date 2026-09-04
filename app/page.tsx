
import LuxuryIntro from "../src/components/animations/LuxuryIntro";

import HeroSection from "../src/components/home/HeroSection";
import CategoryShowcase from "../src/components/home/CategoryShowcase";
import FeaturedProducts from "../src/components/home/FeaturedProducts";
import NewArrivals from "../src/components/home/NewArrivals";
import BestSellers from "../src/components/home/BestSellers";
import FlashSale from "../src/components/home/FlashSale";
import PromoBanner from "../src/components/home/PromoBanner";
import BrandShowcase from "../src/components/home/BrandShowcase";
import Testimonials from "../src/components/home/Testimonials";
import InstagramShowcase from "../src/components/home/InstagramShowcase";
import Newsletter from "../src/components/home/Newsletter";

export default function Home() {
  return (
    <>
      {/* LUXORA Cinematic Intro */}
      <LuxuryIntro />

      {/* Main LUXORA Store */}
      <HeroSection />

      <CategoryShowcase />

      <FeaturedProducts />

      <NewArrivals />

      <BestSellers />

      <FlashSale />

      <PromoBanner />

      <BrandShowcase />

      <Testimonials />

      <InstagramShowcase />

      <Newsletter />
    </>
  );
}
