import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  solid: "bg-cream text-bone hover:bg-sand",
  ghost:
    "border border-sand/50 text-cream hover:border-fire hover:text-fire bg-transparent",
  fire: "bg-fire text-cream hover:bg-rust",
  iron: "bg-hat text-cream border border-iron hover:border-sand",
} as const;

type Variant = keyof typeof variants;

const base =
  "ui press inline-flex min-h-11 items-center justify-center px-6 text-sm font-semibold";

export function BrandButton({
  children,
  className,
  variant = "solid",
  type = "button",
  disabled,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        base,
        "disabled:cursor-not-allowed disabled:opacity-40",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function BrandLink({
  children,
  className,
  variant = "solid",
  to,
  search,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  to: string;
  search?: Record<string, string | undefined>;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      search={search}
      onClick={onClick}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </Link>
  );
}
