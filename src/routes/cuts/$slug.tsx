import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { BrandLink } from "@/components/brand-button";
import { AddToBag } from "@/components/add-to-bag";
import { CutCard } from "@/components/cut-card";
import { Gallery } from "@/components/gallery";
import { findCut, visibleCuts } from "@/lib/catalog";
import { getCatalogOverlay } from "@/lib/shop";
import { money } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cuts/$slug")({
  loader: async ({ params }) => {
    const overlay = await getCatalogOverlay();
    const cut = findCut(overlay, params.slug, true);
    if (!cut) throw notFound();
    const related = visibleCuts(overlay, true)
      .filter((item) => item.slug !== cut.slug)
      .slice(0, 3);
    return { cut, related };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.cut.name ?? "Cut"} — Burning Rope Pharms` }],
  }),
  component: CutPage,
});

function CutPage() {
  const { cut, related } = Route.useLoaderData();
  const toadz = cut.theme === "toadz";
  const [fmt, setFmt] = useState(0);
  const selected = cut.formats[fmt] ?? cut.formats[0];

  return (
    <main className={cn(toadz && "toadz-page")}>
      <section className="relative h-[70svh] min-h-[28rem] overflow-hidden">
        <img src={cut.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-t from-bone via-bone/30 to-transparent",
            toadz && "from-bone via-[#0a1628]/40",
          )}
        />
        <div className="page-pad relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end pb-12">
          <p className="stamp text-sand">{toadz ? "Temple cut · one page only" : "Cowboy Grown"}</p>
          <h1 className="display mt-2 text-display">{cut.name}</h1>
          <p className="ui mt-3 text-sm text-cream">{cut.cross}</p>
        </div>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="stamp text-sand">Myth</p>
          <p className="mt-4 max-w-xl text-lg leading-snug">{cut.myth}</p>

          {cut.status === "tba" || !selected ? (
            <div className="mt-10">
              <BrandLink to="/list" variant="fire">
                Join the list
              </BrandLink>
            </div>
          ) : cut.soldOut ? (
            <p className="stamp mt-10 text-fire">Sold out</p>
          ) : (
            <div className="mt-10 max-w-md">
              <p className="stamp text-sand">Format</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {cut.formats.map((item, i) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setFmt(i)}
                    className={cn(
                      "ui press inline-flex min-h-11 items-center border px-4 text-sm",
                      i === fmt
                        ? toadz
                          ? "border-toadz-glow bg-toadz-glow text-bone"
                          : "border-cream bg-cream text-bone"
                        : toadz
                          ? "border-toadz-glow/40 text-cream"
                          : "border-iron text-cream hover:border-sand",
                    )}
                  >
                    {item.label} · {money(item.price)}
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <AddToBag
                  price={selected.price}
                  line={{
                    kind: "cut",
                    slug: cut.slug,
                    name: cut.name,
                    image: cut.card,
                    variant: selected.label,
                  }}
                />
              </div>
              <p className="mt-4 text-legal text-ash">
                Adult-use cannabis. 21+. Ships to California. Also in selected rooms.
              </p>
              <BrandLink to="/find" search={{ cut: cut.slug }} variant="ghost" className="mt-4">
                Find a room
              </BrandLink>
            </div>
          )}
        </div>
        <div>
          <p className="stamp text-sand">Tape</p>
          <dl className="mt-4 divide-y divide-iron border-y border-iron">
            {cut.tape.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="stamp text-ash">{row.label}</dt>
                <dd className="text-sm text-cream">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] grid gap-8 pb-8 md:grid-cols-3">
        <article className="border border-iron bg-hat px-5 py-6">
          <p className="stamp text-sand">Nose</p>
          <p className="mt-3 text-sm text-cream">{cut.nose}</p>
        </article>
        <article className="border border-iron bg-hat px-5 py-6">
          <p className="stamp text-sand">Smoke</p>
          <p className="mt-3 text-sm text-cream">{cut.smoke}</p>
        </article>
        <article className="border-l-2 border-fire bg-hat px-5 py-6">
          <p className="stamp text-fire">Note</p>
          <p className="mt-3 text-sm text-cream">{cut.warning}</p>
        </article>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] pb-16">
        <p className="stamp mb-6 text-sand">Stills</p>
        <Gallery shots={cut.gallery} />
      </section>

      <section className="page-pad mx-auto max-w-[1440px] pb-24">
        <p className="stamp text-sand">Related cuts</p>
        <h2 className="display mt-2 text-section">Same dirt. Different iron.</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <CutCard key={item.slug} cut={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
