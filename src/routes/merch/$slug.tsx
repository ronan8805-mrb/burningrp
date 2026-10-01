import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { BrandLink } from "@/components/brand-button";
import { AddToBag } from "@/components/add-to-bag";
import { Lightbox } from "@/components/lightbox";
import { findMerch, visibleMerch } from "@/lib/catalog";
import { merchShots } from "@/lib/data";
import { getCatalogOverlay } from "@/lib/shop";
import { money } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/merch/$slug")({
  loader: async ({ params }) => {
    const overlay = await getCatalogOverlay();
    const item = findMerch(overlay, params.slug, true);
    if (!item) throw notFound();
    const related = visibleMerch(overlay, true)
      .filter((entry) => entry.slug !== item.slug)
      .slice(0, 3);
    return { item, related };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.item.name ?? "Merch"} — Burning Rope Pharms` }],
  }),
  component: MerchItemPage,
});

function MerchItemPage() {
  const { item, related } = Route.useLoaderData();
  const shots = merchShots(item);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const shot = shots[active] ?? shots[0];

  return (
    <main>
      <section className="page-pad mx-auto max-w-[1440px] py-10">
        <BrandLink to="/merch" variant="ghost">
          Back to merch
        </BrandLink>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            {shot ? (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="block w-full overflow-hidden bg-bone"
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className="aspect-square w-full object-contain"
                />
              </button>
            ) : null}
            {shots.length > 1 ? (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {shots.map((entry, i) => (
                  <button
                    key={entry.src}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={entry.alt}
                    className={cn(
                      "size-20 shrink-0 overflow-hidden border bg-bone",
                      i === active ? "border-cream" : "border-iron",
                    )}
                  >
                    <img src={entry.src} alt="" className="size-full object-contain" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <p className="stamp text-sand">{item.kind}</p>
            <h1 className="display mt-2 text-display">{item.name}</h1>
            <p className="ui mt-3 text-sm text-cream">{item.line}</p>
            <p className="mt-5 max-w-xl text-ash">{item.blurb}</p>
            <p className="mt-6 text-xl text-cream">{item.soldOut ? "Sold out" : money(item.price)}</p>
            {item.soldOut ? null : (
              <div className="mt-6 max-w-md">
                <AddToBag
                  price={item.price}
                  options={item.sizes}
                  line={{
                    kind: "merch",
                    slug: item.slug,
                    name: item.name,
                    image: item.image,
                    variant: item.sizes ? undefined : "One size",
                  }}
                />
              </div>
            )}
            <p className="mt-4 text-legal text-ash">Merch ships in the US. 21+.</p>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="page-pad mx-auto max-w-[1440px] pb-24">
          <p className="stamp text-sand">Also in the barn</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((entry) => (
              <Link
                key={entry.slug}
                to="/merch/$slug"
                params={{ slug: entry.slug }}
                className="group wanted overflow-hidden bg-hat press"
              >
                <img
                  src={entry.image}
                  alt={entry.name}
                  className="aspect-square w-full object-contain bg-bone"
                />
                <div className="px-5 py-5">
                  <h2 className="display text-2xl">{entry.name}</h2>
                  <p className="mt-2 text-sm text-ash">{entry.line}</p>
                  <p className="mt-3 text-sm text-cream">{entry.soldOut ? "Sold out" : money(entry.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {open && shot ? (
        <Lightbox shots={shots} index={active} onClose={() => setOpen(false)} onIndex={setActive} />
      ) : null}
    </main>
  );
}
