import type { Metadata } from "next";
import InfoPage from "@/components/info/InfoPage";

export const metadata: Metadata = { title: "Returns & Refunds | LUXORA" };

export default function Page() {
  return (
    <InfoPage eyebrow="Peace of mind" title="Returns & Refunds">
        <p>If something is not right, contact us within 7 days of delivery with your order number. Items must be unused and in original packaging.</p>
        <p>Approved returns are refunded to the original payment method. Cash on Delivery orders are refunded by bank transfer after the item reaches us.</p>
        <p>Gift cards, opened cosmetics and personalised items cannot be returned for hygiene and quality reasons.</p>
    </InfoPage>
  );
}
