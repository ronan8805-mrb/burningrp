import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { BrandButton, BrandLink } from "@/components/brand-button";
import {
  cartShipping,
  cartSubtotal,
  cartTax,
  cartTotal,
  hasCannabis,
  useCart,
  type CartLine,
} from "@/lib/cart";
import { ORDER_KEY, US_STATES } from "@/lib/data";
import {
  brandFromNumber,
  brandLabel,
  chargeCard,
  formatCardNumber,
  formatExpiry,
  orderId,
} from "@/lib/pay";
import { money } from "@/lib/utils";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { recordGuestOrder, recordOrder } from "@/lib/shop";

type CheckoutSearch = {
  ok?: string;
};

export type SavedOrder = {
  id: string;
  auth: string;
  at: number;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  last4: string;
  brand: string;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): CheckoutSearch => ({
    ok: typeof search.ok === "string" ? search.ok : undefined,
  }),
  head: () => ({
    meta: [{ title: "Checkout — Burning Rope Pharms" }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { ok } = Route.useSearch();
  if (ok === "1") return <OrderDone />;
  return <CheckoutForm />;
}

function OrderDone() {
  const order = useMemo(() => {
    try {
      const raw = localStorage.getItem(ORDER_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as SavedOrder;
    } catch {
      return null;
    }
  }, []);

  if (!order) {
    return (
      <main className="page-pad mx-auto max-w-xl py-24">
        <p className="stamp text-sand">Checkout</p>
        <h1 className="display mt-3 text-display">No order on file.</h1>
        <BrandLink to="/cuts" variant="solid" className="mt-8">
          Shop the cuts
        </BrandLink>
      </main>
    );
  }

  return (
    <main className="page-pad mx-auto max-w-3xl py-16">
      <p className="stamp text-fire">Paid</p>
      <h1 className="display mt-3 text-display">Order {order.id}</h1>
      <p className="mt-4 max-w-xl text-ash">
        Charged to {order.brand} ···· {order.last4}. Auth {order.auth}. A receipt goes to {order.email}.
      </p>

      <div className="mt-10 border border-iron">
        <div className="border-b border-iron bg-hat px-5 py-4">
          <p className="stamp text-sand">Ships to</p>
          <p className="mt-2 text-cream">
            {order.name}
            <br />
            {order.address}
            <br />
            {order.city}, {order.state} {order.zip}
          </p>
        </div>
        <ul className="divide-y divide-iron">
          {order.lines.map((line) => (
            <li key={line.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <span>
                <span className="block text-cream">{line.name}</span>
                <span className="stamp text-sand">
                  {line.variant} · ×{line.qty}
                </span>
              </span>
              <span className="text-sm">{money(line.price * line.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-2 border-t border-iron px-5 py-4 text-sm">
          <div className="flex justify-between text-ash">
            <dt>Subtotal</dt>
            <dd>{money(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between text-ash">
            <dt>Shipping</dt>
            <dd>{order.shipping === 0 ? "Free" : money(order.shipping)}</dd>
          </div>
          <div className="flex justify-between text-ash">
            <dt>Tax</dt>
            <dd>{money(order.tax)}</dd>
          </div>
          <div className="flex justify-between pt-2 text-base text-cream">
            <dt>Total</dt>
            <dd>{money(order.total)}</dd>
          </div>
        </dl>
      </div>

      <p className="mt-6 text-legal text-ash">
        Simulated payment. No live charge was sent to a processor. 21+ adult-use.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <BrandLink to="/cuts" variant="solid">
          The Cuts
        </BrandLink>
        <BrandLink to="/merch" variant="ghost">
          Merch
        </BrandLink>
      </div>
    </main>
  );
}

function CheckoutForm() {
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const navigate = Route.useNavigate();
  const user = useCurrentUser();
  const flower = hasCannabis(lines);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(flower ? "CA" : "CA");
  const [zip, setZip] = useState("");
  const [cardName, setCardName] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [age, setAge] = useState(false);
  const [sameName, setSameName] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"form" | "auth">("form");

  const brand = brandFromNumber(number);
  const sub = cartSubtotal(lines);
  const ship = cartShipping(lines);
  const tax = cartTax(lines);
  const total = cartTotal(lines);

  if (lines.length === 0) {
    return (
      <main className="page-pad mx-auto max-w-xl py-24">
        <p className="stamp text-sand">Checkout</p>
        <h1 className="display mt-3 text-display">Bag is empty.</h1>
        <BrandLink to="/cuts" variant="solid" className="mt-8">
          Shop the cuts
        </BrandLink>
      </main>
    );
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !address.trim() || !city.trim() || !zip.trim()) {
      setError("Fill shipping — name, email, street, city, zip.");
      return;
    }
    if (!/^\d{5}(-\d{4})?$/.test(zip.trim())) {
      setError("Use a 5-digit ZIP.");
      return;
    }
    if (flower && state !== "CA") {
      setError("Flower ships to California only. Change the state or remove cannabis from the bag.");
      return;
    }
    if (!age) {
      setError("Confirm you are 21 or older.");
      return;
    }
    const charged = chargeCard({
      number,
      expiry,
      cvc,
      name: sameName ? name : cardName,
    });
    if (!charged.ok) {
      setError(charged.error);
      return;
    }

    setBusy(true);
    setStep("auth");
    window.setTimeout(() => {
      const order: SavedOrder = {
        id: orderId(),
        auth: charged.auth,
        at: Date.now(),
        name: name.trim(),
        email: email.trim(),
        address: address.trim(),
        city: city.trim(),
        state,
        zip: zip.trim(),
        last4: charged.last4,
        brand: brandLabel(charged.brand),
        lines,
        subtotal: sub,
        shipping: ship,
        tax,
        total,
      };
      try {
        localStorage.setItem(ORDER_KEY, JSON.stringify(order));
      } catch {
        /* ignore */
      }
      const payload = {
        id: order.id,
        email: order.email,
        name: order.name,
        address: order.address,
        city: order.city,
        state: order.state,
        zip: order.zip,
        last4: order.last4,
        brand: order.brand,
        subtotal: order.subtotal,
        shipping: order.shipping,
        tax: order.tax,
        total: order.total,
        lines: order.lines,
      };
      const save = user ? recordOrder({ data: payload }) : recordGuestOrder({ data: payload });
      void save.catch(() => undefined);
      clear();
      void navigate({ to: "/checkout", search: { ok: "1" } });
    }, 1400);
  }

  if (step === "auth") {
    return (
      <main className="page-pad mx-auto flex min-h-[60svh] max-w-lg flex-col justify-center py-24 text-center">
        <p className="stamp text-sand">Processor</p>
        <h1 className="display mt-3 text-display">Authorizing…</h1>
        <p className="mt-4 text-ash">
          {brandLabel(brand)} ···· {number.replace(/\D/g, "").slice(-4) || "••••"} · {money(total)}
        </p>
        <div className="mx-auto mt-8 h-1 w-48 overflow-hidden bg-iron">
          <div className="h-full w-1/2 animate-pulse bg-fire" />
        </div>
      </main>
    );
  }

  const field =
    "min-h-11 w-full border border-iron bg-hat px-4 text-cream placeholder:text-ash outline-none focus:border-sand";

  return (
    <main className="page-pad mx-auto max-w-[1440px] py-14">
      <p className="stamp text-sand">Checkout</p>
      <h1 className="display mt-3 text-display">Pay</h1>
      <p className="mt-4 max-w-xl text-ash">
        {flower
          ? "This bag includes cannabis. California shipping only. 21+ with ID."
          : "Merch ships in the US. 21+."}
      </p>

      <form onSubmit={onSubmit} className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]" noValidate>
        <div className="space-y-10">
          <section>
            <h2 className="display text-3xl">Ship to</h2>
            <div className="mt-6 grid gap-3">
              <input className={field} name="name" autoComplete="name" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
              <input className={field} name="email" type="email" autoComplete="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className={field} name="tel" type="tel" autoComplete="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input className={field} name="address" autoComplete="street-address" placeholder="Street address" value={address} onChange={(e) => setAddress(e.target.value)} />
              <div className="grid gap-3 sm:grid-cols-[1fr_6rem_8rem]">
                <input className={field} name="city" autoComplete="address-level2" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                <select
                  className={field}
                  name="state"
                  autoComplete="address-level1"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  {US_STATES.map((s) => (
                    <option key={s} value={s} disabled={flower && s !== "CA"}>
                      {s}
                    </option>
                  ))}
                </select>
                <input className={field} name="zip" autoComplete="postal-code" placeholder="ZIP" value={zip} onChange={(e) => setZip(e.target.value)} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="display text-3xl">Payment</h2>
            <p className="mt-3 text-sm text-ash">
              Simulated charge. Use <span className="text-cream">4242 4242 4242 4242</span>, any future expiry, any CVC.
              Decline: <span className="text-cream">4000 0000 0000 0002</span>.
            </p>
            <div className="mt-6 overflow-hidden border border-iron bg-hat">
              <div className="flex items-center justify-between border-b border-iron px-5 py-3">
                <p className="stamp text-sand">Card</p>
                <p className="stamp text-cream">{number ? brandLabel(brand) : "Visa · MC · Amex"}</p>
              </div>
              <div className="grid gap-3 p-5">
                <label className="sr-only" htmlFor="cc-number">
                  Card number
                </label>
                <input
                  id="cc-number"
                  className={field}
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="Card number"
                  value={number}
                  onChange={(e) => setNumber(formatCardNumber(e.target.value))}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className={field}
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  />
                  <input
                    className={field}
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder={brand === "amex" ? "CID" : "CVC"}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, brand === "amex" ? 4 : 3))}
                  />
                </div>
                <label className="flex min-h-11 items-center gap-3 text-sm text-ash">
                  <input
                    type="checkbox"
                    checked={sameName}
                    onChange={(e) => setSameName(e.target.checked)}
                    className="size-4 accent-fire"
                  />
                  Name on card matches shipping
                </label>
                {sameName ? null : (
                  <input
                    className={field}
                    autoComplete="cc-name"
                    placeholder="Name on card"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                )}
              </div>
            </div>
          </section>

          <label className="flex items-start gap-3 text-sm text-ash">
            <input
              type="checkbox"
              checked={age}
              onChange={(e) => setAge(e.target.checked)}
              className="mt-1 size-4 accent-fire"
            />
            I am 21 or older. If this bag has cannabis, I am buying adult-use flower for delivery in California.
          </label>

          {error ? (
            <p className="border-l-2 border-fire bg-hat px-4 py-3 text-sm text-cream" role="alert">
              {error}
            </p>
          ) : null}

          <BrandButton type="submit" variant="fire" disabled={busy} className="w-full sm:w-auto">
            Pay {money(total)}
          </BrandButton>
        </div>

        <aside className="h-fit border border-iron bg-hat p-6">
          <p className="stamp text-sand">Order</p>
          <ul className="mt-4 divide-y divide-iron">
            {lines.map((line) => (
              <li key={line.id} className="flex gap-3 py-3">
                <img src={line.image} alt="" className="size-14 object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-cream">{line.name}</p>
                  <p className="stamp text-sand">
                    {line.variant} · ×{line.qty}
                  </p>
                </div>
                <p className="text-sm">{money(line.price * line.qty)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-iron pt-4 text-sm">
            <div className="flex justify-between text-ash">
              <dt>Subtotal</dt>
              <dd>{money(sub)}</dd>
            </div>
            <div className="flex justify-between text-ash">
              <dt>Shipping</dt>
              <dd>{ship === 0 ? "Free" : money(ship)}</dd>
            </div>
            <div className="flex justify-between text-ash">
              <dt>Tax (10.25%)</dt>
              <dd>{money(tax)}</dd>
            </div>
            <div className="flex justify-between pt-2 text-base text-cream">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>
          <Link to="/cart" className="stamp mt-5 inline-flex min-h-11 items-center text-sand hover:text-cream">
            Edit bag
          </Link>
        </aside>
      </form>
    </main>
  );
}
