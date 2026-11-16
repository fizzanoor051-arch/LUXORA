import HeroSection from "../components/home/HeroSection";
import CategoryShowcase from "../components/home/CategoryShowcase";
import FeaturedProducts from "../components/home/FeaturedProducts";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import FlashSale from "../components/home/FlashSale";
import PromoBanner from "../components/home/PromoBanner";
import BrandShowcase from "../components/home/BrandShowcase";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import InstagramShowcase from "../components/home/InstagramShowcase";

export default function Home() {
  return (
    <>
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