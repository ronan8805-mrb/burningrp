import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy — Burning Rope Pharms" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="page-pad mx-auto max-w-2xl py-16">
      <p className="stamp text-sand">California</p>
      <h1 className="display mt-3 text-display">Privacy</h1>
      <div className="mt-8 space-y-8 text-ash">
        <section>
          <h2 className="display text-2xl text-cream">What this site is</h2>
          <p className="mt-3">
            A 21+ brand shop. We sell flower (California adult-use) and merch. Age is remembered on your machine.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-cream">Orders</h2>
          <p className="mt-3">
            Checkout is simulated in this preview. Card numbers are checked for format and never stored — only last four and a fake auth code stay on your machine so you can read the receipt.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-cream">The list</h2>
          <p className="mt-3">
            If you join the list, we keep the email and optional city you typed. We do not sell that list.
          </p>
        </section>
        <section>
          <h2 className="display text-2xl text-cream">California</h2>
          <p className="mt-3">
            You may ask what we hold and ask that it be deleted by writing{" "}
            <a className="text-cream underline decoration-iron underline-offset-4" href="mailto:iron@burningropepharms.com">
              iron@burningropepharms.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
