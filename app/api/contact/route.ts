import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_FROM = "BrandLogiq <beth.t@example.com>";

function readString(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function emailAddress(value: string) {
  return (value.match(/<([^>]+)>/)?.[1] || value).trim().toLowerCase();
}

function resolveFrom(to: string, configured: string) {
  const fromDomain = emailAddress(configured).split("@")[1];
  const toDomain = emailAddress(to).split("@")[1];
  if (fromDomain && toDomain && fromDomain === toDomain) {
    return RESEND_FROM;
  }
  return configured;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "hello@brandlogiq.org";
  const from = resolveFrom(to, process.env.CONTACT_FROM_EMAIL || RESEND_FROM);

  if (!apiKey) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (readString(body.company, 80)) {
    return NextResponse.json({ ok: true });
  }

  const name = readString(body.name, 200);
  const email = readString(body.email, 320);
  const brief = readString(body.brief, 5000);

  if (!name || !EMAIL.test(email) || !brief) {
    return NextResponse.json({ error: "Please fill in name, email, and brief." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New inquiry from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, "", brief].join("\n"),
  });

  if (error) {
    console.error("Resend send failed", error);
    return NextResponse.json({ error: error.message || "Could not send the request." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
