import { createFileRoute } from "@tanstack/react-router";
import { TapeTable } from "@/components/tape-table";
import { tapeLegend } from "@/lib/data";
import { BrandLink } from "@/components/brand-button";

export const Route = createFileRoute("/tape")({
  head: () => ({
    meta: [{ title: "Tale of the Tape — Burning Rope Pharms" }],
  }),
  component: TapePage,
});

function TapePage() {
  return (
    <main>
      <section className="page-pad mx-auto max-w-[1440px] pt-14 pb-6">
        <p className="stamp text-sand">Specs</p>
        <h1 className="display mt-3 text-display">Tale of the Tape</h1>
        <p className="mt-4 max-w-2xl text-lg text-cream">
          Indoor. Single source. Cowboy Grown.
        </p>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] py-6">
        <p className="stamp text-sand">How to read it</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border border-iron px-4 py-3">
          {tapeLegend.map((row) => (
            <p key={row.label} className="text-sm">
              <span className="stamp text-fire">{row.label}</span>
              <span className="ml-2 text-ash">{row.body}</span>
            </p>
          ))}
        </div>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] pb-16">
        <TapeTable />
      </section>

      <section className="page-pad mx-auto max-w-[1440px] pb-24">
        <BrandLink to="/cuts" variant="solid">
          Shop the cuts
        </BrandLink>
      </section>
    </main>
  );
}
