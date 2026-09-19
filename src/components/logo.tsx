import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  imgClassName,
}: {
  className?: string;
  imgClassName?: string;
}) {
  return (
    <Link
      to="/"
      className={cn("group inline-flex min-h-11 items-center press", className)}
      aria-label="Burning Rope Pharms home"
    >
      <img
        src="/images/logo.png"
        alt="Burning Rope Pharms"
        className={cn("h-12 w-auto sm:h-14", imgClassName)}
      />
    </Link>
  );
}
