import { useState } from "react";
import { BrandButton } from "@/components/brand-button";
import { useCart, type CartLine } from "@/lib/cart";
import { money } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function AddToBag({
  line,
  options,
  price,
}: {
  line: Omit<CartLine, "qty" | "variant" | "id" | "price"> & { variant?: string };
  options?: string[];
  price: number;
}) {
  const add = useCart((s) => s.add);
  const [option, setOption] = useState(options?.[0] ?? line.variant ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = options?.length ? option : (line.variant ?? "Standard");
  const id = `${line.kind}:${line.slug}:${variant}`;

  function onAdd() {
    add(
      {
        id,
        kind: line.kind,
        slug: line.slug,
        name: line.name,
        variant,
        price,
        image: line.image,
      },
      qty,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="space-y-4">
      {options && options.length > 0 ? (
        <div>
          <p className="stamp text-sand">Size</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {options.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setOption(item)}
                className={cn(
                  "ui press inline-flex min-h-11 min-w-11 items-center justify-center border px-3 text-sm",
                  option === item
                    ? "border-cream bg-cream text-bone"
                    : "border-iron text-cream hover:border-sand",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="stamp text-sand" htmlFor={`qty-${line.slug}`}>
            Qty
          </label>
          <input
            id={`qty-${line.slug}`}
            type="number"
            min={1}
            max={12}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
            className="mt-2 min-h-11 w-20 border border-iron bg-hat px-3 text-cream outline-none focus:border-sand"
          />
        </div>
        <BrandButton variant="fire" onClick={onAdd} className="flex-1 sm:flex-none">
          {added ? "In the bag" : `Add · ${money(price)}`}
        </BrandButton>
      </div>
    </div>
  );
}
