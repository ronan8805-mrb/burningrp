import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { cuts, getCut, searchRooms, type Room } from "@/lib/data";
import { BrandButton, BrandLink } from "@/components/brand-button";
import { cn } from "@/lib/utils";

export function Locator({
  initialQ = "",
  initialCut = "",
}: {
  initialQ?: string;
  initialCut?: string;
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState(initialQ);
  const [cut, setCut] = useState(initialCut);

  useEffect(() => {
    setQ(initialQ);
    setCut(initialCut);
  }, [initialQ, initialCut]);

  const results = useMemo(() => searchRooms(q, cut || undefined), [q, cut]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void navigate({
      to: "/find",
      search: {
        q: q.trim() || undefined,
        cut: cut || undefined,
      },
    });
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={onSubmit}
        className="grid gap-3 md:grid-cols-[1fr_14rem_auto] md:items-end"
      >
        <div>
          <label className="stamp text-sand" htmlFor="find-q">
            Dirt
          </label>
          <input
            id="find-q"
            name="q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="City, region, room"
            className="mt-2 min-h-11 w-full border border-iron bg-hat px-4 text-base text-cream placeholder:text-ash outline-none focus:border-sand"
          />
        </div>
        <div>
          <label className="stamp text-sand" htmlFor="find-cut">
            Cut
          </label>
          <select
            id="find-cut"
            name="cut"
            value={cut}
            onChange={(e) => setCut(e.target.value)}
            className="mt-2 min-h-11 w-full border border-iron bg-hat px-4 text-base text-cream outline-none focus:border-sand"
          >
            <option value="">Any cut</option>
            {cuts
              .filter((c) => c.status === "live")
              .map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <BrandButton type="submit" variant="solid" className="w-full md:w-auto">
          Search
        </BrandButton>
      </form>

      <div className="grid gap-8 lg:grid-cols-2">
        <DarkMap rooms={results} />
        {results.length === 0 ? (
          <div className="wanted bg-hat px-6 py-10">
            <h2 className="display text-3xl">Not on this dirt yet.</h2>
            <p className="mt-4 max-w-md text-ash">
              Buy it here, or join the list for the next room.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BrandLink to="/cuts" variant="solid">
                Shop
              </BrandLink>
              <BrandLink to="/list" variant="fire">
                Join the list
              </BrandLink>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-iron border border-iron">
            {results.map((room) => (
              <li key={room.id} className="bg-hat px-5 py-5">
                <p className="stamp text-sand">
                  {room.region} · {room.city}
                </p>
                <h3 className="display mt-2 text-2xl">{room.name}</h3>
                <p className="mt-2 text-sm text-ash">{room.line}</p>
                <p className="mt-3 flex flex-wrap gap-2">
                  {room.cuts.map((slug) => {
                    const named = getCut(slug);
                    if (!named) return null;
                    return (
                      <Link
                        key={slug}
                        to="/cuts/$slug"
                        params={{ slug }}
                        className="stamp min-h-11 inline-flex items-center border border-iron px-2 text-cream hover:border-sand"
                      >
                        {named.name}
                      </Link>
                    );
                  })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function DarkMap({ rooms }: { rooms: Room[] }) {
  const pins = rooms.slice(0, 12);
  return (
    <div className="relative overflow-hidden border border-iron bg-bone">
      <p className="stamp absolute top-3 left-3 z-10 text-sand">The dirt</p>
      <svg viewBox="0 0 400 280" className="h-56 w-full md:h-72" aria-hidden="true">
        <rect width="400" height="280" className="fill-bone" />
        <path
          d="M40 210 C80 170 90 120 130 110 C170 98 190 70 230 80 C280 94 310 60 350 78 C360 130 340 190 300 220 C240 250 140 250 40 210Z"
          className="fill-hat stroke-iron"
          strokeWidth="1.2"
        />
        <path
          d="M150 130 C180 120 210 128 240 150 C220 180 180 190 150 170 Z"
          className="fill-iron/40 stroke-sand/70"
          strokeWidth="0.6"
        />
        <text x="188" y="158" className="fill-ash" fontSize="9" fontFamily="Barlow Condensed">
          SFV
        </text>
        <text x="210" y="200" className="fill-ash" fontSize="9" fontFamily="Barlow Condensed">
          LA
        </text>
        {pins.map((room, i) => {
          const x = 120 + ((i * 47) % 200);
          const y = 100 + ((i * 31) % 110);
          return (
            <g key={room.id}>
              <circle cx={x} cy={y} r="4" className="fill-fire" />
              <circle cx={x} cy={y} r="9" className="fill-none stroke-fire/40" />
            </g>
          );
        })}
      </svg>
      <p className={cn("px-4 py-3 text-legal text-ash", pins.length === 0 && "opacity-70")}>
        {pins.length
          ? `${pins.length} room${pins.length === 1 ? "" : "s"} on this map.`
          : "No pins on this search."}
      </p>
    </div>
  );
}
