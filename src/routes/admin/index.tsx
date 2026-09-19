import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { adminCheck, adminLogin } from "@/lib/shop";

const ADMIN_KEY = "rope-admin-token";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Owner desk — Burning Rope Pharms" }],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem(ADMIN_KEY);
    if (!token) return;
    void adminCheck({ data: token }).then((res) => {
      if (res.ok) void navigate({ to: "/admin/desk" });
    });
  }, [navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await adminLogin({ data: { username, password } });
      if (!res.ok) {
        setError(res.error);
        setBusy(false);
        return;
      }
      sessionStorage.setItem(ADMIN_KEY, res.token);
      await navigate({ to: "/admin/desk" });
    } catch {
      setError("Could not open the desk.");
      setBusy(false);
    }
  }

  const field =
    "mt-2 min-h-12 w-full border border-iron bg-hat px-4 text-cream outline-none focus:border-sand";

  return (
    <main className="page-pad mx-auto flex min-h-[70svh] max-w-md flex-col justify-center py-16">
      <p className="stamp text-sand">Owner</p>
      <h1 className="display mt-2 text-display">The desk</h1>
      <p className="mt-3 text-sm text-ash">Sales, products, the rest of the grounds.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="stamp text-sand" htmlFor="admin-user">
            Username
          </label>
          <input
            id="admin-user"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={field}
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label className="stamp text-sand" htmlFor="admin-pass">
            Password
          </label>
          <input
            id="admin-pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={field}
            autoComplete="current-password"
            required
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
          {busy ? "Opening…" : "Open the desk"}
        </button>
      </form>
    </main>
  );
}
