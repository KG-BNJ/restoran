"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { timeSlots } from "@/content/hours";

const slots = timeSlots();
const guestCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const errors = ["name", "phone", "email", "guests", "date", "closed", "time", "past", "range", "limit", "failed"] as const;

type ErrorCode = (typeof errors)[number];

const fieldClass = "mt-1 w-full min-h-11 border border-line bg-white px-3 text-ink";

function isErrorCode(value: string): value is ErrorCode {
  return (errors as readonly string[]).includes(value);
}

export function ReserveForm({ today }: { today: string }) {
  const t = useTranslations("reserve");
  const locale = useLocale();
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<ErrorCode | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      date: String(data.get("date") ?? ""),
      time: String(data.get("time") ?? ""),
      guests: Number(data.get("guests")),
      note: String(data.get("note") ?? ""),
      company: String(data.get("company") ?? ""),
      locale,
    };

    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        setError(result.error && isErrorCode(result.error) ? result.error : "failed");
        return;
      }
      setDone(true);
    } catch {
      setError("failed");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <p className="mt-8 max-w-prose border border-line bg-white px-4 py-5 text-ink" role="status">
        {t("success")}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid max-w-xl gap-4" noValidate>
      <label className="block text-sm">
        {t("name")}
        <input name="name" autoComplete="name" required maxLength={80} className={fieldClass} />
      </label>
      <label className="block text-sm">
        {t("phone")}
        <input name="phone" type="tel" autoComplete="tel" required maxLength={24} className={fieldClass} />
      </label>
      <label className="block text-sm">
        {t("email")}
        <input name="email" type="email" autoComplete="email" maxLength={120} className={fieldClass} />
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm">
          {t("date")}
          <input name="date" type="date" required min={today} className={fieldClass} />
        </label>
        <label className="block text-sm">
          {t("time")}
          <select name="time" required defaultValue="19:00" className={fieldClass}>
            {slots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          {t("guests")}
          <select name="guests" required defaultValue="2" className={fieldClass}>
            {guestCounts.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm">
        {t("note")}
        <textarea name="note" maxLength={500} rows={3} className={`${fieldClass} py-2`} />
      </label>
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0"
      />
      {error ? (
        <p className="text-sm text-pine" role="alert">
          {t(`error.${error}`)}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center justify-center rounded-btn bg-pine px-4 text-sm font-medium text-cream hover:bg-pine-deep disabled:opacity-60"
      >
        {pending ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
