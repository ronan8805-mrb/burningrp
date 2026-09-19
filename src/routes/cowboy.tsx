import { createFileRoute } from "@tanstack/react-router";
import { BrandLink } from "@/components/brand-button";
import { doctrine } from "@/lib/data";

export const Route = createFileRoute("/cowboy")({
  head: () => ({
    meta: [{ title: "Cowboy Grown — Burning Rope Pharms" }],
  }),
  component: CowboyPage,
});

const timeline = [
  { year: "Dirt", title: "Tents and a barn garage", body: "OG runs in the Valley. Friends opened the bag and said it smelled like a rope on fire. We kept the name." },
  { year: "Rooms", title: "Indoor. Hand watered.", body: "Small rooms. Cold cure. No PGR. Single source." },
  { year: "Brand", title: "The name stuck", body: "Burning Rope Pharms. Cowboy Grown. If it don't slap, it stays home." },
  { year: "Rodeo", title: "Rope Burn", body: "A three-day festival at the Burning Grounds. Date TBA." },
];

function CowboyPage() {
  return (
    <main>
      <section className="relative h-[70svh] min-h-[28rem] overflow-hidden">
        <img
          src="/images/cowboy-portrait.jpg"
          alt="Ivory skeleton cowboy with cigar, sandstone dusk"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bone via-bone/30 to-transparent" />
        <div className="page-pad relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end pb-12">
          <p className="stamp text-sand">Origin</p>
          <h1 className="display mt-2 text-display">Cowboy Grown</h1>
          <p className="mt-3 max-w-lg text-ash">SFV. Named for the smell. Kept for the standard.</p>
        </div>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] grid gap-12 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="stamp text-fire">SFV</p>
          <h2 className="display mt-3 text-section">The bags smelled like burning rope.</h2>
          <p className="mt-6 max-w-xl text-ash">
            Indoor rooms in the Valley. Iron racks. Dust. The bag told the truth before the brand did. We did not add a leaf.
          </p>
          <p className="display mt-8 text-2xl text-cream md:text-3xl">
            If it don't slap, it ain't Rope.
          </p>
          <p className="mt-6 max-w-xl text-ash">
            Cowboy Grown, or it doesn't leave the room. Flower and merch ship from this shop. Selected rooms carry the same cuts.
          </p>
        </div>
        <img
          src="/images/cowboy-grown.jpg"
          alt="Indoor iron room, rope, warm practical light"
          className="aspect-4/3 w-full object-cover hairline"
        />
      </section>

      <section className="page-pad mx-auto max-w-[1440px] pb-8">
        <p className="stamp text-sand">How we got here</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {timeline.map((row) => (
            <article key={row.year} className="border border-iron bg-hat px-5 py-6">
              <p className="stamp text-fire">{row.year}</p>
              <h3 className="display mt-2 text-2xl">{row.title}</h3>
              <p className="mt-3 text-sm text-ash">{row.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] py-16 pb-24">
        <p className="stamp text-sand">Doctrine</p>
        <h2 className="display mt-2 text-section">Five lines.</h2>
        <ol className="mt-10 divide-y divide-iron border-y border-iron">
          {doctrine.map((item, i) => (
            <li key={item.title} className="grid gap-3 py-6 md:grid-cols-[3rem_1fr]">
              <span className="stamp text-sand">0{i + 1}</span>
              <span>
                <span className="display block text-2xl text-cream">{item.title}</span>
                <span className="mt-2 block max-w-2xl text-sm text-ash">{item.body}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-3">
          <BrandLink to="/cuts" variant="solid">
            Shop the cuts
          </BrandLink>
          <BrandLink to="/rope-burn" variant="ghost">
            The Rodeo
          </BrandLink>
        </div>
      </section>
    </main>
  );
}
