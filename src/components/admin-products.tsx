import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  catalogCuts,
  catalogMerch,
  EMPTY_OVERLAY,
  PRODUCT_IMAGES,
  type CatalogOverlay,
} from "@/lib/catalog";
import { cutFromPrice, type Cut, type MerchItem } from "@/lib/data";
import { adminAddProduct, adminHideProduct, adminUnhideProduct, getCatalogOverlay } from "@/lib/shop";
import { money } from "@/lib/utils";

const field =
  "mt-2 min-h-11 w-full border border-iron bg-hat px-3 text-cream outline-none focus:border-sand";

type Draft = {
  kind: "cut" | "merch";
  slug: string;
  name: string;
  line: string;
  cross: string;
  detail: string;
  price35: string;
  price7: string;
  price: string;
  merchKind: MerchItem["kind"];
  image: string;
  soldOut: boolean;
  early: boolean;
  baseCut?: Cut;
  baseMerch?: MerchItem;
};

function dollars(cents: number) {
  return (cents / 100).toFixed(2);
}

function fromCut(cut: Cut, early: boolean): Draft {
  const g35 = cut.formats.find((f) => f.label === "3.5g") ?? cut.formats[0];
  const g7 = cut.formats.find((f) => f.label === "7g") ?? cut.formats[1];
  return {
    kind: "cut",
    slug: cut.slug,
    name: cut.name,
    line: cut.line,
    cross: cut.cross,
    detail: cut.myth,
    price35: dollars(g35?.price ?? 5300),
    price7: dollars(g7?.price ?? 9700),
    price: "",
    merchKind: "wear",
    image: cut.card,
    soldOut: Boolean(cut.soldOut),
    early,
    baseCut: cut,
  };
}

function fromMerch(item: MerchItem, early: boolean): Draft {
  return {
    kind: "merch",
    slug: item.slug,
    name: item.name,
    line: item.line,
    cross: "",
    detail: item.blurb,
    price35: "",
    price7: "",
    price: dollars(item.price),
    merchKind: item.kind,
    image: item.image,
    soldOut: Boolean(item.soldOut),
    early,
    baseMerch: item,
  };
}

function emptyDraft(kind: "cut" | "merch"): Draft {
  return {
    kind,
    slug: "",
    name: "",
    line: kind === "cut" ? "3.5g - 7g" : "From the barn.",
    cross: kind === "cut" ? "HOUSE CUT" : "",
    detail: "",
    price35: "53.00",
    price7: "97.00",
    price: "48.00",
    merchKind: "wear",
    image: PRODUCT_IMAGES[0],
    soldOut: false,
    early: false,
  };
}

function toPayload(draft: Draft): Cut | MerchItem {
  if (draft.kind === "cut") {
    const p35 = Math.round(Number(draft.price35) * 100);
    const p7 = Math.round(Number(draft.price7) * 100);
    const formats = [
      { id: "jars" as const, label: "3.5g", price: Number.isFinite(p35) && p35 > 0 ? p35 : 5300 },
      { id: "jars" as const, label: "7g", price: Number.isFinite(p7) && p7 > 0 ? p7 : 9700 },
    ];
    const base = draft.baseCut;
    const gallery =
      base && base.card === draft.image
        ? base.gallery
        : [{ src: draft.image, alt: draft.name.trim() }, ...(base?.gallery ?? [])];
    return {
      ...(base ?? {
        nose: "Named on the desk.",
        smoke: "From the rooms.",
        warning: "21+.",
        theme: "western" as const,
        status: "live" as const,
        tape: [
          { label: "Room", value: "Indoor · single source" },
          { label: "Cut", value: draft.cross.trim() || "HOUSE CUT" },
          { label: "Drop", value: draft.line.trim() || "3.5g - 7g" },
          { label: "Cure", value: "Cold" },
          { label: "Temper", value: "Mean" },
          { label: "Smell", value: "Named on the desk" },
          { label: "Flavour", value: "From the rooms" },
        ],
      }),
      slug: draft.slug,
      name: draft.name.trim(),
      cross: draft.cross.trim() || "HOUSE CUT",
      line: draft.line.trim() || "3.5g - 7g",
      myth: draft.detail.trim() || `${draft.name.trim()}. Cowboy Grown.`,
      warning: draft.soldOut ? "Sold out." : base?.warning ?? "21+.",
      soldOut: draft.soldOut,
      formats,
      hero: draft.image,
      heroPortrait: draft.image,
      card: draft.image,
      gallery,
    };
  }
  const cents = Math.round(Number(draft.price) * 100);
  const base = draft.baseMerch;
  return {
    ...(base ?? { sizes: undefined }),
    slug: draft.slug,
    name: draft.name.trim(),
    kind: draft.merchKind,
    line: draft.line.trim() || "From the barn.",
    blurb: draft.detail.trim() || draft.name.trim(),
    image: draft.image,
    price: Number.isFinite(cents) && cents > 0 ? cents : 4800,
    soldOut: draft.soldOut,
  };
}

