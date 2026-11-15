import { Link } from "@/i18n/navigation";

const styles = {
  primary: "bg-pine text-cream hover:bg-pine-deep",
  ghost: "border border-cream/50 bg-transparent text-cream hover:bg-white/10",
} as const;

type Path = "/" | "/menu" | "/story" | "/gallery" | "/reserve" | "/contact" | "/events";

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: Path;
  children: React.ReactNode;
  variant?: keyof typeof styles;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-btn px-4 text-sm font-medium ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
