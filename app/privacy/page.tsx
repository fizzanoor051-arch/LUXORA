import type { Metadata } from "next";
import InfoPage from "@/components/info/InfoPage";

export const metadata: Metadata = { title: "Privacy Policy | LUXORA" };

export default function Page() {
  return (
    <InfoPage eyebrow="Legal" title="Privacy Policy">
        <p>We collect only what is needed to process your order and support you: name, email, phone, delivery address and order history. Passwords are stored as salted hashes and are never readable by us.</p>
        <p>We do not sell your personal data. We use your email for order updates and, only if you subscribe, for newsletters. You can ask us to delete your account and data at any time.</p>
        <p>Card details are never entered on or stored by this website; card payments are handled by a certified payment provider.</p>
    </InfoPage>
  );
}
