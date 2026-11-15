import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { bookingIssue } from "@/content/hours";

export const runtime = "nodejs";

const hits = new Map<string, number[]>();

/** Five requests per ten minutes, keyed by the caller address. */

type Payload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  date?: unknown;
  time?: unknown;
  guests?: unknown;
  note?: unknown;
  company?: unknown;
  locale?: unknown;
};

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || "local";
}

function limited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < 10 * 60 * 1000);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > 5;
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";
  const host = request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function notify(record: {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  note: string;
}) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO;
  const from = process.env.RESEND_FROM;
  if (!key || !to || !from) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Rezervasyon ${record.date} ${record.time}`,
      text: [
        record.name,
        record.phone,
        record.email,
        `${record.date} ${record.time}`,
        `${record.guests} kişi`,
        record.note,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  });
  return response.ok;
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "origin" }, { status: 403 });
  }
  if (limited(clientKey(request))) {
    return NextResponse.json({ ok: false, error: "limit" }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as Payload | null;
  if (!body || text(body.company, 80)) {
    return NextResponse.json({ ok: true });
  }

  const name = text(body.name, 80);
  const phone = text(body.phone, 24);
  const email = text(body.email, 120);
  const date = text(body.date, 10);
  const time = text(body.time, 5);
  const note = text(body.note, 500);
  const guests = Number(body.guests);
  const locale = body.locale === "en" ? "en" : "tr";

  if (!/^[\p{L}\s'.-]{2,80}$/u.test(name)) {
    return NextResponse.json({ ok: false, error: "name" }, { status: 400 });
  }
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    return NextResponse.json({ ok: false, error: "phone" }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }
  if (!Number.isInteger(guests) || guests < 1 || guests > 10) {
    return NextResponse.json({ ok: false, error: "guests" }, { status: 400 });
  }

  const issue = bookingIssue(date, time);
  if (issue) return NextResponse.json({ ok: false, error: issue }, { status: 400 });

  const record = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    phone,
    email,
    date,
    time,
    guests,
    note,
    locale,
    emailed: false,
  };

  try {
    record.emailed = await notify(record);
  } catch {
    record.emailed = false;
  }

  const dir = path.join(process.cwd(), "data", "inbox");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "reservations.jsonl"), `${JSON.stringify(record)}\n`, "utf8");

  return NextResponse.json({ ok: true });
}
