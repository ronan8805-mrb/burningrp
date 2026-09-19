import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandLink } from "@/components/brand-button";
import { CityField } from "@/components/city-field";
import { CutCard } from "@/components/cut-card";
import { EmailIron } from "@/components/email-iron";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { DoctrineMarquee } from "@/components/marquee";
import { money } from "@/lib/utils";
import { useCatalog } from "@/lib/use-catalog";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Burning Rope Pharms — In Rope We Trust" }],
  }),
  component: Home,
});

function Home() {
  const { user } = useCurrentUserState();
  const { cuts, merch } = useCatalog(Boolean(user));
  return (
    <main>
      <section className="relative h-svh min-h-[36rem] overflow-hidden">
        <HeroBackdrop />
        <div className="absolute inset-0 bg-linear-to-t from-bone via-bone/40 to-bone/15" />
        <div className="page-pad relative z-10 flex h-full max-w-[1440px] mx-auto flex-col justify-end pb-16">
          <p className="stamp text-sand">SFV · Indoor · 21+</p>
          <h1 className="display mt-3 text-mark text-cream">IN ROPE WE TRUST</h1>
          <p className="mt-4 max-w-lg text-white">
            Cowboy grown. If it don't slap, it ain't Rope. Flower and merch from the rooms.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BrandLink to="/cuts" variant="solid">
              Shop the cuts
            </BrandLink>
            <BrandLink to="/merch" variant="ghost">
              Merch
            </BrandLink>
          </div>
        </div>
      </section>

      <DoctrineMarquee />

      <section className="page-pad mx-auto max-w-[1440px] py-20">
        <p className="stamp text-fire">The creed</p>
        <p className="mt-5 max-w-2xl text-lg leading-snug text-cream md:text-xl">
          Cowboy Grown. Indoor. Single source. Cut for the nose, the smoke, and the leave. SFV rooms. Cold cure. The standard doesn't move.
        </p>
        <p className="display mt-8 max-w-2xl text-3xl text-sand md:text-4xl">
          If it don't slap, it ain't Rope.
        </p>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] pb-20">
        <div className="mb-8">
          <p className="stamp text-sand">Shop</p>
          <h2 className="display mt-2 text-section">The Cuts</h2>
          <p className="mt-3 max-w-md text-ash">ZESTPERADO and Z FUEL. The rest are on The Cuts.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cuts.slice(0, 2).map((cut) => (
            <CutCard key={cut.slug} cut={cut} />
          ))}
        </div>
        <div className="mt-8">
          <BrandLink to="/cuts" variant="ghost">
            See more
          </BrandLink>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img
          src="/images/festival-stage.jpg"
          alt="Night rodeo at the Burning Grounds"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-bone/70" />
        <div className="page-pad relative z-10 mx-auto max-w-[1440px] py-24">
          <p className="stamp text-sand">Burning Rope Pharms presents</p>
          <h2 className="display mt-4 text-display">ROPE BURN</h2>
          <p className="ui mt-3 text-sm text-cream">the Rodeo · three days · the Burning Grounds</p>
          <p className="mt-6 max-w-lg text-ash">
            Flower festival and expo. Date TBA. The list hears first.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BrandLink to="/rope-burn" variant="fire">
              The Rodeo
            </BrandLink>
            <BrandLink to="/list" variant="ghost">
              Get the date
            </BrandLink>
          </div>
        </div>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] py-20">
        <div className="mb-8">
          <p className="stamp text-sand">The barn</p>
          <h2 className="display mt-2 text-section">Merch</h2>
          <p className="mt-3 max-w-md text-ash">Hats, iron, paper. Two from the barn.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {merch.slice(0, 2).map((item) => (
            <Link
              key={item.slug}
              to="/merch"
              className="group wanted overflow-hidden bg-hat press"
            >
              <img
                src={item.image}
                alt={item.name}
                className="aspect-3/4 w-full object-cover transition-transform duration-(--motion-slow) group-hover:scale-[1.03]"
              />
              <div className="px-5 py-5">
                <h3 className="display text-2xl">{item.name}</h3>
                <p className="mt-2 text-sm text-ash">{item.line}</p>
                <p className="mt-3 text-sm text-cream">{item.soldOut ? "Sold out" : money(item.price)}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <BrandLink to="/merch" variant="ghost">
            See more
          </BrandLink>
        </div>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] grid gap-12 pb-20 lg:grid-cols-2">
        <div>
          <p className="stamp text-sand">Locator</p>
          <h2 className="display mt-2 text-section">Find the Rope</h2>
          <p className="mt-4 max-w-md text-ash">
            Buy here, or find a room. Type a city.
          </p>
          <div className="mt-8">
            <CityField />
          </div>
        </div>
        <div className="border border-iron bg-hat p-6 md:p-8">
          <EmailIron heading="Next cut. No spam." />
        </div>
      </section>
    </main>
  );
}
