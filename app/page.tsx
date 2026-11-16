
import HeroSection from "@/components/home/HeroSection";

import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewArrivals from "@/components/home/NewArrivals";
import BestSellers from "@/components/home/BestSellers";
import FlashSale from "@/components/home/FlashSale";
import PromoBanner from "@/components/home/PromoBanner";
import BrandShowcase from "@/components/home/BrandShowcase";
import Testimonials from "@/components/home/Testimonials";
import InstagramShowcase from "@/components/home/InstagramShowcase";
import Newsletter from "@/components/home/Newsletter";
import PromiseBar from "@/components/home/PromiseBar";
import ShopByCategory3D from "@/components/home/ShopByCategory3D";
import Showcase3D from "@/components/home/Showcase3D";

export default function Home() {
  return (
    <>
      {/* Main LUXORA Store */}
      <HeroSection />

      <PromiseBar />

      <ShopByCategory3D />

      

      <FeaturedProducts />

      <NewArrivals />

      <BestSellers />

      <Showcase3D />

      <FlashSale />

      <PromoBanner />

      <BrandShowcase />

      <Testimonials />

      <InstagramShowcase />

      <Newsletter />
    </>
  );
}
