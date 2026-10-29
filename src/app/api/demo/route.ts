// Receives the "Book a demo" form and forwards it to Curengo's lead destination.
// The destination is a webhook (CRM, Zapier/Pabbly, Google Apps Script ...) set in the environment:
//   LEAD_WEBHOOK_URL     where to POST the lead (required in production)
//   LEAD_WEBHOOK_SECRET  optional, sent as the X-Webhook-Secret header
// These stay on the server: never put them in NEXT_PUBLIC_ variables or in the browser.

const ROLES = ["Owner or director", "Medical director", "Doctor", "Nursing head", "Physiotherapist", "Administrator", "Other"];
const CENTRE_TYPES = ["Inpatient rehabilitation", "Transitional / subacute care", "Post-hospitalization care", "OP physiotherapy clinic", "Assisted living", "Home care"];

type Lead = { name: string; role: string; centre: string; type: string; email: string; phone: string; beds: string; city: string; message: string };

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  // bots fill every field, people never see this one
  if (text(body.website, 200)) return Response.json({ ok: true });

  const lead: Lead = {
    name: text(body.name, 120),
    role: text(body.role, 60),
    centre: text(body.centre, 160),
    type: text(body.type, 60),
    email: text(body.email, 160),
    phone: text(body.phone, 30),
    beds: text(body.beds, 6),
    city: text(body.city, 80),
    message: text(body.message, 2000),
  };

  const problems: string[] = [];
  if (lead.name.length < 2) problems.push("name");
  if (!ROLES.includes(lead.role)) problems.push("role");
  if (lead.centre.length < 2) problems.push("centre");
  if (!CENTRE_TYPES.includes(lead.type)) problems.push("type");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) problems.push("email");
  if (lead.phone.replace(/\D/g, "").length < 8) problems.push("phone");
  if (lead.beds && !/^\d{1,5}$/.test(lead.beds)) problems.push("beds");
  if (problems.length) return Response.json({ error: "invalid", fields: problems }, { status: 422 });

  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[demo] LEAD_WEBHOOK_URL not set, lead not forwarded (dev only):", lead);
      return Response.json({ ok: true, delivered: false });
    }
    console.error("[demo] LEAD_WEBHOOK_URL is not set: a lead could not be delivered");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.LEAD_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({ ...lead, source: "curengo.ai/book-a-demo", submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`webhook answered ${res.status}`);
  } catch (err) {
    console.error("[demo] could not deliver lead:", err);
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
