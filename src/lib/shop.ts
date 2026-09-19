import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import type { Cut, MerchItem } from "@/lib/data";
import { EMPTY_OVERLAY, type CatalogOverlay } from "@/lib/catalog";

type ExtraRow = { kind: string; slug: string; early: boolean; payload: string };
type OfferRow = { id: number; title: string; body: string; created_at: string };
type NoteRow = { id: number; title: string; body: string; created_at: string };
type OrderRow = {
  id: string;
  user_id: string | null;
  email: string;
  name: string;
  total: number;
  created_at: string;
  lines_json: string;
  state: string;
  city: string;
};

async function loadOverlay(): Promise<CatalogOverlay> {
  const sql = await getSql();
  const extras = await sql<ExtraRow>`select kind, slug, early, payload from extra_products order by id desc`;
  const hiddenRows = await sql<{ slug: string }>`select slug from hidden_products`;
  const extraCuts: Cut[] = [];
  const extraMerch: MerchItem[] = [];
  const earlySlugs: string[] = [];
  for (const row of extras) {
    if (row.early) earlySlugs.push(row.slug);
    try {
      const payload = JSON.parse(row.payload) as Cut | MerchItem;
      if (row.kind === "cut") extraCuts.push(payload as Cut);
      else extraMerch.push(payload as MerchItem);
    } catch {
      /* skip bad row */
    }
  }
  return {
    extraCuts,
    extraMerch,
    hidden: hiddenRows.map((r) => r.slug),
    earlySlugs,
  };
}

export const getCatalogOverlay = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await loadOverlay();
  } catch {
    return EMPTY_OVERLAY;
  }
});

export const listOffers = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return sql<OfferRow>`select id, title, body, created_at from offers order by id desc`;
});

export const listDropNotes = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return sql<NoteRow>`select id, title, body, created_at from drop_notes order by id desc`;
});

export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<OrderRow>`
      select id, user_id, email, name, total, created_at, lines_json, state, city
      from orders
      where user_id = ${context.userId}
      order by created_at desc
    `;
  });

type NewOrder = {
  id: string;
  email: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  last4: string;
  brand: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  lines: unknown[];
};

export const recordOrder = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((order: NewOrder) => order)
  .handler(async ({ context, data: order }) => {
    const sql = await getSql();
    await sql`
      insert into orders (
        id, user_id, email, name, address, city, state, zip, last4, brand,
        subtotal, shipping, tax, total, lines_json
      ) values (
        ${order.id}, ${context.userId}, ${order.email}, ${order.name}, ${order.address},
        ${order.city}, ${order.state}, ${order.zip}, ${order.last4}, ${order.brand},
        ${order.subtotal}, ${order.shipping}, ${order.tax}, ${order.total},
        ${JSON.stringify(order.lines)}
      )
    `;
    return { ok: true };
  });

export const recordGuestOrder = createServerFn({ method: "POST" })
  .validator((order: NewOrder) => order)
  .handler(async ({ data: order }) => {
    const sql = await getSql();
    await sql`
      insert into orders (
        id, user_id, email, name, address, city, state, zip, last4, brand,
        subtotal, shipping, tax, total, lines_json
      ) values (
        ${order.id}, ${null}, ${order.email}, ${order.name}, ${order.address},
        ${order.city}, ${order.state}, ${order.zip}, ${order.last4}, ${order.brand},
        ${order.subtotal}, ${order.shipping}, ${order.tax}, ${order.total},
        ${JSON.stringify(order.lines)}
      )
    `;
    return { ok: true };
  });

async function requireAdmin(token: string) {
  const sql = await getSql();
  const rows = await sql<{ token: string }>`select token from admin_sessions where token = ${token} limit 1`;
  if (!rows[0]) throw new Error("Unauthorized");
  return sql;
}

export const adminLogin = createServerFn({ method: "POST" })
  .validator((input: { username: string; password: string }) => input)
  .handler(async ({ data }) => {
    const { adminCredentialsOk } = await import("@/lib/admin.server");
    if (!adminCredentialsOk(data.username, data.password)) {
      return { ok: false as const, error: "Wrong brand." };
    }
    const token = crypto.randomUUID();
    const sql = await getSql();
    await sql`insert into admin_sessions (token) values (${token})`;
    return { ok: true as const, token };
  });

