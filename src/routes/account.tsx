import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { BrandLink } from "@/components/brand-button";
import { listDropNotes, listMyOrders, listOffers } from "@/lib/shop";
import { useCatalog } from "@/lib/use-catalog";
import { money } from "@/lib/utils";
import { CutCard } from "@/components/cut-card";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [{ title: "Member desk — Burning Rope Pharms" }],
  }),
  component: AccountPage,
});

type Offer = { id: number; title: string; body: string };
type Note = { id: number; title: string; body: string };
type Order = { id: string; total: number; created_at: string; lines_json: string };

function AccountPage() {
  const { user, isPending } = useCurrentUserState();
  const { cuts, merch, overlay } = useCatalog(true);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    void listOffers().then(setOffers).catch(() => setOffers([]));
    void listDropNotes().then(setNotes).catch(() => setNotes([]));
    void listMyOrders()
      .then(setOrders)
      .catch(() => setOrders([]));
  }, []);

  if (isPending) return <div className="h-[50svh] bg-bone" />;
  if (!user) return <RedirectToSignIn />;

  const earlyCuts = cuts.filter((cut) => overlay.earlySlugs.includes(cut.slug));
  const earlyMerch = merch.filter((item) => overlay.earlySlugs.includes(item.slug));

  return (
    <main className="page-pad mx-auto max-w-[1440px] py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="stamp text-sand">Member desk</p>
          <h1 className="display mt-2 text-display">
            {user.displayName ?? "Rider"}
          </h1>
          <p className="mt-3 max-w-lg text-ash">
            Offers, first look, merch before the floor. Same cuts. You hear first.
          </p>
        </div>
        <UserButton />
      </div>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          { t: "Offers", b: "Member barn pricing and drops, posted here." },
          { t: "First look", b: "New cuts named here before the public shop." },
          { t: "Before the floor", b: "Early merch and limited iron, members first." },
        ].map((item) => (
          <article key={item.t} className="border border-iron bg-hat px-5 py-6">
            <h2 className="display text-2xl">{item.t}</h2>
            <p className="mt-3 text-sm text-ash">{item.b}</p>
          </article>
        ))}
      </section>

      <section className="mt-16">
        <p className="stamp text-fire">Offers</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {offers.length === 0 ? (
            <p className="text-sm text-ash">No live offers. The next one lands here.</p>
          ) : (
            offers.map((offer) => (
              <article key={offer.id} className="border border-iron px-5 py-5">
                <h3 className="display text-2xl">{offer.title}</h3>
                <p className="mt-2 text-sm text-ash">{offer.body}</p>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="mt-16">
        <p className="stamp text-sand">New releases</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {notes.map((note) => (
            <article key={note.id} className="border border-iron bg-hat px-5 py-5">
              <h3 className="display text-2xl">{note.title}</h3>
              <p className="mt-2 text-sm text-ash">{note.body}</p>
            </article>
          ))}
        </div>
        {earlyCuts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {earlyCuts.map((cut) => (
              <CutCard key={cut.slug} cut={cut} />
            ))}
          </div>
        ) : null}
        {earlyMerch.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {earlyMerch.map((item) => (
              <Link key={item.slug} to="/merch/$slug" params={{ slug: item.slug }} className="border border-iron bg-hat px-5 py-5 press">
                <h3 className="display text-2xl">{item.name}</h3>
                <p className="mt-2 text-sm text-ash">{item.line}</p>
                <p className="mt-3 text-sm text-cream">{money(item.price)}</p>
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      <section className="mt-16">
        <p className="stamp text-sand">Orders</p>
        {orders.length === 0 ? (
          <p className="mt-4 text-sm text-ash">No bag on file yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-iron border-y border-iron">
            {orders.map((order) => (
              <li key={order.id} className="flex flex-wrap items-baseline justify-between gap-3 py-4">
                <span className="display text-xl">{order.id}</span>
                <span className="text-sm text-ash">{order.created_at.slice(0, 10)}</span>
                <span className="text-sm text-cream">{money(order.total)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <BrandLink to="/merch" variant="solid">
            Shop merch
          </BrandLink>
          <BrandLink to="/cuts" variant="ghost">
            The cuts
          </BrandLink>
        </div>
      </section>
    </main>
  );
}
