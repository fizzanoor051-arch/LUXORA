import type { Metadata } from "next";
import InfoPage from "@/components/info/InfoPage";

export const metadata: Metadata = { title: "Terms & Conditions | LUXORA" };

export default function Page() {
  return (
    <InfoPage eyebrow="Legal" title="Terms & Conditions">
        <p>By placing an order you confirm that the information you provide is accurate. Prices are shown in US dollars and include any applicable discounts shown at checkout.</p>
        <p>We may cancel an order if an item is unavailable or a pricing error occurred, in which case you will be notified and refunded in full.</p>
        <p>Product images are for illustration; colours may vary slightly by screen.</p>
    </InfoPage>
  );
}
