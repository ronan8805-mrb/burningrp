import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { BrandLink } from "@/components/brand-button";
import {
  cartCount,
  cartShipping,
  cartSubtotal,
  cartTax,
  cartTotal,
  hasCannabis,
  useCart,
} from "@/lib/cart";
import { money } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Bag — Burning Rope Pharms" }],
  }),
  component: CartPage,
});

function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const count = cartCount(lines);

  if (lines.length === 0) {
    return (
      <main className="page-pad mx-auto flex min-h-[60svh] max-w-[1440px] flex-col justify-center py-24">
        <p className="stamp text-sand">Bag</p>
        <h1 className="display mt-3 text-display">Nothing in the bag.</h1>
        <p className="mt-4 max-w-md text-ash">Flower from the rooms. Merch from the barn.</p>
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

  return (
    <main className="page-pad mx-auto max-w-[1440px] py-14">
      <p className="stamp text-sand">Bag</p>
      <h1 className="display mt-3 text-display">Your bag · {count}</h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
        <ul className="divide-y divide-iron border-y border-iron">
          {lines.map((line) => (
            <li key={line.id} className="grid grid-cols-[6.5rem_1fr] gap-5 py-6 sm:grid-cols-[8rem_1fr]">
              <Link
                to={line.kind === "cut" ? "/cuts/$slug" : "/merch/$slug"}
                params={{ slug: line.slug }}
              >
                <img src={line.image} alt="" className="aspect-square w-full object-cover" />
              </Link>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <p className="display text-2xl">{line.name}</p>
                  <p className="stamp mt-1 text-sand">{line.variant}</p>
                  <p className="mt-2 text-sm text-ash">{money(line.price)} each</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center border border-iron">
                      <button
                        type="button"
                        className="inline-flex size-10 items-center justify-center"
                        aria-label="Decrease"
                        onClick={() => setQty(line.id, line.qty - 1)}
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="w-8 text-center text-sm">{line.qty}</span>
                      <button
                        type="button"
                        className="inline-flex size-10 items-center justify-center"
                        aria-label="Increase"
                        onClick={() => setQty(line.id, line.qty + 1)}
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="stamp text-ash hover:text-fire"
                      onClick={() => remove(line.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="text-cream">{money(line.price * line.qty)}</p>
              </div>
            </li>
          ))}
        </ul>
        <aside className="border border-iron bg-hat p-6 h-fit">
          <p className="stamp text-sand">Summary</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ash">Subtotal</dt>
              <dd>{money(cartSubtotal(lines))}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ash">Shipping</dt>
              <dd>{cartShipping(lines) === 0 ? "Free" : money(cartShipping(lines))}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ash">Tax</dt>
              <dd>{money(cartTax(lines))}</dd>
            </div>
            <div className="flex justify-between border-t border-iron pt-3 text-base">
              <dt>Total</dt>
              <dd>{money(cartTotal(lines))}</dd>
            </div>
          </dl>
          {hasCannabis(lines) ? (
            <p className="mt-4 text-legal text-ash">
              This bag has cannabis. Flower ships to California only. 21+ with ID at the door.
            </p>
          ) : (
            <p className="mt-4 text-legal text-ash">Merch ships in the US. Free over $200.</p>
          )}
          <BrandLink to="/checkout" variant="fire" className="mt-6 w-full">
            Checkout
          </BrandLink>
        </aside>
      </div>
    </main>
  );
}
