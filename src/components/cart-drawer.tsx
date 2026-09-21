import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useEffect } from "react";
import { cartCount, cartSubtotal, cartTotal, useCart } from "@/lib/cart";
import { money } from "@/lib/utils";
import { BrandButton, BrandLink } from "@/components/brand-button";

export function CartDrawer() {
  const lines = useCart((s) => s.lines);
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const count = cartCount(lines);
  const sub = cartSubtotal(lines);
  const total = cartTotal(lines);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60">
      <button
        type="button"
        className="absolute inset-0 bg-bone/70"
        aria-label="Close bag"
        onClick={() => setOpen(false)}
      />
      <aside
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-iron bg-bone"
        role="dialog"
        aria-modal="true"
        aria-label="Bag"
      >
        <div className="flex h-(--header-h) items-center justify-between border-b border-iron px-5">
          <p className="display text-2xl">Bag {count ? `· ${count}` : ""}</p>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-cream"
            aria-label="Close bag"
            onClick={() => setOpen(false)}
          >
            <X className="size-6" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center px-6">
            <p className="display text-3xl">Empty.</p>
            <p className="mt-3 text-sm text-ash">Flower and merch both ship from this shop.</p>
            <BrandButton variant="solid" className="mt-8" onClick={() => setOpen(false)}>
              Keep looking
            </BrandButton>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-iron">
              {lines.map((line) => (
                <li key={line.id} className="grid grid-cols-[5rem_1fr] gap-4 px-5 py-4">
                  <Link
                    to={line.kind === "cut" ? "/cuts/$slug" : "/merch/$slug"}
                    params={{ slug: line.slug }}
                    onClick={() => setOpen(false)}
                  >
                    <img src={line.image} alt="" className="aspect-square w-full object-cover" />
                  </Link>
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="display text-xl leading-tight">{line.name}</p>
                        <p className="stamp mt-1 text-sand">{line.variant}</p>
                      </div>
                      <p className="text-sm text-cream">{money(line.price * line.qty)}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-iron">
                        <button
                          type="button"
                          className="inline-flex size-10 items-center justify-center text-cream"
                          aria-label="Decrease"
                          onClick={() => setQty(line.id, line.qty - 1)}
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="w-8 text-center text-sm">{line.qty}</span>
                        <button
                          type="button"
                          className="inline-flex size-10 items-center justify-center text-cream"
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
                </li>
              ))}
            </ul>
            <div className="border-t border-iron px-5 py-5">
              <p className="flex items-center justify-between text-sm text-ash">
                <span>Subtotal</span>
                <span className="text-cream">{money(sub)}</span>
              </p>
              <p className="mt-2 flex items-center justify-between text-sm text-ash">
                <span>Est. total</span>
                <span className="text-cream">{money(total)}</span>
              </p>
              <p className="mt-2 text-legal text-ash">Tax and shipping at checkout. 21+. CA for flower.</p>
              <BrandLink
                to="/checkout"
                variant="fire"
                className="mt-5 w-full"
                onClick={() => setOpen(false)}
              >
                Checkout
              </BrandLink>
              <BrandLink
                to="/cart"
                variant="ghost"
                className="mt-3 w-full"
                onClick={() => setOpen(false)}
              >
                Review bag
              </BrandLink>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
