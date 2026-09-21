import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms — Burning Rope Pharms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="page-pad mx-auto max-w-2xl py-16">
      <p className="stamp text-sand">California</p>
      <h1 className="display mt-3 text-display">Terms</h1>
      <div className="mt-8 space-y-8 text-ash">
        <section>
          <h2 className="display text-2xl text-cream">21+</h2>
          <p className="mt-3">
            You must be 21 or older to enter and to buy. Adult-use cannabis ships to California addresses only. Merch ships in the US.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-cream">Shop</h2>
          <p className="mt-3">
            Names, marks, stills, and copy belong to Burning Rope Pharms. Rooms listed as carrying a cut are a map, not a promise of inventory. Checkout in this preview is a simulated processor — no live charge.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-cream">Rope Burn</h2>
          <p className="mt-3">
            October 26–27. Two-day 21+ expo at the Burning Grounds. Tickets are not on sale yet. Vendor letters are inquiries, not confirmed booths.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-cream">Law</h2>
          <p className="mt-3">
            These terms are governed by the laws of the State of California, without regard to conflict.
          </p>
        </section>
      </div>
    </main>
  );
}
