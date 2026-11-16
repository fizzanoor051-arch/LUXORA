import type { Metadata } from "next";
import InfoPage from "@/components/info/InfoPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Contact | LUXORA" };

export default function ContactPage() {
  return (
    <InfoPage eyebrow="Support" title="Contact Us">
      <p>We are happy to help with orders, delivery and product questions.</p>
      <p>Email: <a className="underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
      {siteConfig.phone && (
        <p>Phone: <a className="underline" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a></p>
      )}
      <p>Please include your order number so we can help you faster.</p>
    </InfoPage>
  );
}
