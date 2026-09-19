import { createFileRoute, Link } from "@tanstack/react-router";
import { regions } from "@/lib/data";
import { BrandLink } from "@/components/brand-button";

export const Route = createFileRoute("/grounds")({
  head: () => ({
    meta: [{ title: "The Grounds — Burning Rope Pharms" }],
  }),
  component: GroundsPage,
});

function GroundsPage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <img
          src="/images/grounds.jpg"
          alt="Sandstone canyon at night, fire rings, valley glow"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-bone/65" />
        <div className="page-pad relative z-10 mx-auto max-w-[1440px] py-28">
          <p className="stamp text-sand">Rooms</p>
          <h1 className="display mt-3 text-display">The Grounds</h1>
          <p className="mt-4 max-w-lg text-lg text-cream">
            Dropping in selected rooms. SFV first. Then the city. Then the state. Same cuts you can buy here.
          </p>
        </div>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] py-16">
        <p className="stamp text-sand">How a room gets branded</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { t: "It slaps", b: "If the room can't hold the nose, it doesn't get the bag." },
            { t: "It stays cowboy", b: "Rope on the shelf. Indoor. Single source." },
            { t: "It's few", b: "Twelve rooms that mean it. Not a pin on four hundred stores." },
          ].map((item) => (
            <article key={item.t} className="border border-iron bg-hat px-5 py-6">
              <h2 className="display text-2xl">{item.t}</h2>
              <p className="mt-3 text-sm text-ash">{item.b}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] grid grid-cols-1 gap-6 pb-8 md:grid-cols-3">
        {regions.map((region) => (
          <Link
            key={region.id}
            to="/find"
            search={{ q: region.query }}
            className="group wanted overflow-hidden bg-hat press"
          >
            <div className="aspect-4/3 overflow-hidden">
              <img
                src={region.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-(--motion-slow) group-hover:scale-[1.03]"
              />
            </div>
            <div className="px-5 py-6">
              <h2 className="display text-3xl">{region.name}</h2>
              <p className="mt-3 text-sm text-ash">{region.line}</p>
              <p className="ui mt-5 text-sm text-fire">Find the Rope</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="page-pad mx-auto max-w-[1440px] flex flex-wrap gap-3 pb-24">
        <BrandLink to="/find" variant="solid">
          Search the dirt
        </BrandLink>
        <BrandLink to="/cuts" variant="ghost">
          Shop here
        </BrandLink>
      </section>
    </main>
  );
}