export const adminLogout = createServerFn({ method: "POST" })
  .validator((token: string) => token)
  .handler(async ({ data: token }) => {
    const sql = await getSql();
    await sql`delete from admin_sessions where token = ${token}`;
    return { ok: true };
  });

export const adminCheck = createServerFn({ method: "POST" })
  .validator((token: string) => token)
  .handler(async ({ data: token }) => {
    try {
      await requireAdmin(token);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  });

type MemberRow = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  providers: string;
  last_seen: string | null;
};

export const pingPresence = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await sql`
      insert into member_presence (user_id, last_seen)
      values (${context.userId}, now())
      on conflict (user_id) do update set last_seen = now()
    `;
    return { ok: true };
  });

export const adminListMembers = createServerFn({ method: "POST" })
  .validator((token: string) => token)
  .handler(async ({ data: token }) => {
    const sql = await requireAdmin(token);
    return sql<MemberRow>`
      select
        u.id,
        u.name,
        u.email,
        u."createdAt" as created_at,
        p.last_seen,
        coalesce(string_agg(distinct a."providerId", ','), 'credential') as providers
      from "user" u
      left join "account" a on a."userId" = u.id
      left join member_presence p on p.user_id = u.id
      group by u.id, u.name, u.email, u."createdAt", p.last_seen
      order by p.last_seen desc nulls last, u."createdAt" desc
    `;
  });

export const adminListOrders = createServerFn({ method: "POST" })
  .validator((token: string) => token)
  .handler(async ({ data: token }) => {
    const sql = await requireAdmin(token);
    return sql<OrderRow>`
      select id, user_id, email, name, total, created_at, lines_json, state, city
      from orders
      order by created_at desc
    `;
  });

export const adminAddProduct = createServerFn({ method: "POST" })
  .validator(
    (input: {
      token: string;
      kind: "cut" | "merch";
      slug: string;
      early: boolean;
      payload: Cut | MerchItem;
    }) => input,
  )
  .handler(async ({ data }) => {
    const sql = await requireAdmin(data.token);
    await sql`
      insert into extra_products (kind, slug, early, payload)
      values (${data.kind}, ${data.slug}, ${data.early}, ${JSON.stringify(data.payload)})
      on conflict (slug) do update set
        kind = excluded.kind,
        early = excluded.early,
        payload = excluded.payload
    `;
    return { ok: true };
  });

export const adminHideProduct = createServerFn({ method: "POST" })
  .validator((input: { token: string; slug: string }) => input)
  .handler(async ({ data }) => {
    const sql = await requireAdmin(data.token);
    await sql`insert into hidden_products (slug) values (${data.slug}) on conflict (slug) do nothing`;
    return { ok: true };
  });

export const adminUnhideProduct = createServerFn({ method: "POST" })
  .validator((input: { token: string; slug: string }) => input)
  .handler(async ({ data }) => {
    const sql = await requireAdmin(data.token);
    await sql`delete from hidden_products where slug = ${data.slug}`;
    return { ok: true };
  });

export const adminAddOffer = createServerFn({ method: "POST" })
  .validator((input: { token: string; title: string; body: string }) => input)
  .handler(async ({ data }) => {
    const sql = await requireAdmin(data.token);
    await sql`insert into offers (title, body) values (${data.title}, ${data.body})`;
    return { ok: true };
  });

export const adminRemoveOffer = createServerFn({ method: "POST" })
  .validator((input: { token: string; id: number }) => input)
  .handler(async ({ data }) => {
    const sql = await requireAdmin(data.token);
    await sql`delete from offers where id = ${data.id}`;
    return { ok: true };
  });

export const adminAddNote = createServerFn({ method: "POST" })
  .validator((input: { token: string; title: string; body: string }) => input)
  .handler(async ({ data }) => {
    const sql = await requireAdmin(data.token);
    await sql`insert into drop_notes (title, body) values (${data.title}, ${data.body})`;
    return { ok: true };
  });

export const adminRemoveNote = createServerFn({ method: "POST" })
  .validator((input: { token: string; id: number }) => input)
  .handler(async ({ data }) => {
    const sql = await requireAdmin(data.token);
    await sql`delete from drop_notes where id = ${data.id}`;
    return { ok: true };
  });
