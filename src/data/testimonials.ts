export interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-001",
    name: "Ayesha Khan",
    role: "Verified Customer",
    message:
      "LUXORA has completely changed the way I shop online. The products feel premium and the overall experience is beautiful.",
    rating: 5,
    avatar: "/images/testimonials/ayesha.jpg",
  },
  {
    id: "testimonial-002",
    name: "Sarah Ahmed",
    role: "Verified Customer",
    message:
      "I loved the jewelry collection. The quality was excellent and the shopping experience was smooth from start to finish.",
    rating: 5,
    avatar: "/images/testimonials/sarah.jpg",
  },
  {
    id: "testimonial-003",
    name: "Maham Ali",
    role: "Verified Customer",
    message:
      "The AI shopping assistant makes finding products so much easier. It actually feels like having a personal shopping expert.",
    rating: 5,
    avatar: "/images/testimonials/maham.jpg",
  },
  {
    id: "testimonial-004",
    name: "Zara Malik",
    role: "Verified Customer",
    message:
      "Beautiful design, great product selection and an extremely easy checkout experience. LUXORA feels like a premium brand.",
    rating: 5,
    avatar: "/images/testimonials/zara.jpg",
  },
];