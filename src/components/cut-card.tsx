import { Link } from "@tanstack/react-router";
import type { Cut } from "@/lib/data";
import { cutFromPrice } from "@/lib/data";
import { money } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function CutCard({ cut, className }: { cut: Cut; className?: string }) {
  const from = cutFromPrice(cut);
  return (
    <Link
      to="/cuts/$slug"
      params={{ slug: cut.slug }}
      className={cn(
        "group wanted block overflow-hidden bg-hat press",
        className,
      )}
    >
      <div className="relative aspect-3/4 overflow-hidden bg-iron">
        <img
          src={cut.card}
          alt=""
          className="h-full w-full object-cover transition-transform duration-(--motion-slow) ease-(--ease-out) group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bone via-bone/10 to-transparent" />
        {cut.status === "tba" ? (
          <span className="stamp absolute top-3 left-3 bg-bone/80 px-2 py-1 text-sand">
            Date TBA
          </span>
        ) : cut.soldOut ? (
          <span className="stamp absolute top-3 left-3 bg-bone/80 px-2 py-1 text-fire">
            Sold out
          </span>
        ) : null}
      </div>
      <div className="px-4 py-5">
        <h3 className="display text-2xl tracking-wide text-cream">{cut.name}</h3>
        <p className="stamp mt-2 text-sand">{cut.cross}</p>
        <p className="mt-3 text-sm text-ash">{cut.line}</p>
        <p className="mt-3 text-sm text-cream">
          {cut.soldOut ? "Sold out" : from == null ? "Not for sale yet" : `From ${money(from)}`}
        </p>
      </div>
    </Link>
  );
}
