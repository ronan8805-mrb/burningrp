import type { ErrorComponentProps } from "@tanstack/react-router";
import { BrandLink } from "@/components/brand-button";

const FALLBACK_MESSAGE = "The iron went cold. Reload the Grounds.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-bone px-6 text-center text-cream">
      <p className="stamp text-fire">Fault</p>
      <h1 className="display text-4xl">The brand slipped.</h1>
      <p className="max-w-md text-sm break-words text-ash">{errorMessage(error)}</p>
      <BrandLink to="/" variant="ghost">
        Home
      </BrandLink>
    </main>
  );
}
