/** Sample hours from the current site. Monday and Tuesday closed. TODO: confirm with the owner. */
export const timezone = "Europe/Istanbul";

export type DayHours = {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  tr: string;
  en: string;
  open: string | null;
  close: string | null;
  kitchenClose: string | null;
};

export const week: DayHours[] = [
  { day: 1, tr: "Pazartesi", en: "Monday", open: null, close: null, kitchenClose: null },
  { day: 2, tr: "Salı", en: "Tuesday", open: null, close: null, kitchenClose: null },
  { day: 3, tr: "Çarşamba", en: "Wednesday", open: "17:00", close: "00:00", kitchenClose: "23:15" },
  { day: 4, tr: "Perşembe", en: "Thursday", open: "17:00", close: "00:00", kitchenClose: "23:15" },
  { day: 5, tr: "Cuma", en: "Friday", open: "17:00", close: "00:00", kitchenClose: "23:15" },
  { day: 6, tr: "Cumartesi", en: "Saturday", open: "17:00", close: "00:00", kitchenClose: "23:15" },
  { day: 0, tr: "Pazar", en: "Sunday", open: "17:00", close: "00:00", kitchenClose: "23:15" },
];

export type ServiceState = "open" | "kitchen-closed" | "closed";

const weekdayIndex: Record<string, DayHours["day"]> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function toMinutes(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

export function istanbulNow(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const read = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  let hour = Number(read("hour"));
  if (hour === 24) hour = 0;
  const minute = Number(read("minute"));
  return {
    day: weekdayIndex[read("weekday")],
    minutes: hour * 60 + minute,
  };
}

export function getServiceState(date = new Date()): ServiceState {
  const now = istanbulNow(date);
  const today = week.find((item) => item.day === now.day);
  if (!today?.open || !today.close) return "closed";

  const opens = toMinutes(today.open);
  let closes = toMinutes(today.close);
  if (closes <= opens) closes += 24 * 60;
  let cursor = now.minutes;
  if (cursor < opens && closes > 24 * 60) cursor += 24 * 60;
  if (cursor < opens || cursor >= closes) return "closed";

  if (today.kitchenClose) {
    const kitchen = toMinutes(today.kitchenClose);
    if (cursor >= kitchen) return "kitchen-closed";
  }
  return "open";
}

export function todayHours(date = new Date()) {
  const now = istanbulNow(date);
  return week.find((item) => item.day === now.day) ?? week[0];
}

export function istanbulDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const read = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${read("year")}-${read("month")}-${read("day")}`;
}

/** Last seating. The kitchen stops at 23:15. */
export function timeSlots() {
  const slots: string[] = [];
  for (let minutes = 17 * 60; minutes <= 23 * 60; minutes += 15) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    slots.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
  }
  return slots;
}

export type BookingIssue = "date" | "closed" | "time" | "past" | "range";

function addDays(iso: string, days: number) {
  const [year, month, day] = iso.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day + days, 9, 0, 0));
  return istanbulDate(next);
}

export function bookingIssue(isoDate: string, time: string, now = new Date()): BookingIssue | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return "date";
  const [year, month, day] = isoDate.split("-").map(Number);
  const probe = new Date(Date.UTC(year, month - 1, day, 9, 0, 0));
  if (Number.isNaN(probe.getTime()) || istanbulDate(probe) !== isoDate) return "date";
  if (!timeSlots().includes(time)) return "time";

  const hours = week.find((item) => item.day === istanbulNow(probe).day);
  if (!hours?.open) return "closed";

  const today = istanbulDate(now);
  if (isoDate < today) return "past";
  if (isoDate > addDays(today, 60)) return "range";
  if (isoDate === today && toMinutes(time) <= istanbulNow(now).minutes) return "past";
  return null;
}
