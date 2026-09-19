import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { type Cut } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useCatalog } from "@/lib/use-catalog";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function TapeTable() {
  const { user } = useCurrentUserState();
  const { cuts } = useCatalog(Boolean(user));
  return (
    <>
      <div className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-iron">
              {["Cut", "Cross", "Smell", "Flavour", "Temper", "Drop"].map((h) => (
                <th key={h} className="stamp px-4 py-4 text-sand font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cuts.map((cut) => (
              <tr key={cut.slug} className="border-b border-iron hover:bg-hat">
                <td className="px-4 py-5">
                  <Link
                    to="/cuts/$slug"
                    params={{ slug: cut.slug }}
                    className="display text-xl text-cream hover:text-fire"
                  >
                    {cut.name}
                  </Link>
                </td>
                <td className="px-4 py-5 text-sm text-ash">{cut.cross}</td>
                <td className="px-4 py-5 text-sm text-ash">{field(cut, "Smell")}</td>
                <td className="px-4 py-5 text-sm text-ash">{field(cut, "Flavour")}</td>
                <td className="px-4 py-5 text-sm text-cream">{field(cut, "Temper")}</td>
                <td className="px-4 py-5 text-sm text-ash">{field(cut, "Drop")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-iron border-y border-iron">
        {cuts.map((cut) => (
          <MobileTapeRow key={cut.slug} cut={cut} />
        ))}
      </div>
    </>
  );
}

function field(cut: Cut, label: string) {
  return cut.tape.find((t) => t.label === label)?.value ?? "—";
}

function MobileTapeRow({ cut }: { cut: Cut }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-bone">
      <button
        type="button"
        className="flex min-h-11 w-full items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          <span className="display block text-2xl">{cut.name}</span>
          <span className="stamp mt-1 block text-sand">{cut.cross}</span>
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-ash transition-transform duration-(--motion-fast)",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <div className="space-y-2 pb-5 text-sm text-ash">
          {cut.tape.map((row) => (
            <p key={row.label}>
              <span className="stamp text-sand">{row.label}</span>
              <span className="mt-1 block text-cream">{row.value}</span>
            </p>
          ))}
          <Link
            to="/cuts/$slug"
            params={{ slug: cut.slug }}
            className="ui mt-3 inline-flex min-h-11 items-center text-fire"
          >
            Open the cut
          </Link>
        </div>
      ) : null}
    </div>
  );
}
