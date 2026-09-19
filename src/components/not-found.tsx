import { BrandLink } from "@/components/brand-button";

export function NotFoundPage() {
  return (
    <main className="grain relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <img src="/images/barn-wall.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-bone/75" />
      <article className="poster relative z-10 w-full max-w-md rotate-[-1deg] px-6 py-10">
        <span className="poster-nail top-2 left-2" />
        <span className="poster-nail top-2 right-2" />
        <span className="poster-nail bottom-2 left-2" />
        <span className="poster-nail bottom-2 right-2" />
        <p className="stamp text-rust">Burning Rope County · 404</p>
        <h1 className="display mt-3 text-4xl leading-none text-ink sm:text-5xl">WANTED</h1>
        <p className="ui mt-2 text-sm text-ink/70">No page by that name</p>
        <hr className="poster-rule my-5" />
        <p className="text-sm leading-snug text-ink/80">
          No cut, room, or merch at this address. Ride back to the Grounds.
        </p>
      </article>
      <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3">
        <BrandLink to="/" variant="solid">
          Home
        </BrandLink>
        <BrandLink to="/cuts" variant="ghost">
          The Cuts
        </BrandLink>
      </div>
    </main>
  );
}
