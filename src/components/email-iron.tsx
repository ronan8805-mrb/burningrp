import { useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { LIST_KEY } from "@/lib/data";
import { BrandButton } from "@/components/brand-button";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailIron({
  heading = "Get the next brand",
  compact = false,
  defaultCity = "",
}: {
  heading?: string;
  compact?: boolean;
  defaultCity?: string;
}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [city, setCity] = useState(defaultCity);
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a working email.");
      return;
    }
    try {
      localStorage.setItem(
        LIST_KEY,
        JSON.stringify({ email: email.trim(), city: city.trim(), at: Date.now() }),
      );
    } catch {
      /* ignore */
    }
    void navigate({ to: "/list", search: { ok: "1" } });
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", !compact && "max-w-lg")} noValidate>
      <p className="stamp text-sand">{heading}</p>
      <div className={cn("mt-4 grid gap-3", compact ? "sm:grid-cols-[1fr_auto]" : "gap-3")}>
        <label className="sr-only" htmlFor="iron-email">
          Email
        </label>
        <input
          id="iron-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="Email"
          className="min-h-11 w-full border border-iron bg-bone px-4 text-base text-cream placeholder:text-ash outline-none focus:border-sand"
        />
        {compact ? null : (
          <>
            <label className="sr-only" htmlFor="iron-city">
              City
            </label>
            <input
              id="iron-city"
              name="city"
              type="text"
              autoComplete="address-level2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City (optional)"
              className="min-h-11 w-full border border-iron bg-bone px-4 text-base text-cream placeholder:text-ash outline-none focus:border-sand"
            />
          </>
        )}
        <BrandButton type="submit" variant="fire" className="w-full sm:w-auto">
          Join
        </BrandButton>
      </div>
      {error ? (
        <p className="mt-3 text-sm text-fire" role="alert">
          {error}
        </p>
      ) : (
        <p className="mt-3 text-legal text-ash">Next cut and Rope Burn date. No spam.</p>
      )}
    </form>
  );
}
