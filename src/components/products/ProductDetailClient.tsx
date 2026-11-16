"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

import { products } from "@/data/products";
import type { Product } from "@/types/product";
import { useCart } from "@/components/chart/CartProvider";
import { useAuthContext } from "@/context/AuthContext";
import { track } from "@/lib/track";

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductDetailPage({ slug }: { slug: string }) {
  const { addToCart } = useCart();
  const { user } = useAuthContext();

  // Static catalog renders instantly; live data (stock, rating, reviews) replaces it.
  const staticProduct = useMemo(
    () => products.find((item) => item.slug === slug || item.id === slug),
    [slug]
  );
  const [live, setLive] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [added, setAdded] = useState(false);
  const [reviewMsg, setReviewMsg] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/products/${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d) return;
        setLive(d.product);
        setReviews(d.reviews ?? []);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const product = live ?? staticProduct;
  const [alertMsg, setAlertMsg] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    if (!product) return;
    track("product_view", { productId: product.id });
    try {
      const cur: string[] = JSON.parse(localStorage.getItem("luxora_recent") || "[]");
      setRecent(cur.filter((id) => id !== product.id).slice(0, 4));
      localStorage.setItem("luxora_recent", JSON.stringify([product.id, ...cur.filter((id) => id !== product.id)].slice(0, 8)));
    } catch {
      /* storage unavailable */
    }
  }, [product?.id]);

  async function subscribeAlert(e: FormEvent<HTMLFormElement>, kind: "back_in_stock" | "price_drop") {
    e.preventDefault();
    if (!product) return;
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") || "");
    const res = await fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, productId: product.id, kind }),
    });
    const d = await res.json();
    setAlertMsg(res.ok ? "Done! We will email you." : d.error || "Could not save your alert");
    if (res.ok) form.reset();
  }

  async function submitReview(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!product) return;
    const f = new FormData(e.currentTarget);
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        rating: Number(f.get("rating")),
        comment: String(f.get("comment") || ""),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setReviewMsg(data.error || "Could not save your review");
      return;
    }
    setReviews((cur) => [data.review, ...cur]);
    setReviewMsg("Thank you! Your verified review is live.");
    e.currentTarget.reset();
  }

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#fbf7f3] px-5">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0e6f2] text-[#8d5c91]">
            <ShoppingBag size={25} />
          </div>

          <h1 className="mt-6 font-serif text-3xl font-semibold">
            Product not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#21152b]/55">
            The product you're looking for may have been removed or the link
            may be incorrect.
          </p>

          <Link
            href="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#21152b] px-5 py-3 text-xs font-semibold text-white"
          >
            <ArrowLeft size={15} />
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category && item.id !== product.id
    )
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#fbf7f3] text-[#21152b]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-8 lg:py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-[#21152b]/40">
          <Link href="/" className="transition hover:text-[#8d5c91]">
            Home
          </Link>
          <ChevronRight size={13} />
          <Link
            href="/products"
            className="transition hover:text-[#8d5c91]"
          >
            Shop
          </Link>
          <ChevronRight size={13} />
          <span className="truncate text-[#21152b]/65">{product.name}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Gallery */}
          <div>
            <div data-tilt="5" className="relative overflow-hidden rounded-[2rem] bg-[#f1e9eb] shadow-2xl shadow-[#21152b]/10">
              <div className="aspect-[4/5]">
                {productImages[selectedImage] ? (
                  <motion.img
                    key={productImages[selectedImage]}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#21152b]/30">
                    No image available
                  </div>
                )}
              </div>

              {product.badge && (
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] backdrop-blur">
                  {product.badge}
                </span>
              )}

              <button
                type="button"
                onClick={() => setLiked(!liked)}
                aria-label="Add to wishlist"
                className={`absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur transition ${
                  liked
                    ? "bg-[#8d5c91] text-white"
                    : "bg-white/90 text-[#21152b]/60 hover:text-[#8d5c91]"
                }`}
              >
                <Heart
                  size={19}
                  className={liked ? "fill-current" : ""}
                />
              </button>
            </div>

            {productImages.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {productImages.slice(0, 4).map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-xl border-2 ${
                      selectedImage === index
                        ? "border-[#8d5c91]"
                        : "border-transparent"
                    }`}
                  >
                    <img loading="lazy" decoding="async"
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product information */}
          <div className="lg:py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8d5c91]">
              {product.category}
            </p>

            {product.brand && (
              <p className="mt-2 text-xs font-medium text-[#21152b]/45">
                {product.brand}
              </p>
            )}

            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    className={
                      index < Math.round(product.rating ?? 0)
                        ? "fill-[#c9a56a] text-[#c9a56a]"
                        : "text-[#21152b]/15"
                    }
                  />
                ))}
              </div>

              <span className="text-xs text-[#21152b]/45">
                {product.rating ?? "New"}{" "}
                {product.reviews ? `(${product.reviews} reviews)` : ""}
              </span>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <span className="text-3xl font-bold">${product.price}</span>

              {product.oldPrice && (
                <span className="text-lg text-[#21152b]/30 line-through">
                  ${product.oldPrice}
                </span>
              )}
            </div>

            <div className="my-8 h-px bg-[#21152b]/[0.08]" />

            <p className="text-sm leading-7 text-[#21152b]/60">
              {product.description ??
                "A thoughtfully selected LUXORA piece designed to bring elegance, quality and effortless style to your everyday life."}
            </p>

            {/* Stock */}
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {product.stock > 0
                ? `${product.stock} items available`
                : "Currently unavailable"}
            </div>

            {/* Quantity */}
            <div className="mt-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#21152b]/55">
                Quantity
              </p>

              <div className="flex h-12 w-fit items-center overflow-hidden rounded-xl border border-[#21152b]/10 bg-white">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  className="flex h-full w-12 items-center justify-center transition hover:bg-[#f7f2f8]"
                >
                  <Minus size={15} />
                </button>

                <span className="w-10 text-center text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.min(product.stock || 99, current + 1)
                    )
                  }
                  className="flex h-full w-12 items-center justify-center transition hover:bg-[#f7f2f8]"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">
              <button
                type="button"
                disabled={product.stock <= 0}
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      category: product.category,
                      price: product.price,
                      image: product.image,
                    });
                  }
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                className="flex h-14 items-center justify-center gap-3 rounded-xl bg-[#21152b] px-6 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#34203d] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingBag size={18} />
                {product.stock <= 0 ? "Out of Stock" : added ? "Added to Bag ✓" : "Add to Shopping Bag"}
              </button>

              <button
                type="button"
                onClick={() => setLiked(!liked)}
                className="flex h-14 items-center justify-center gap-2 rounded-xl border border-[#21152b]/10 bg-white px-5 text-sm font-semibold transition hover:border-[#8d5c91]/30 hover:text-[#8d5c91]"
              >
                <Heart
                  size={18}
                  className={liked ? "fill-[#8d5c91] text-[#8d5c91]" : ""}
                />
                <span className="sm:hidden">Wishlist</span>
              </button>
            </div>

            {/* Benefits */}
            <div className="mt-8 grid gap-3">
              <div className="flex items-center gap-4 rounded-2xl bg-white/70 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5edf6] text-[#8d5c91]">
                  <Truck size={18} />
                </div>

                <div>
                  <p className="text-xs font-semibold">Fast & secure delivery</p>
                  <p className="mt-1 text-[11px] text-[#21152b]/45">
                    Carefully packed and delivered to your door.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/70 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff8ea] text-[#a77d35]">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <p className="text-xs font-semibold">LUXORA quality promise</p>
                  <p className="mt-1 text-[11px] text-[#21152b]/45">
                    Every piece is selected with quality in mind.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/70 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8e9ed] text-[#9b6275]">
                  <Check size={18} />
                </div>

                <div>
                  <p className="text-xs font-semibold">Easy shopping experience</p>
                  <p className="mt-1 text-[11px] text-[#21152b]/45">
                    Secure checkout with a simple purchase journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI banner */}
        <div className="mt-20 overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#21152b] to-[#8d5c91] p-7 text-white sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Sparkles size={21} className="text-[#ead0d8]" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ead0d8]">
                  PERSONAL SHOPPER
                </p>

                <p className="mt-1 text-lg font-semibold">
                  Need help deciding?
                </p>
              </div>
            </div>

            <p className="max-w-xl text-sm leading-6 text-white/60">
              Ask LUXORA AI for styling ideas, gift suggestions or products
              that match your preferences.
            </p>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8d5c91]">
                  YOU MAY ALSO LIKE
                </p>

                <h2 className="mt-2 font-serif text-3xl font-semibold">
                  More from {product.category}
                </h2>
              </div>

              <Link
                href={`/categories/${product.category.toLowerCase()}`}
                className="hidden items-center gap-2 text-xs font-semibold text-[#8d5c91] sm:flex"
              >
                Explore all
                <ArrowLeft size={14} className="rotate-180" />
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link key={item.id} href={`/products/${item.slug}`}>
                  <div className="group">
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#f1e9eb]">
                      {item.image && (
                        <img loading="lazy" decoding="async"
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>

                    <p className="mt-3 text-xs font-semibold">{item.name}</p>
                    <p className="mt-1 text-xs text-[#21152b]/50">
                      ${item.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Alerts + recently viewed */}
        <section className="mt-12 grid gap-8 border-t border-[#21152b]/10 pt-10 lg:grid-cols-2">
          <form onSubmit={(e) => subscribeAlert(e, product.stock <= 0 ? "back_in_stock" : "price_drop")} className="space-y-3">
            <h2 className="font-serif text-xl font-semibold">{product.stock <= 0 ? "Notify me when back in stock" : "Alert me on a price drop"}</h2>
            <div className="flex gap-2">
              <input name="email" type="email" required placeholder="Your email" defaultValue={user?.email || ""} className="min-w-0 flex-1 rounded-xl border border-[#21152b]/15 bg-white px-4 py-3 text-sm" />
              <button className="rounded-xl bg-[#21152b] px-5 text-xs font-semibold uppercase tracking-widest text-white">Notify me</button>
            </div>
            {alertMsg && <p role="status" className="text-sm text-[#21152b]/70">{alertMsg}</p>}
          </form>
          {recent.length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-semibold">Recently viewed</h2>
              <div className="mt-3 flex gap-3">
                {products.filter((p) => recent.includes(p.id)).map((p) => (
                  <Link key={p.id} href={`/products/${p.slug}`} className="w-20">
                    {p.image && <img loading="lazy" decoding="async" src={p.image} alt={p.name} className="aspect-[4/5] w-20 rounded-lg object-cover" />}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Verified reviews */}
        <section className="mt-16 border-t border-[#21152b]/10 pt-12">
          <h2 className="font-serif text-2xl font-semibold">Verified Reviews</h2>
          {reviews.length === 0 ? (
            <p className="mt-3 text-sm text-[#21152b]/50">No reviews yet. Reviews come only from customers who purchased this product.</p>
          ) : (
            <ul className="mt-6 space-y-5">
              {reviews.map((r) => (
                <li key={r.id} className="rounded-2xl border border-[#21152b]/10 bg-white p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{r.userName}</span>
                    <span className="text-[#c9a56a]">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#21152b]/70">{r.comment}</p>
                </li>
              ))}
            </ul>
          )}
          {user ? (
            <form onSubmit={submitReview} className="mt-8 max-w-xl space-y-3">
              <select name="rating" defaultValue="5" aria-label="Rating" className="rounded-xl border border-[#21152b]/15 bg-white px-4 py-3 text-sm">
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} stars</option>
                ))}
              </select>
              <textarea name="comment" required minLength={5} rows={3} placeholder="Share your experience" className="w-full rounded-xl border border-[#21152b]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#8d5c91]" />
              <button className="rounded-xl bg-[#21152b] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white">Submit Review</button>
              {reviewMsg && <p role="status" className="text-sm text-[#21152b]/70">{reviewMsg}</p>}
            </form>
          ) : (
            <p className="mt-6 text-sm"><Link href="/auth/login" className="underline">Sign in</Link> to review products you have purchased.</p>
          )}
        </section>
      </div>
    </main>
  );
}
