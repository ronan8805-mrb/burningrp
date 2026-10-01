import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { Cut } from "@/lib/data";
import { cutFromPrice } from "@/lib/data";
import { BrandLink } from "@/components/brand-button";
import { money, cn } from "@/lib/utils";

const ART: Record<string, string> = {
  zestperado: "/images/studio/zestperado.webp",
  zfuel: "/images/studio/z-fuel.webp",
  zog: "/images/studio/zog.webp",
  keylimez: "/images/studio/keylime-z.webp",
  zuma: "/images/studio/zuma.webp",
  zazooka: "/images/studio/zazooka.webp",
};

export function TheRide({ cuts }: { cuts: Cut[] }) {
  const [index, setIndex] = useState(0);
  const steps = useRef<(HTMLDivElement | null)[]>([]);
  const cut = cuts[index] ?? cuts[0];

  useEffect(() => {
    const nodes = steps.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit) return;
        const next = Number((hit.target as HTMLElement).dataset.i);
        if (!Number.isNaN(next)) setIndex(next);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0.15, 0.5] },
    );
    nodes.forEach((node) => obs.observe(node));
    return () => obs.disconnect();
  }, [cuts.length]);

  if (!cut) return null;
  const price = cutFromPrice(cut);
  const art = ART[cut.slug] ?? cut.card;

  return (
    <section
      className="relative bg-bone"
      style={{ height: `${Math.max(cuts.length, 1) * 62}vh` }}
      aria-label="The ride"
    >
      <div className="pointer-events-none absolute inset-0">
        {cuts.map((item, i) => (
          <div
            key={item.slug}
            data-i={i}
            ref={(node) => {
              steps.current[i] = node;
            }}
            className="h-[62vh]"
          />
        ))}
      </div>

      <div className="sticky top-(--header-h) z-10 flex h-[calc(100svh-var(--header-h))] flex-col overflow-hidden">
        <div className="page-pad mx-auto flex w-full max-w-[1440px] items-end justify-between gap-4 pt-5">
          <div>
            <p className="stamp text-fire">The ride</p>
            <h2 className="display text-3xl sm:text-section">Six in the wheel</h2>
          </div>
          <p className="stamp text-sand">
            {index + 1} / {cuts.length}
          </p>
        </div>

        <div className="page-pad mx-auto grid min-h-0 w-full max-w-[1440px] flex-1 items-center gap-6 pb-6 lg:grid-cols-[1.35fr_0.65fr]">
          <img
            key={art}
            src={art}
            alt={`${cut.name} — ${cut.cross}`}
            className="max-h-[38svh] w-full object-contain lg:max-h-[58svh]"
          />
          <div>
            <p className="stamp text-sand">{cut.cross}</p>
            <h3 className="display mt-2 text-4xl sm:text-display">{cut.name}</h3>
            <p className="mt-3 max-w-md text-sm text-ash sm:text-base">{cut.myth}</p>
            <p className="mt-4 text-cream">
              {cut.soldOut ? "Sold out" : price ? `From ${money(price)}` : cut.line}
            </p>
            <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Turn the wheel">
              {cuts.map((item, i) => (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "ui press inline-flex min-h-11 min-w-11 items-center justify-center border px-2 text-xs font-semibold",
                    i === index
                      ? "border-cream bg-cream text-bone"
                      : "border-iron text-ash hover:border-sand hover:text-cream",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/cuts/$slug"
                params={{ slug: cut.slug }}
                className="ui press inline-flex min-h-11 items-center justify-center bg-fire px-6 text-sm font-semibold text-cream hover:bg-rust"
              >
                Load the chamber
              </Link>
              <BrandLink to="/cuts" variant="ghost">
                The full menu
              </BrandLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
