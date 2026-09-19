import { Link, useSearch } from "@tanstack/react-router";
import { FORMAT_FILTERS, type FormatId } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CutFilters() {
  const search = useSearch({ from: "/cuts/" });
  const current = search.format ?? "all";

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Format">
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
  );
}

export type CutsSearch = {
  format?: FormatId;
};
