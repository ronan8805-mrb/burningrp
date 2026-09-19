import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { festival, VENDOR_KEY } from "@/lib/data";
import { BrandButton, BrandLink } from "@/components/brand-button";

export const Route = createFileRoute("/rope-burn")({
  head: () => ({
    meta: [{ title: "Rope Burn — The Rodeo | Burning Rope Pharms" }],
  }),
  component: RopeBurnPage,
});

function RopeBurnPage() {
  return (
    <main>
      <section className="relative min-h-[28rem] overflow-hidden md:h-[70svh]">
        <img
          src="/images/festival-stage.jpg"
          alt="Iron Stage at night, fire columns, cowboy hats in the dust"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bone via-bone/50 to-bone/20" />
        <div className="page-pad relative z-10 mx-auto flex h-full min-h-[28rem] max-w-[1440px] flex-col justify-end pb-12 md:pb-16">
          <p className="stamp text-sand">Burning Rope Pharms presents</p>
          <h1 className="display mt-3 text-mark">ROPE BURN</h1>
          <p className="ui mt-2 text-sm text-cream">at the Burning Grounds · spoken: the Rodeo</p>
          <p className="mt-4 max-w-xl text-ash">{festival.when}</p>
        </div>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] grid gap-10 py-16 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="stamp text-fire">The festival</p>
          <h2 className="display mt-3 text-section">{festival.creed}</h2>
          <p className="mt-5 max-w-xl text-ash">{festival.where}</p>
          <p className="mt-5 max-w-xl text-ash">
            Printed title: Rope Burn. Place: the Burning Grounds. Spoken: the Rodeo. Date TBA — the list hears first.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <BrandLink to="/list" variant="fire">
            Get the date
          </BrandLink>
          <a
            href="#vendor"
            className="ui press inline-flex min-h-11 items-center justify-center border border-sand/50 px-6 text-sm font-semibold text-cream"
          >
            Vendor signup
          </a>
        </div>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] pb-8">
        <p className="stamp text-sand">Three days</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {festival.days.map((day) => (
            <article key={day.id} className="border border-iron bg-hat px-5 py-6">
              <p className="stamp text-fire">{day.hours}</p>
              <h3 className="display mt-3 text-2xl">{day.name}</h3>
              <p className="mt-3 text-sm text-ash">{day.line}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-pad mx-auto max-w-[1440px] grid gap-8 py-12 lg:grid-cols-2 lg:items-center">
        <img
          src="/images/festival-expo.jpg"
          alt="Expo tables at the Burning Grounds"
          className="aspect-16/9 w-full object-cover hairline"
        />
        <div>
          <p className="stamp text-sand">On the dirt</p>
          <p className="mt-4 text-ash">
            Growers, hash, paper, and iron under a barn roof. Stages after dark. Merch in the barn. 21+ throughout.
          </p>
          <p className="mt-4 text-ash">
            Tickets are not on sale yet. When the Saturday exists, it goes to the list, then here.
          </p>
          <BrandLink to="/merch" variant="ghost" className="mt-8">
            Shop merch
          </BrandLink>
        </div>
      </section>

      <section id="vendor" className="page-pad mx-auto max-w-[1440px] scroll-mt-24 py-12 pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="stamp text-sand">Vendors</p>
            <h2 className="display mt-2 text-section">Ask for a table.</h2>
            <p className="mt-4 max-w-md text-ash">
              Indoor flower, hash, paper, iron. Write the house. We read every letter. Space is limited.
            </p>
          </div>
          <VendorForm />
        </div>
      </section>
    </main>
  );
}

function VendorForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !company) {
      setError("Name, email, and company.");
      return;
    }
    try {
      localStorage.setItem(
        VENDOR_KEY,
        JSON.stringify({ name, email, company, note, at: Date.now() }),
      );
    } catch {
      /* ignore */
    }
    setError("");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-iron bg-hat p-6 md:p-8">
        <p className="stamp text-fire">Received</p>
        <h3 className="display mt-2 text-3xl">We have your letter.</h3>
        <p className="mt-4 text-ash">If there is a table, we write back. Date still TBA.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 border border-iron bg-hat p-6 md:p-8" noValidate>
      <label className="sr-only" htmlFor="v-name">
        Name
      </label>
      <input
        id="v-name"
        name="name"
        required
        placeholder="Name"
        className="min-h-11 border border-iron bg-bone px-4 text-cream placeholder:text-ash outline-none focus:border-sand"
      />
      <label className="sr-only" htmlFor="v-email">
        Email
      </label>
      <input
        id="v-email"
        name="email"
        type="email"
        required
        placeholder="Email"
        className="min-h-11 border border-iron bg-bone px-4 text-cream placeholder:text-ash outline-none focus:border-sand"
      />
      <label className="sr-only" htmlFor="v-company">
        Company
      </label>
      <input
        id="v-company"
        name="company"
        required
        placeholder="Company / room"
        className="min-h-11 border border-iron bg-bone px-4 text-cream placeholder:text-ash outline-none focus:border-sand"
      />
      <label className="sr-only" htmlFor="v-note">
        What you bring
      </label>
      <textarea
        id="v-note"
        name="note"
        rows={4}
        placeholder="What you bring to the floor"
        className="border border-iron bg-bone px-4 py-3 text-cream placeholder:text-ash outline-none focus:border-sand"
      />
      {error ? (
        <p className="text-sm text-fire" role="alert">
          {error}
        </p>
      ) : null}
      <BrandButton type="submit" variant="fire">
        Send vendor letter
      </BrandButton>
    </form>
  );
}