export function AdminProducts({ token }: { token: string }) {
  const [overlay, setOverlay] = useState<CatalogOverlay>(EMPTY_OVERLAY);
  const [tab, setTab] = useState<"cut" | "merch">("cut");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function reload() {
    const next = await getCatalogOverlay();
    setOverlay(next);
  }

  useEffect(() => {
    void reload().catch(() => undefined);
  }, []);

  const cutList = useMemo(() => catalogCuts(overlay), [overlay]);
  const merchList = useMemo(() => catalogMerch(overlay), [overlay]);
  const hidden = new Set(overlay.hidden);
  const early = new Set(overlay.earlySlugs);
  const images = useMemo(() => {
    const extra = [draft?.image, ...cutList.map((c) => c.card), ...merchList.map((m) => m.image)].filter(
      Boolean,
    ) as string[];
    return [...new Set([...PRODUCT_IMAGES, ...extra])];
  }, [cutList, merchList, draft?.image]);

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!draft) return;
    const slug =
      draft.slug ||
      draft.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (!slug || !draft.name.trim()) return;
    setBusy(true);
    const payload = toPayload({ ...draft, slug });
    await adminAddProduct({ data: { token, kind: draft.kind, slug, early: draft.early, payload } });
    setMsg(`${draft.name.trim()} saved.`);
    setDraft(null);
    await reload();
    setBusy(false);
  }

  return (
    <section className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
      <div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTab("cut")}
            className={`ui min-h-11 px-4 ${tab === "cut" ? "bg-cream text-bone" : "border border-iron"}`}
          >
            Cuts
          </button>
          <button
            type="button"
            onClick={() => setTab("merch")}
            className={`ui min-h-11 px-4 ${tab === "merch" ? "bg-cream text-bone" : "border border-iron"}`}
          >
            Merch
          </button>
          <button
            type="button"
            onClick={() => setDraft(emptyDraft(tab))}
            className="ui press ml-auto min-h-11 border border-sand px-4 text-sand"
          >
            Add {tab}
          </button>
        </div>

        <ul className="mt-6 divide-y divide-iron border-y border-iron">
          {(tab === "cut" ? cutList : merchList).map((item) => {
            const gone = hidden.has(item.slug);
            const sold = Boolean(item.soldOut);
            const price =
              tab === "cut" ? cutFromPrice(item as Cut) : (item as MerchItem).price;
            return (
              <li key={item.slug} className="flex items-center gap-3 py-3">
                <img src={"card" in item ? item.card : item.image} alt="" className="size-14 object-cover" />
                <div className="min-w-0 flex-1">
                  <p className={`display text-xl ${gone ? "text-ash line-through" : "text-cream"}`}>
                    {item.name}
                  </p>
                  <p className="text-xs text-ash">
                    {price != null ? money(price) : "—"}
                    {sold ? " · Sold out" : ""}
                    {early.has(item.slug) ? " · Members first" : ""}
                    {gone ? " · Hidden" : ""}
                  </p>
                </div>
                <button
                  type="button"
                  className="ui press min-h-11 px-3 text-sm text-cream"
                  onClick={() =>
                    setDraft(
                      tab === "cut"
                        ? fromCut(item as Cut, early.has(item.slug))
                        : fromMerch(item as MerchItem, early.has(item.slug)),
                    )
                  }
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="ui press min-h-11 px-3 text-sm text-fire"
                  onClick={() => {
                    const run = gone ? adminUnhideProduct : adminHideProduct;
                    void run({ data: { token, slug: item.slug } }).then(() => reload());
                  }}
                >
                  {gone ? "Restore" : "Remove"}
                </button>
              </li>
            );
          })}
        </ul>
        {msg ? <p className="mt-4 text-sm text-sand">{msg}</p> : null}
      </div>

      {draft ? (
        <form onSubmit={save} className="space-y-4 border border-iron bg-hat p-5">
          <p className="stamp text-fire">{draft.slug ? `Edit ${draft.name}` : `New ${draft.kind}`}</p>
          <label className="block">
            <span className="stamp text-sand">Name</span>
            <input
              className={field}
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              required
            />
          </label>
          {draft.kind === "cut" ? (
            <label className="block">
              <span className="stamp text-sand">Cross</span>
              <input
                className={field}
                value={draft.cross}
                onChange={(e) => setDraft({ ...draft, cross: e.target.value })}
              />
            </label>
          ) : (
            <label className="block">
              <span className="stamp text-sand">Kind</span>
              <select
                className={field}
                value={draft.merchKind}
                onChange={(e) => setDraft({ ...draft, merchKind: e.target.value as MerchItem["kind"] })}
              >
                <option value="wear">Wear</option>
                <option value="iron">Iron</option>
                <option value="paper">Paper</option>
              </select>
            </label>
          )}
          <label className="block">
            <span className="stamp text-sand">{draft.kind === "cut" ? "Amount line" : "Line"}</span>
            <input
              className={field}
              value={draft.line}
              onChange={(e) => setDraft({ ...draft, line: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="stamp text-sand">{draft.kind === "cut" ? "Details" : "Blurb"}</span>
            <textarea
              className={`${field} min-h-24 py-3`}
              value={draft.detail}
              onChange={(e) => setDraft({ ...draft, detail: e.target.value })}
            />
          </label>
          {draft.kind === "cut" ? (
            <div className="grid grid-cols-2 gap-3">
              <label>
                <span className="stamp text-sand">3.5g USD</span>
                <input
                  className={field}
                  value={draft.price35}
                  onChange={(e) => setDraft({ ...draft, price35: e.target.value })}
                />
              </label>
              <label>
                <span className="stamp text-sand">7g USD</span>
                <input
                  className={field}
                  value={draft.price7}
                  onChange={(e) => setDraft({ ...draft, price7: e.target.value })}
                />
              </label>
            </div>
          ) : (
            <label className="block">
              <span className="stamp text-sand">Price USD</span>
              <input
                className={field}
                value={draft.price}
                onChange={(e) => setDraft({ ...draft, price: e.target.value })}
              />
            </label>
          )}
          <label className="block">
            <span className="stamp text-sand">Image</span>
            <select
              className={field}
              value={images.includes(draft.image) ? draft.image : "__url__"}
              onChange={(e) => {
                if (e.target.value !== "__url__") setDraft({ ...draft, image: e.target.value });
              }}
            >
              {images.map((src) => (
                <option key={src} value={src}>
                  {src.replace("/images/", "")}
                </option>
              ))}
              <option value="__url__">Custom URL</option>
            </select>
            <input
              className={field}
              value={draft.image}
              onChange={(e) => setDraft({ ...draft, image: e.target.value })}
              placeholder="https://… or /images/…"
            />
            {draft.image ? (
              <img src={draft.image} alt="" className="mt-3 aspect-square w-full object-cover" />
            ) : null}
          </label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-cream">
            <input
              type="checkbox"
              checked={draft.soldOut}
              onChange={(e) => setDraft({ ...draft, soldOut: e.target.checked })}
            />
            Sold out
          </label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-cream">
            <input
              type="checkbox"
              checked={draft.early}
              onChange={(e) => setDraft({ ...draft, early: e.target.checked })}
            />
            Members first
          </label>
          <div className="flex gap-2">
            <button type="submit" disabled={busy} className="ui press min-h-12 flex-1 bg-cream text-bone">
              {busy ? "Saving…" : "Save"}
            </button>
            <button type="button" className="ui press min-h-12 px-4 border border-iron" onClick={() => setDraft(null)}>
              Close
            </button>
          </div>
        </form>
      ) : (
        <p className="text-sm text-ash">Pick a cut or merch to edit, or add a new one.</p>
      )}
    </section>
  );
}