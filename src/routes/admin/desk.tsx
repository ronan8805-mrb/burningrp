import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { AdminProducts } from "@/components/admin-products";
import {
  adminAddNote,
  adminAddOffer,
  adminCheck,
  adminListMembers,
  adminListOrders,
  adminLogout,
  adminRemoveNote,
  adminRemoveOffer,
  listDropNotes,
  listOffers,
} from "@/lib/shop";
import { money } from "@/lib/utils";

const ADMIN_KEY = "rope-admin-token";

export const Route = createFileRoute("/admin/desk")({
  head: () => ({
    meta: [{ title: "Owner desk — Burning Rope Pharms" }],
  }),
  component: AdminDeskPage,
});

type Tab = "sales" | "members" | "products" | "offers";

function AdminDeskPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("sales");
  const token = typeof window !== "undefined" ? sessionStorage.getItem(ADMIN_KEY) : null;

  useEffect(() => {
    const t = sessionStorage.getItem(ADMIN_KEY);
    if (!t) {
      void navigate({ to: "/admin" });
      return;
    }
    void adminCheck({ data: t }).then((res) => {
      if (!res.ok) {
        sessionStorage.removeItem(ADMIN_KEY);
        void navigate({ to: "/admin" });
        return;
      }
      setReady(true);
    });
  }, [navigate]);

  if (!ready || !token) return <div className="h-[50svh] bg-bone" />;

  return (
    <main className="page-pad mx-auto max-w-[1440px] py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="stamp text-sand">Owner</p>
          <h1 className="display mt-2 text-display">The desk</h1>
        </div>
        <button
          type="button"
          className="ui press min-h-11 border border-iron px-4 text-cream"
          onClick={() => {
            void adminLogout({ data: token });
            sessionStorage.removeItem(ADMIN_KEY);
            void navigate({ to: "/admin" });
          }}
        >
          Close desk
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {(["sales", "members", "products", "offers"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`ui press min-h-11 px-4 ${tab === id ? "bg-cream text-bone" : "border border-iron text-cream"}`}
          >
            {id}
          </button>
        ))}
      </div>

      {tab === "sales" ? <Sales token={token} /> : null}
      {tab === "members" ? <Members token={token} /> : null}
      {tab === "products" ? <AdminProducts token={token} /> : null}
      {tab === "offers" ? <Offers token={token} /> : null}
    </main>
  );
}

