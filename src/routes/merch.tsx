import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MERCH_FILTERS, type GalleryShot, type MerchItem } from "@/lib/data";
import { AddToBag } from "@/components/add-to-bag";
import { Lightbox } from "@/components/lightbox";
import { money } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useCatalog } from "@/lib/use-catalog";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

type MerchSearch = {
  kind?: MerchItem["kind"];
};

export const Route = createFileRoute("/merch")({
  validateSearch: (search: Record<string, unknown>): MerchSearch => {
    const kind = search.kind;
    if (kind === "wear" || kind === "iron" || kind === "paper") return { kind };
    return {};
  },
  head: () => ({
    meta: [{ title: "Merch — Burning Rope Pharms" }],
  }),
  component: MerchPage,
});

function MerchPage() {
  const { kind } = Route.useSearch();
  const current = kind ?? "all";
  const { user } = useCurrentUserState();
  const { merch } = useCatalog(Boolean(user));
  const list = useMemo(
    () => (current === "all" ? merch : merch.filter((item) => item.kind === current)),
    [current, merch],
  );
  const [open, setOpen] = useState(0);
  const [show, setShow] = useState(false);
  const [shots, setShots] = useState<GalleryShot[]>([]);

  return (
    <main>
      <section className="relative overflow-hidden">
        <img
          src="/images/festival-barn.jpg"
          alt="Merch barn at night, hats and iron on wood tables"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-bone/70" />
        <div className="page-pad relative z-10 mx-auto max-w-[1440px] py-24">
          <p className="stamp text-sand">The barn</p>
          <h1 className="display mt-3 text-display">Merch</h1>
          <p className="mt-4 max-w-xl text-lg text-cream">
            Tees, the hat, iron, and barn gear. Ships from the shop. Wear it like the brand — not a costume.
          </p>
        </div>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] py-14">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Merch kind">
          {MERCH_FILTERS.map((filter) => {
            const active = current === filter.id;
            return (
              <Link
                key={filter.id}
                to="/merch"
                search={filter.id === "all" ? {} : { kind: filter.id }}
                role="tab"
                aria-selected={active}
                className={cn(
                  "ui press inline-flex min-h-11 items-center px-4 text-sm font-semibold",
                  active
                    ? "bg-cream text-bone"
                    : "border border-iron text-ash hover:border-sand hover:text-cream",
                )}
              >
                {filter.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item) => (
            <article key={item.slug} className="wanted flex flex-col overflow-hidden bg-hat">
              <button
                type="button"
                onClick={() => {
                  setShots([
                    { src: item.image, alt: item.name },
                    ...(item.gallery ?? []),
                  ]);
                  setOpen(0);
                  setShow(true);
                }}
                className="group block w-full overflow-hidden"
              >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="aspect-square w-full object-contain bg-bone"
                />
                {item.soldOut ? (
                  <span className="stamp absolute top-3 left-3 bg-bone/80 px-2 py-1 text-fire">Sold out</span>
                ) : null}
              </div>
              </button>
              <div className="flex flex-1 flex-col px-5 py-5">
                <p className="stamp text-sand">{item.kind}</p>
                <h2 className="display mt-2 text-3xl">{item.name}</h2>
                <p className="mt-2 text-sm text-cream">{item.line}</p>
                <p className="mt-3 text-sm text-ash">{item.blurb}</p>
                <p className="mt-4 text-lg text-cream">{item.soldOut ? "Sold out" : money(item.price)}</p>
                <div className="mt-5">
                  {item.soldOut ? null : (
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
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] pb-24">
        <p className="max-w-2xl text-sm text-ash">
          Merch ships in the US. Flower in the same order ships to California only. 21+.
        </p>
      </section>

      {show && shots.length ? (
        <Lightbox
          shots={shots}
          index={open}
          onClose={() => setShow(false)}
          onIndex={setOpen}
        />
      ) : null}
    </main>
  );
}
