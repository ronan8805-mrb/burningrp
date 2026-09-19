import { useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { BrandButton } from "@/components/brand-button";

export function CityField() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = q.trim();
    void navigate({ to: "/find", search: { q: next || undefined } });
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="home-city">
        City
      </label>
      <input
        id="home-city"
        name="q"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="City or region"
        className="min-h-11 flex-1 border border-iron bg-bone px-4 text-base text-cream placeholder:text-ash outline-none focus:border-sand"
      />
      <BrandButton type="submit" variant="solid">
        Find the Rope
      </BrandButton>
    </form>
  );
}
