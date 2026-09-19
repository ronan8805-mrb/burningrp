import { createFileRoute, Link } from "@tanstack/react-router";
import { Locator } from "@/components/locator";
import { getCut, regions } from "@/lib/data";

type FindSearch = {
  q?: string;
  cut?: string;
};

export const Route = createFileRoute("/find")({
  validateSearch: (search: Record<string, unknown>): FindSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    cut: typeof search.cut === "string" ? search.cut : undefined,
  }),
  head: () => ({
    meta: [{ title: "Find the Rope — Burning Rope Pharms" }],
  }),
  component: FindPage,
});

function FindPage() {
  const { q, cut } = Route.useSearch();
  const named = cut ? getCut(cut) : undefined;

  return (
    <main className="page-pad mx-auto max-w-[1440px] py-14">
      <p className="stamp text-sand">Locator</p>
      <h1 className="display mt-3 text-display">Find the Rope</h1>
      <p className="mt-4 max-w-2xl text-lg text-cream">
        Selected rooms. {named ? `Looking for ${named.name}.` : "Search a city or a cut."} You can also buy flower here.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {regions.map((region) => (
          <Link
            key={region.id}
            to="/find"
            search={{ q: region.query, cut }}
            className="border border-iron bg-hat px-5 py-5 press hover:border-sand"
          >
            <p className="stamp text-sand">{region.query}</p>
            <h2 className="display mt-2 text-2xl">{region.name}</h2>
            <p className="mt-2 text-sm text-ash">{region.line}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Locator initialQ={q ?? ""} initialCut={cut ?? ""} />
      </div>
    </main>
  );
}
