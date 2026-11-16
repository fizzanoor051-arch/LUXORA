import "server-only";
import { transaction } from "./db";

/**
 * Transactional email. With RESEND_API_KEY + MAIL_FROM set, mail is sent through Resend's REST API.
 * Without them, messages are stored in the outbox (visible to admin) so nothing is silently lost.
 */
export async function sendMail(to: string, subject: string, text: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  let status: "sent" | "queued" | "failed" = "queued";
  if (key && from) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, subject, text }),
      });
      status = res.ok ? "sent" : "failed";
    } catch {
      status = "failed";
    }
  }
  await transaction((db) => {
    db.outbox.push({ to, subject, text, at: new Date().toISOString(), status });
    if (db.outbox.length > 300) db.outbox.splice(0, db.outbox.length - 300);
  });
}

export const orderConfirmationText = (o: { number: string; total: number; items: { name: string; quantity: number }[]; shipping: { name: string; address: string; city: string } }) =>
  `Hi ${o.shipping.name},\n\nThank you for your LUXORA order ${o.number}.\n\n` +
  o.items.map((i) => `- ${i.name} x${i.quantity}`).join("\n") +
  `\n\nTotal: $${o.total.toFixed(2)}\nShipping to: ${o.shipping.address}, ${o.shipping.city}\n\nTrack your order anytime on our Track Order page with this order number and your email.\n\nLUXORA`;
