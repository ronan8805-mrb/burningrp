import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Members — Burning Rope Pharms" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <div className="h-[50svh] bg-bone" />;
  if (user) return <Navigate to="/account" />;
  return <AuthCard />;
}

function AuthCard() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!authEnabled) {
      setError("Sign-in is not live yet.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: name.trim() || email.trim(),
        });
        if (err) throw new Error(err.message ?? "Could not sign up.");
      } else {
        const { error: err } = await authClient.signIn.email({
          email: email.trim(),
          password,
        });
        if (err) throw new Error(err.message ?? "Could not sign in.");
      }
      window.location.href = "/account";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not continue.");
      setBusy(false);
    }
  }

  const field =
    "mt-2 min-h-12 w-full border border-iron bg-hat px-4 text-cream placeholder:text-ash outline-none focus:border-sand";

  return (
    <main className="page-pad mx-auto flex min-h-[70svh] max-w-md flex-col justify-center py-16">
      <p className="stamp text-sand">Members</p>
      <h1 className="display mt-2 text-display">
        {mode === "in" ? "Sign in" : "Join the barn"}
      </h1>
      <p className="mt-3 text-sm text-ash">
        Offers, first look at new cuts, merch before the floor. 21+.
      </p>

      <div className="mt-8 grid grid-cols-2 border border-iron">
        <button
          type="button"
          className={`ui min-h-11 ${mode === "in" ? "bg-cream text-bone" : "text-cream"}`}
          onClick={() => setMode("in")}
        >
          Sign in
        </button>
        <button
          type="button"
          className={`ui min-h-11 ${mode === "up" ? "bg-cream text-bone" : "text-cream"}`}
          onClick={() => setMode("up")}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {mode === "up" ? (
          <div>
            <label className="stamp text-sand" htmlFor="member-name">
              Name
            </label>
            <input
              id="member-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={field}
              autoComplete="name"
            />
          </div>
        ) : null}
        <div>
          <label className="stamp text-sand" htmlFor="member-email">
            Email
          </label>
          <input
            id="member-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field}
            autoComplete="email"
          />
        </div>
        <div>
          <label className="stamp text-sand" htmlFor="member-pass">
            Password
          </label>
          <input
            id="member-pass"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={field}
            autoComplete={mode === "up" ? "new-password" : "current-password"}
          />
        </div>
        {error ? (
          <p className="text-sm text-fire" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={busy}
          className="ui press inline-flex min-h-12 w-full items-center justify-center bg-cream text-bone disabled:opacity-60"
        >
          {busy ? "Working…" : mode === "in" ? "Enter" : "Create account"}
        </button>
      </form>

      {authEnabled ? (
        <div className="mt-8 space-y-2">
          <p className="stamp text-sand">One tap</p>
          {GROK_PROVIDERS.map((p) => (
            <button
              key={p.providerId}
              type="button"
              onClick={() => signIn(p.providerId, { callbackURL: "/account" })}
              className="ui press inline-flex min-h-12 w-full items-center justify-center gap-3 border border-iron bg-hat text-cream hover:border-sand"
            >
              <ProviderMark id={p.providerId} />
              Continue with {p.label}
            </button>
          ))}
        </div>
      ) : null}
    </main>
  );
}

function ProviderMark({ id }: { id: string }) {
  if (id === "grok-google") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
        <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.4 3.6-5.1 3.6-3.1 0-5.6-2.6-5.6-5.4S8.9 6.6 12 6.6c1.8 0 3 .7 3.7 1.4l2.5-2.4C16.7 4.2 14.6 3.3 12 3.3 7.4 3.3 3.6 7.1 3.6 12S7.4 20.7 12 20.7c8 0 9.4-7 8.3-10.5H12z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path fill="currentColor" d="M14.7 3h2.8l-6.1 7 7.2 11h-5.6l-4.4-6.6L4.7 21H1.9l6.5-7.5L1.5 3h5.8l4 6.1L14.7 3zm-1 16.2h1.5L6.4 4.7H4.7l9 14.5z" />
    </svg>
  );
}
