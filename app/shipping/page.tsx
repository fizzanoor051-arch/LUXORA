import type { Metadata } from "next";
import InfoPage from "@/components/info/InfoPage";

export const metadata: Metadata = { title: "Shipping Information | LUXORA" };

export default function Page() {
  return (
    <InfoPage eyebrow="Delivery" title="Shipping Information">
        <p>Orders are processed within 1-2 business days. Standard delivery usually takes 3-7 business days depending on your city.</p>
        <p>Shipping is <b>free on orders of $75 or more</b> (after discounts). Below that, a flat fee of $12 applies. The exact amount is always shown in your bag and at checkout before you pay.</p>
        <p>Once your order ships, its status updates on the <a href="/track-order" className="underline">order tracking page</a>.</p>
    </InfoPage>
  );
}
