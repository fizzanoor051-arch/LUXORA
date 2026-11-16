import type { Metadata } from "next";
import InfoPage from "@/components/info/InfoPage";

export const metadata: Metadata = { title: "Frequently Asked Questions | LUXORA" };

export default function Page() {
  return (
    <InfoPage eyebrow="Help" title="Frequently Asked Questions">
        <h2 className="font-serif text-2xl text-black">How do I pay?</h2><p>Cash on Delivery is available on every order. Online card payment appears at checkout once enabled by the store.</p>
        <h2 className="font-serif text-2xl text-black">How can I track my order?</h2><p>Open <a href="/track-order" className="underline">Track Order</a> and enter your order number and the email used at checkout.</p>
        <h2 className="font-serif text-2xl text-black">Can I use a coupon?</h2><p>Yes. Enter your code in the shopping bag. The discount is verified by our server before you pay.</p>
        <h2 className="font-serif text-2xl text-black">Can I change or cancel an order?</h2><p>Contact us as soon as possible. Orders that have not shipped can be cancelled and stock is released.</p>
    </InfoPage>
  );
}
