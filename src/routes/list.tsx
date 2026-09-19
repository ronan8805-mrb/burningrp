import { createFileRoute } from "@tanstack/react-router";
import { EmailIron } from "@/components/email-iron";
import { BrandLink } from "@/components/brand-button";
import { ironDonts, ironGets } from "@/lib/data";

type ListSearch = {
  ok?: string;
};

export const Route = createFileRoute("/list")({
  validateSearch: (search: Record<string, unknown>): ListSearch => ({
    ok: typeof search.ok === "string" ? search.ok : undefined,
  }),
  head: () => ({
    meta: [{ title: "Enter the List — Burning Rope Pharms" }],
  }),
  component: ListPage,
});

function ListPage() {
  const { ok } = Route.useSearch();
  const success = ok === "1";

  return (
    <main className="relative overflow-hidden">
      <img
        src="/images/iron-hero.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-bone/80" />
      <div className="page-pad relative z-10 mx-auto flex min-h-[70svh] max-w-3xl flex-col justify-center py-24">
        {success ? (
          <>
            <p className="stamp text-fire">List</p>
            <h1 className="display mt-3 text-display">You're on the iron.</h1>
            <p className="mt-4 max-w-xl text-ash">
              Next cut, Rope Burn date, room openings. That's the mail.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <BrandLink to="/cuts" variant="solid">
                Shop the cuts
              </BrandLink>
              <BrandLink to="/rope-burn" variant="ghost">
                The Rodeo
              </BrandLink>
            </div>
          </>
        ) : (
          <>
            <p className="stamp text-sand">List</p>
            <h1 className="display mt-3 text-display">Get the next brand</h1>
            <p className="mt-4 max-w-xl text-ash">
              Email. City if you want it. Next cut, festival date, rooms.
            </p>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="border border-iron bg-hat/80 p-6">
                <EmailIron heading="Join the list" />
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <p className="stamp text-fire">You get</p>
                  <ul className="mt-3 space-y-2 text-sm text-cream">
                    {ironGets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="stamp text-sand">You don't</p>
                  <ul className="mt-3 space-y-2 text-sm text-ash">
                    {ironDonts.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
