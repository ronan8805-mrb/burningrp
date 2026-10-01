import { createFileRoute, Link } from "@tanstack/react-router";
import { CutCard } from "@/components/cut-card";
import { FORMAT_FILTERS, type FormatId } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useCatalog } from "@/lib/use-catalog";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

type CutsSearch = {
  format?: FormatId;
};

export const Route = createFileRoute("/cuts/")({
  validateSearch: (search: Record<string, unknown>): CutsSearch => {
    const format = search.format;
    if (format === "flower" || format === "bags" || format === "jars") {
      return { format };
    }
    return {};
  },
  head: () => ({
    meta: [{ title: "The Cuts — Burning Rope Pharms" }],
  }),
  component: CutsPage,
});

function CutsPage() {
  const { format } = Route.useSearch();
  const current = format ?? "all";
  const { user } = useCurrentUserState();
  const { cuts } = useCatalog(Boolean(user));
  const list =
    current === "all" ? cuts : cuts.filter((cut) => cut.formats.some((item) => item.id === current));

  return (
    <main>
      <section className="page-pad mx-auto max-w-[1440px] pt-14 pb-8">
        <p className="stamp text-sand">Shop</p>
        <h1 className="display mt-3 text-display">The Cuts</h1>
        <p className="mt-4 max-w-2xl text-ash">
          The jars: ZESTPERADO, Z FUEL, ZOG, KEYLIMEZ, ZUMA, ZAZOOKA. Cowboy Grown. Indoor. Single source.
        </p>
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Format">
          {FORMAT_FILTERS.map((filter) => {
            const active = current === filter.id;
            return (
              <Link
                key={filter.id}
                to="/cuts"
                search={filter.id === "all" ? {} : { format: filter.id }}
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
      </section>

      <section className="page-pad mx-auto max-w-[1440px] pb-24">
        {list.length === 0 ? (
          <p className="text-ash">No cut in that format yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((cut) => (
              <CutCard key={cut.slug} cut={cut} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
