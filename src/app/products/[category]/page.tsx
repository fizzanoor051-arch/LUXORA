
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products"; // ya "../../data/products"

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;

  const categoryName =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  const categoryProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === category.toLowerCase() ||
      product.categoryId?.toLowerCase() === category.toLowerCase()
  );

  if (categoryProducts.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-purple-50 via-white to-pink-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-600">
            LUXORA COLLECTION
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {categoryName}
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Discover our carefully selected {categoryName.toLowerCase()} collection
            at LUXORA.
          </p>

          <div className="mt-6 text-sm text-gray-500">
            {categoryProducts.length} product
            {categoryProducts.length !== 1 ? "s" : ""} available
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Product visual */}
              <div className="flex h-72 items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-white">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-5xl font-bold text-purple-600 shadow-lg">
                  {product.name.charAt(0)}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                {product.badge && (
                  <span className="mb-2 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                    {product.badge}
                  </span>
                )}

                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  {product.brand}
                </p>

                <h2 className="mt-1 text-lg font-semibold text-gray-900 transition group-hover:text-purple-600">
                  {product.name}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                  {product.description}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>

                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-yellow-500">
                    ★ {product.rating}
                  </span>

                  <span className="text-sm font-semibold text-purple-600">
                    View Product →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
