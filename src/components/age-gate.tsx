import { useEffect, useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { AGE_KEY } from "@/lib/data";
import { cn } from "@/lib/utils";

type Phase = "checking" | "form" | "pass" | "wanted" | "ok";

function yearsOld(iso: string): number | null {
  const born = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(born.getTime())) return null;
  const now = new Date();
  let n = now.getFullYear() - born.getFullYear();
  const m = now.getMonth() - born.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < born.getDate())) n -= 1;
  return n;
}

function prettyDob(iso: string): string {
  const born = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(born.getTime())) return "—";
  return born
    .toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();
}

export function AgeGate({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [phase, setPhase] = useState<Phase>("checking");
  const [nickname, setNickname] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const nameId = useId();
  const dobId = useId();
  const serial = useMemo(
    () => `RL-${String(Math.floor(1000 + Math.random() * 9000))}`,
    [],
  );

  useEffect(() => {
    try {
      setPhase(localStorage.getItem(AGE_KEY) === "1" ? "ok" : "form");
    } catch {
      setPhase("form");
    }
  }, []);

  function enter() {
    try {
      localStorage.setItem(AGE_KEY, "1");
    } catch {
      /* ignore quota */
    }
    setPhase("ok");
  }

  useEffect(() => {
    if (phase !== "pass") return;
    const id = window.setTimeout(enter, 3000);
    return () => window.clearTimeout(id);
  }, [phase]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const rider = nickname.trim();
    if (rider.length < 2) {
      setError("The pass needs a nickname.");
      return;
    }
    const age = yearsOld(dob);
    if (age == null) {
      setError("The pass needs a date of birth.");
      return;
    }
    setError("");
    if (age < 21) {
      setPhase("wanted");
      return;
    }
    setPhase("pass");
  }

  if (pathname.startsWith("/admin")) return <>{children}</>;
  if (phase === "ok") return <>{children}</>;
  if (phase === "checking") {
    return <div className="h-svh bg-bone" aria-hidden="true" />;
  }

  const rider = nickname.trim();
  const ticket = (
    <Ticket name={rider} dob={dob} serial={serial} punched={phase === "pass"} />
  );

  return (
    <div className="relative flex h-svh max-h-svh flex-col overflow-hidden bg-bone">
      <img
        src="/images/iron-hero.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-linear-to-t from-bone via-bone/80 to-bone/45" />

      {phase === "form" ? (
        <div className="page-pad relative z-10 mx-auto flex h-full w-full max-w-md flex-col justify-center py-6">
          <p className="stamp text-sand">The Rope Line · 21+</p>
          <h1 className="display mt-2 text-4xl leading-none text-cream sm:text-5xl">
            Punch the pass.
          </h1>
          <p className="mt-3 text-sm text-ash">
            To enter, you must be over 21. Nickname and date of birth. Adult-use. California.
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor={nameId} className="stamp text-sand">
                Nickname
              </label>
              <input
                id={nameId}
                name="nickname"
                autoComplete="nickname"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  if (error) setError("");
                }}
                placeholder="What they call you"
                className="gate-input mt-2 min-h-12 w-full border border-iron bg-hat px-4 text-base text-cream placeholder:text-ash outline-none focus:border-sand"
              />
            </div>
            <div>
              <label htmlFor={dobId} className="stamp text-sand">
                Date of birth
              </label>
              <input
                id={dobId}
                name="dob"
                type="date"
                autoComplete="bday"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  if (error) setError("");
                }}
                className="gate-input mt-2 min-h-12 w-full border border-iron bg-hat px-4 text-base text-cream outline-none focus:border-sand"
              />
            </div>
            {error ? (
              <p className="text-sm text-fire" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              className="ui press inline-flex min-h-12 w-full items-center justify-center bg-cream px-4 text-bone"
            >
              Punch the pass
            </button>
          </form>
        </div>
      ) : null}

      {phase === "pass" ? (
        <div className="page-pad relative z-10 mx-auto flex h-full w-full max-w-xl flex-col items-center justify-center">
          {ticket}
        </div>
      ) : null}

      {phase === "wanted" ? <WantedPoster onBack={() => setPhase("form")} /> : null}
    </div>
  );
}

function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/images/logo.png"
      alt="Burning Rope Pharms"
      className={cn("h-14 w-auto shrink-0 sm:h-16", className)}
    />
  );
}

function WantedPoster({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative z-10 flex h-full items-center justify-center px-4">
      <div className="wanted-burn relative w-full max-w-sm">
        <span className="burn-ember" aria-hidden />
        <article className="poster relative px-5 py-6 text-center sm:px-7 sm:py-8">
          <span className="poster-nail top-2 left-2" />
          <span className="poster-nail top-2 right-2" />
          <span className="poster-nail bottom-2 left-2" />
          <span className="poster-nail bottom-2 right-2" />
          <img
            src="/images/logo.png"
            alt="Burning Rope Pharms"
            className="poster-brand mx-auto"
          />
          <p className="stamp mt-3 text-ink/70">Burning Rope County</p>
          <h1 className="display mt-1 text-5xl leading-none text-ink">WANTED</h1>
          <p className="ui mt-1 text-sm text-rust">Under 21</p>
          <hr className="poster-rule my-4" />
          <p className="text-sm leading-snug text-ink">
            You are not allowed into this website.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="ui press mt-5 inline-flex min-h-11 w-full items-center justify-center border-2 border-ink px-3 text-ink"
          >
            Go back
          </button>
        </article>
      </div>
    </div>
  );
}

function Ticket({
  name,
  dob,
  serial,
  punched,
}: {
  name: string;
  dob: string;
  serial: string;
  punched: boolean;
}) {
  return (
    <article className="rope-ticket w-full max-w-xl" aria-label="Rope Line pass">
      <div className="ticket-stub">
        <p
          className="stamp text-ink/70"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          21+
        </p>
        <p
          className="display text-lg tracking-[0.2em] text-ink"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          ROPE
        </p>
        <p
          className="stamp text-xs text-ink/60"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {serial}
        </p>
      </div>
      <div className="ticket-body pb-12">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="stamp text-ink/55">Burning Rope Pharms</p>
            <p className="display mt-1 text-2xl leading-none text-ink sm:text-3xl">THE ROPE LINE</p>
          </div>
          <BrandMark />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3">
          <Field label="Nickname" value={name.toUpperCase()} wide />
          <Field label="Born" value={prettyDob(dob)} />
          <Field label="Class" value="21+" />
          <Field label="From" value="COUNTY LINE" />
          <Field label="To" value="THE GROUNDS" />
        </div>
        <p className="stamp mt-4 text-ink/45">21+ · In Rope We Trust · Cowboy Grown</p>
      </div>
      <div className={cn("ticket-punch", punched && "is-hot")}>
        <span className="ui text-xs leading-none">21+</span>
      </div>
    </article>
  );
}

function Field({
  label,
  value,
  wide,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <p className={wide ? "col-span-2" : undefined}>
      <span className="stamp block text-ink/50">{label}</span>
      <span className="mt-0.5 block break-words font-medium tracking-wide text-ink">{value}</span>
    </p>
  );
}