function Sales({ token }: { token: string }) {
  const [orders, setOrders] = useState<
    { id: string; email: string; name: string; total: number; created_at: string; city: string; state: string }[]
  >([]);
  useEffect(() => {
    void adminListOrders({ data: token }).then(setOrders).catch(() => setOrders([]));
  }, [token]);
  const total = orders.reduce((n, o) => n + o.total, 0);
  return (
    <section className="mt-10">
      <p className="text-sm text-ash">
        {orders.length} orders · {money(total)}
      </p>
      <ul className="mt-6 divide-y divide-iron border-y border-iron">
        {orders.length === 0 ? (
          <li className="py-5 text-sm text-ash">No sales yet.</li>
        ) : (
          orders.map((order) => (
            <li key={order.id} className="grid gap-1 py-4 md:grid-cols-[8rem_1fr_8rem_6rem]">
              <span className="display text-lg">{order.id}</span>
              <span className="text-sm text-cream">
                {order.name} · {order.email}
              </span>
              <span className="text-sm text-ash">
                {order.city}, {order.state}
              </span>
              <span className="text-sm text-cream">{money(order.total)}</span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

function providerLabel(raw: string) {
  return raw
    .split(",")
    .map((p) => {
      const id = p.trim();
      if (id === "grok-google") return "Google";
      if (id === "grok-x") return "X";
      if (id === "credential") return "Email";
      return id || "Email";
    })
    .join(" · ");
}

function isOnline(lastSeen: string | null) {
  if (!lastSeen) return false;
  const t = new Date(lastSeen).getTime();
  if (Number.isNaN(t)) return false;
  return Date.now() - t < 2 * 60 * 1000;
}

function Members({ token }: { token: string }) {
  const [members, setMembers] = useState<
    { id: string; name: string; email: string; created_at: string; providers: string; last_seen: string | null }[]
  >([]);
  useEffect(() => {
    let alive = true;
    const load = () => {
      void adminListMembers({ data: token })
        .then((rows) => {
          if (alive) setMembers(rows);
        })
        .catch(() => {
          if (alive) setMembers([]);
        });
    };
    load();
    const id = window.setInterval(load, 12000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [token]);
  const live = members.filter((m) => isOnline(m.last_seen));
  return (
    <section className="mt-10">
      <div className="grid gap-4 sm:grid-cols-2">
        <article className="border border-iron bg-hat px-5 py-5">
          <p className="stamp text-fire">Online now</p>
          <p className="display mt-2 text-4xl">{live.length}</p>
          <p className="mt-1 text-sm text-ash">On the grounds in the last two minutes</p>
        </article>
        <article className="border border-iron px-5 py-5">
          <p className="stamp text-sand">Roster</p>
          <p className="display mt-2 text-4xl">{members.length}</p>
          <p className="mt-1 text-sm text-ash">Google, X, and email members</p>
        </article>
      </div>

      <p className="stamp mt-10 text-fire">Who is on</p>
      {live.length === 0 ? (
        <p className="mt-3 text-sm text-ash">Nobody live right now.</p>
      ) : (
        <ul className="mt-4 divide-y divide-iron border-y border-iron">
          {live.map((m) => (
            <li key={m.id} className="flex flex-wrap items-baseline justify-between gap-3 py-4">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-fire" aria-hidden />
                <span className="display text-xl">{m.name || "Rider"}</span>
              </span>
              <span className="text-sm text-cream">{m.email}</span>
              <span className="stamp text-sand">{providerLabel(m.providers)}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="stamp mt-10 text-sand">All members</p>
      <ul className="mt-4 divide-y divide-iron border-y border-iron">
        {members.length === 0 ? (
          <li className="py-5 text-sm text-ash">No members yet.</li>
        ) : (
          members.map((m) => {
            const on = isOnline(m.last_seen);
            return (
              <li key={m.id} className="grid gap-1 py-4 md:grid-cols-[1fr_1fr_8rem_8rem]">
                <span className="display text-lg">
                  {on ? <span className="mr-2 inline-block size-2 rounded-full bg-fire align-middle" /> : null}
                  {m.name || "Rider"}
                </span>
                <span className="text-sm text-cream">{m.email}</span>
                <span className="stamp text-sand">{providerLabel(m.providers)}</span>
                <span className="text-sm text-ash">{on ? "Online" : String(m.created_at).slice(0, 10)}</span>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}

function Offers({ token }: { token: string }) {
  const [offers, setOffers] = useState<{ id: number; title: string; body: string }[]>([]);
  const [notes, setNotes] = useState<{ id: number; title: string; body: string }[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [kind, setKind] = useState<"offer" | "note">("offer");
  const [refresh, setRefresh] = useState(0);
  const field =
    "mt-2 min-h-11 w-full border border-iron bg-hat px-3 text-cream outline-none focus:border-sand";

  useEffect(() => {
    void listOffers().then(setOffers);
    void listDropNotes().then(setNotes);
  }, [refresh]);

  async function add(e: FormEvent) {
    e.preventDefault();
    if (kind === "offer") await adminAddOffer({ data: { token, title, body } });
    else await adminAddNote({ data: { token, title, body } });
    setTitle("");
    setBody("");
    setRefresh((n) => n + 1);
  }

  return (
    <section className="mt-10 grid gap-12 lg:grid-cols-2">
      <form onSubmit={add} className="space-y-4">
        <p className="stamp text-fire">Post</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setKind("offer")}
            className={`ui min-h-11 px-4 ${kind === "offer" ? "bg-cream text-bone" : "border border-iron"}`}
          >
            Offer
          </button>
          <button
            type="button"
            onClick={() => setKind("note")}
            className={`ui min-h-11 px-4 ${kind === "note" ? "bg-cream text-bone" : "border border-iron"}`}
          >
            Release note
          </button>
        </div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className={field} placeholder="Title" required />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} className={`${field} min-h-28 py-3`} required />
        <button type="submit" className="ui press min-h-12 w-full bg-cream text-bone">
          Post to members
        </button>
      </form>
      <div className="space-y-6">
        <div>
          <p className="stamp text-sand">Offers</p>
          {offers.map((o) => (
            <p key={o.id} className="mt-3 flex items-start justify-between gap-3 text-sm">
              <span>
                <span className="text-cream">{o.title}</span>
                <span className="mt-1 block text-ash">{o.body}</span>
              </span>
              <button
                type="button"
                className="ui text-fire"
                onClick={() => void adminRemoveOffer({ data: { token, id: o.id } }).then(() => setRefresh((n) => n + 1))}
              >
                Remove
              </button>
            </p>
          ))}
        </div>
        <div>
          <p className="stamp text-sand">Release notes</p>
          {notes.map((o) => (
            <p key={o.id} className="mt-3 flex items-start justify-between gap-3 text-sm">
              <span>
                <span className="text-cream">{o.title}</span>
                <span className="mt-1 block text-ash">{o.body}</span>
              </span>
              <button
                type="button"
                className="ui text-fire"
                onClick={() => void adminRemoveNote({ data: { token, id: o.id } }).then(() => setRefresh((n) => n + 1))}
              >
                Remove
              </button>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
