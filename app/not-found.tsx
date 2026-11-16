import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#faf9f7] px-6 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#9b7b58]">Error 404</p>
        <h1 className="mt-4 font-serif text-5xl">This page has left the collection</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500">
          The page you are looking for may have moved. Let us take you back to something beautiful.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="bg-black px-8 py-4 text-xs uppercase tracking-widest text-white hover:bg-[#9b7b58]">Home</Link>
          <Link href="/products" className="border border-black/20 px-8 py-4 text-xs uppercase tracking-widest hover:bg-black/5">Shop</Link>
        </div>
      </div>
    </main>
  );
}
