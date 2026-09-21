export type FormatId = "flower" | "bags" | "jars";

export type CutFormat = {
  id: FormatId;
  label: string;
  price: number;
};

export type GalleryShot = {
  src: string;
  alt: string;
};

export type TapeField = {
  label: string;
  value: string;
};

export type Cut = {
  slug: string;
  name: string;
  cross: string;
  line: string;
  myth: string;
  nose: string;
  smoke: string;
  warning: string;
  theme: "western" | "toadz";
  status: "live" | "tba";
  soldOut?: boolean;
  formats: CutFormat[];
  hero: string;
  heroPortrait?: string;
  card: string;
  gallery: GalleryShot[];
  tape: TapeField[];
};

export type Room = {
  id: string;
  name: string;
  city: string;
  region: "SFV" | "Los Angeles" | "California";
  neighborhood: string;
  cuts: string[];
  line: string;
};

export type MerchItem = {
  slug: string;
  name: string;
  kind: "wear" | "iron" | "paper";
  line: string;
  blurb: string;
  image: string;
  gallery?: GalleryShot[];
  price: number;
  soldOut?: boolean;
  sizes?: string[];
};

export const FORMAT_FILTERS: { id: "all" | FormatId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "jars", label: "Jars" },
];

export const MERCH_FILTERS: { id: "all" | MerchItem["kind"]; label: string }[] = [
  { id: "all", label: "All" },
  { id: "wear", label: "Wear" },
  { id: "iron", label: "Iron" },
];

export const TEE_SIZES = ["S", "M", "L", "XL", "XXL"];
export const BOOT_SIZES = ["8", "9", "10", "11", "12", "13"];

export const cuts: Cut[] = [
  {
    slug: "zestperado",
    name: "ZESTPERADO",
    cross: "GELONADE × ZBX1",
    line: "3.5g - 7g",
    myth: "Gelonade crossed to ZBX1. Citrus rind, candy gas, canyon heat. Cowboy Grown. Indoor. Single source. The jar is the cut.",
    nose: "Lemon-lime zest, candy peel, a little fuel.",
    smoke: "Bright on the pull. Gas on the leave. Named for the nose.",
    warning: "Loud citrus. Not a quiet dessert.",
    theme: "western",
    status: "live",
    formats: [
      { id: "jars", label: "3.5g", price: 5200 },
      { id: "jars", label: "7g", price: 9600 },
    ],
    hero: "/images/zestperado-jar.jpg",
    heroPortrait: "/images/zestperado-jar.jpg",
    card: "/images/zestperado-jar.jpg",
    gallery: [
      { src: "/images/zestperado-jar.jpg", alt: "ZESTPERADO jar — Gelonade × ZBX1, Cowboy Grown" },
      { src: "/images/zestperado-art.jpg", alt: "ZESTPERADO desert label art, cactus and citrus on fire" },
      { src: "/images/zestperado-skull.jpg", alt: "ZESTPERADO skull in a hat, revolver and burning citrus" },
    ],
    tape: [
      { label: "Room", value: "Indoor · single source" },
      { label: "Cut", value: "GELONADE × ZBX1" },
      { label: "Drop", value: "3.5g - 7g" },
      { label: "Cure", value: "Cold" },
      { label: "Temper", value: "Zest-mean" },
      { label: "Smell", value: "Lemon-lime zest, candy gas" },
      { label: "Flavour", value: "Bright pull, gas leave" },
    ],
  },
  {
    slug: "zfuel",
    name: "Z FUEL",
    cross: "Z × ROPE FUEL",
    line: "3.5g - 7g",
    myth: "Z crossed to Rope Fuel. Candy gas, cold cubes, a desert in color. Cowboy Grown. Indoor. Single source. The jar is the cut.",
    nose: "Candy gas first. Cold fuel. A little color on the back.",
    smoke: "Sweet pull, heavy leave. Named for the tank.",
    warning: "Loud gas. Not a quiet ride.",
    theme: "western",
    status: "live",
    formats: [
      { id: "jars", label: "3.5g", price: 5400 },
      { id: "jars", label: "7g", price: 9800 },
    ],
    hero: "/images/zfuel-jar.jpg",
    heroPortrait: "/images/zfuel-jar.jpg",
    card: "/images/zfuel-jar.jpg",
    gallery: [
      { src: "/images/zfuel-jar.jpg", alt: "Z FUEL jar — Z × Rope Fuel, Cowboy Grown" },
      { src: "/images/zfuel-art.jpg", alt: "Z FUEL label art, race car on a rainbow desert road" },
      { src: "/images/zfuel-skull.jpg", alt: "Z FUEL skull in a hat, ice cubes and cigar" },
    ],
    tape: [
      { label: "Room", value: "Indoor · single source" },
      { label: "Cut", value: "Z × ROPE FUEL" },
      { label: "Drop", value: "3.5g - 7g" },
      { label: "Cure", value: "Cold" },
      { label: "Temper", value: "Fuel-mean" },
      { label: "Smell", value: "Candy gas, cold fuel" },
      { label: "Flavour", value: "Sweet pull, heavy leave" },
    ],
  },
  {
    slug: "zog",
    name: "ZOG",
    cross: "ZKITTLEZ × BLUE FLAME OG",
    line: "3.5g - 7g",
    myth: "Zkittlez crossed to Blue Flame OG. Candy on the front, diesel on the leave. Cowboy Grown. Indoor. Single source. The jar is the cut.",
    nose: "Candy first, then blue flame, then dry canyon air.",
    smoke: "Oil ring by the halfway mark. Sweet pull, fuel finish.",
    warning: "Loud candy. Named for the nose.",
    theme: "western",
    status: "live",
    formats: [
      { id: "jars", label: "3.5g", price: 5000 },
      { id: "jars", label: "7g", price: 9200 },
    ],
    hero: "/images/zog-jar.jpg",
    heroPortrait: "/images/zog-jar.jpg",
    card: "/images/zog-jar.jpg",
    gallery: [
      { src: "/images/zog-jar.jpg", alt: "ZOG jar — Zkittlez × Blue Flame OG, Cowboy Grown" },
      { src: "/images/zog-art.jpg", alt: "ZOG desert label art, cactus and blue-flame candy" },
      { src: "/images/zog-skull.jpg", alt: "ZOG skull in a gas mask, rifle and burning Zs" },
    ],
    tape: [
      { label: "Room", value: "Indoor · single source" },
      { label: "Cut", value: "ZKITTLEZ × BLUE FLAME OG" },
      { label: "Drop", value: "3.5g - 7g" },
      { label: "Cure", value: "Cold" },
      { label: "Temper", value: "Mean-sweet" },
      { label: "Smell", value: "Candy, blue flame" },
      { label: "Flavour", value: "Sweet pull, fuel finish" },
    ],
  },
  {
    slug: "keylimez",
    name: "KEYLIMEZ",
    cross: "GELONADE × ZBX1",
    line: "3.5g - 7g",
    myth: "Gelonade crossed to ZBX1. Key lime, pie crust, canyon heat. Cowboy Grown. Indoor. Single source. The jar is the cut.",
    nose: "Key lime first. Sweet cream. A little gas on the back.",
    smoke: "Tart pull, candy leave. Named for the pie.",
    warning: "Loud lime. Not a quiet dessert.",
    theme: "western",
    status: "live",
    formats: [
      { id: "jars", label: "3.5g", price: 5200 },
      { id: "jars", label: "7g", price: 9600 },
    ],
    hero: "/images/keylimez-jar.jpg",
    heroPortrait: "/images/keylimez-jar.jpg",
    card: "/images/keylimez-jar.jpg",
    gallery: [
      { src: "/images/keylimez-jar.jpg", alt: "KEYLIMEZ jar — Gelonade × ZBX1, Cowboy Grown" },
      { src: "/images/keylimez-art.jpg", alt: "KEYLIMEZ desert label art, key lime pie on fire" },
      { src: "/images/keylimez-skull.jpg", alt: "KEYLIMEZ skull in a hat, pie and a lime shake" },
    ],
    tape: [
      { label: "Room", value: "Indoor · single source" },
      { label: "Cut", value: "GELONADE × ZBX1" },
      { label: "Drop", value: "3.5g - 7g" },
      { label: "Cure", value: "Cold" },
      { label: "Temper", value: "Lime-mean" },
      { label: "Smell", value: "Key lime, sweet cream" },
      { label: "Flavour", value: "Tart pull, candy leave" },
    ],
  },
  {
    slug: "zuma",
    name: "ZUMA",
    cross: "HOUSE CUT",
    line: "3.5g - 7g",
    myth: "Desert swell. Salt air, cactus, a wave that should not be there. Cowboy Grown. Indoor. Single source. The jar is the cut.",
    nose: "Salt and pine. A little sweet cream on the back.",
    smoke: "Clean pull, ocean finish. Named for the break.",
    warning: "Loud ocean. Not a fuel cut.",
    theme: "western",
    status: "live",
    formats: [
      { id: "jars", label: "3.5g", price: 5300 },
      { id: "jars", label: "7g", price: 9700 },
    ],
    hero: "/images/zuma-jar.jpg",
    heroPortrait: "/images/zuma-jar.jpg",
    card: "/images/zuma-jar.jpg",
    gallery: [
      { src: "/images/zuma-jar.jpg", alt: "ZUMA jar — Cowboy Grown, desert swell" },
      { src: "/images/zuma-art.jpg", alt: "ZUMA label art, surfer in a desert wave" },
      { src: "/images/zuma-skull.jpg", alt: "ZUMA skull in a hat with a Burning Rope surfboard" },
    ],
    tape: [
      { label: "Room", value: "Indoor · single source" },
      { label: "Cut", value: "HOUSE CUT" },
      { label: "Drop", value: "3.5g - 7g" },
      { label: "Cure", value: "Cold" },
      { label: "Temper", value: "Tide-mean" },
      { label: "Smell", value: "Salt and pine" },
      { label: "Flavour", value: "Clean pull, ocean finish" },
    ],
  },
  {
    slug: "zazooka",
    name: "ZAZOOKA",
    cross: "Z × ZOOKS",
    line: "3.5g - 7g",
    myth: "Z crossed to Zooks. Candy gas, canyon fire, a heavy round. Cowboy Grown. Indoor. Single source. The jar is the cut.",
    nose: "Candy gas first. Fuel in the middle. Dry canyon on the leave.",
    smoke: "Sweet pull, heavy leave. Named for the round.",
    warning: "Loud gas. Not a quiet cut.",
    theme: "western",
    status: "live",
    formats: [
      { id: "jars", label: "3.5g", price: 5400 },
      { id: "jars", label: "7g", price: 9800 },
    ],
    hero: "/images/zazooka-jar.jpg",
    heroPortrait: "/images/zazooka-jar.jpg",
    card: "/images/zazooka-jar.jpg",
    gallery: [
      { src: "/images/zazooka-jar.jpg", alt: "ZAZOOKA jar — Z × Zooks, Cowboy Grown" },
    ],
    tape: [
      { label: "Room", value: "Indoor · single source" },
      { label: "Cut", value: "Z × ZOOKS" },
      { label: "Drop", value: "3.5g - 7g" },
      { label: "Cure", value: "Cold" },
      { label: "Temper", value: "Round-mean" },
      { label: "Smell", value: "Candy gas, canyon" },
      { label: "Flavour", value: "Sweet pull, heavy leave" },
    ],
  },
];

export const rooms: Room[] = [
  {
    id: "dust-room",
    name: "The Dust Room",
    city: "Van Nuys",
    region: "SFV",
    neighborhood: "Van Nuys",
    cuts: ["zestperado", "zfuel", "keylimez", "zuma", "zazooka", "zog"],
    line: "First Valley room. Indoor.",
  },
  {
    id: "canyon-iron",
    name: "Canyon Iron",
    city: "Chatsworth",
    region: "SFV",
    neighborhood: "Chatsworth",
    cuts: ["zestperado", "zfuel", "keylimez", "zuma", "zazooka", "zog"],
    line: "Canyon edge. Full roster.",
  },
  {
    id: "north-brand",
    name: "North Brand",
    city: "North Hollywood",
    region: "SFV",
    neighborhood: "North Hollywood",
    cuts: ["zestperado", "zfuel", "keylimez", "zuma", "zazooka", "zog"],
    line: "NoHo. The jars.",
  },
  {
    id: "valley-rope",
    name: "Valley Rope",
    city: "Reseda",
    region: "SFV",
    neighborhood: "Reseda",
    cuts: ["zestperado", "zfuel", "keylimez", "zuma", "zazooka", "zog"],
    line: "Reseda indoor.",
  },
  {
    id: "stage-door",
    name: "Stage Door",
    city: "Hollywood",
    region: "Los Angeles",
    neighborhood: "Hollywood",
    cuts: ["zestperado", "zfuel", "keylimez", "zuma", "zazooka"],
    line: "Hollywood. Selected cuts.",
  },
  {
    id: "night-brand",
    name: "Night Brand",
    city: "Downtown Los Angeles",
    region: "Los Angeles",
    neighborhood: "Downtown",
    cuts: ["zestperado", "zfuel", "keylimez", "zuma", "zazooka", "zog"],
    line: "Downtown. After dark hours.",
  },
  {
    id: "west-dirt",
    name: "West Dirt",
    city: "Santa Monica",
    region: "Los Angeles",
    neighborhood: "Santa Monica",
    cuts: ["zestperado", "zfuel", "keylimez", "zuma", "zazooka"],
    line: "Westside. The jars.",
  },
  {
    id: "harbor-iron",
    name: "Harbor Iron",
    city: "Long Beach",
    region: "Los Angeles",
    neighborhood: "Long Beach",
    cuts: ["zestperado", "zfuel", "keylimez", "zuma", "zazooka", "zog"],
    line: "Harbor. Citrus and gas.",
  },
  {
    id: "culver-grounds",
    name: "Culver Grounds",
    city: "Culver City",
    region: "Los Angeles",
    neighborhood: "Culver City",
    cuts: ["zestperado", "zfuel", "keylimez", "zuma", "zazooka", "zog"],
    line: "Culver. The jar and ZOG.",
  },
  {
    id: "pacific-rope",
    name: "Pacific Rope",
    city: "San Diego",
    region: "California",
    neighborhood: "San Diego",
    cuts: ["zestperado", "zfuel", "keylimez", "zuma", "zazooka", "zog"],
    line: "San Diego indoor.",
  },
  {
    id: "oak-brand",
    name: "Oak Brand",
    city: "Oakland",
    region: "California",
    neighborhood: "Oakland",
    cuts: ["zestperado", "zfuel", "keylimez", "zuma", "zazooka"],
    line: "East Bay. The jars.",
  },
  {
    id: "bay-iron",
    name: "Bay Iron",
    city: "San Francisco",
    region: "California",
    neighborhood: "San Francisco",
    cuts: ["zestperado", "zfuel", "keylimez", "zuma", "zazooka", "zog"],
    line: "The city. ZESTPERADO and ZOG.",
  },
];

export const merch: MerchItem[] = [
  {
    slug: "banknote-outlaw",
    name: "The Banknote Outlaw",
    kind: "wear",
    line: "Engraved Treasury Tee",
    blurb:
      "A vintage mineral-washed green/slate t-shirt styled like an 1800s Wild West banknote. It features an outlaw skeleton crest and \"100\" denomination mark on the front chest, with a full-back steel-engraved illustration of a smoking cowboy skeleton holding a lasso.",
    image: "/images/merch-banknote.jpg",
    gallery: [
      { src: "/images/merch-banknote-front.jpg", alt: "The Banknote Outlaw — front" },
      { src: "/images/merch-banknote-back.jpg", alt: "The Banknote Outlaw — back" },
    ],
    price: 5800,
    sizes: TEE_SIZES,
  },
  {
    slug: "keylimez-tee",
    name: "KEYLIME Z",
    kind: "wear",
    line: "Strain Tee",
    blurb:
      "An olive-drab boxy tee showcasing vibrant, Acid-Western comic art on the front. It features a mustache-wearing cowboy skeleton smoking a joint and holding a key lime smoothie against a desert mesa backdrop with \"KEYLIME Z\" typography.",
    image: "/images/merch-keylimez-tee.jpg",
    gallery: [
      { src: "/images/merch-keylimez-tee-front.jpg", alt: "KEYLIME Z tee — front" },
      { src: "/images/merch-keylimez-tee-label.jpg", alt: "KEYLIME Z tee — house label" },
    ],
    price: 4800,
    sizes: TEE_SIZES,
  },
  {
    slug: "zazooka-tee",
    name: "ZAZOOKA",
    kind: "wear",
    line: "Heavy Artillery Tee",
    blurb:
      "A dark acid-washed black tee with a dramatic full-front graphic. It displays a cowboy skeleton slinging a massive rocket launcher over its shoulder set against a trippy desert sky with flaming \"Z\" orbs and \"ZAZOOKA\" header text.",
    image: "/images/merch-zazooka-tee.jpg",
    gallery: [
      { src: "/images/merch-zazooka-tee-front.jpg", alt: "ZAZOOKA tee — front" },
    ],
    price: 4800,
    sizes: TEE_SIZES,
  },
  {
    slug: "core-outlaw",
    name: "The Core Outlaw",
    kind: "wear",
    line: "Black beaver felt cowboy hat",
    blurb:
      "A premium deep-black beaver felt cowboy hat featuring a sleek teardrop crown, a slim brown leather hatband with a custom brass skeleton emblem, and a luxury black silk interior lining printed with the full brand logo.",
    image: "/images/merch-core-hat.jpg",
    price: 28500,
  },
  {
    slug: "desperado-grinder",
    name: "The Desperado Six-Shooter",
    kind: "iron",
    line: "Cylinder grinder",
    blurb:
      "A heavy-duty, 63mm 4-piece gunmetal aluminum grinder featuring a top lid sculpted like a 6-chamber revolver cylinder with inlaid brass cartridge heads, a \"COWBOY GROWN\" center skull badge, curved diamond teeth, and a custom cactus pollen scraper.",
    image: "/images/merch-grinder.jpg",
    price: 8500,
  },
  {
    slug: "outlaws-grip",
    name: "The Outlaw's Grip",
    kind: "iron",
    line: "Skeletal hand ashtray",
    blurb:
      "A heavy ceramic ash bowl wrapped in a bone-white 3D-sculpted skeletal hand holding a smoldering ceramic cigar snuffer, detailed with rope filigree along the rim and stamped \"COWBOY GROWN\" on the base.",
    image: "/images/merch-ashtray.jpg",
    price: 9500,
  },
  {
    slug: "desperado-holster",
    name: "The Desperado Holster",
    kind: "iron",
    line: "Tool-leather case",
    blurb:
      "A full-grain vegetable-tanned saddle leather holster with brass rivets, built-in slots for two joint tubes, a Zippo-style lighter, and a poker, complete with an embossed skeleton outlaw seal and a steel belt clip.",
    image: "/images/merch-holster.jpg",
    price: 14500,
  },
  {
    slug: "acid-dune-tray",
    name: "Acid Dune",
    kind: "iron",
    line: "Live-edge wood & epoxy rolling tray",
    blurb:
      "A handcrafted live-edge walnut rolling tray with poured neon-lime and desert-orange epoxy channels, precision CNC-milled utility cutouts for your grinder and accessories, and \"IN ROPE WE TRUST\" laser-etched on the wood.",
    image: "/images/merch-tray.jpg",
    price: 22000,
  },
  {
    slug: "outlaw-arsenal",
    name: "Outlaw Arsenal",
    kind: "wear",
    line: "4-piece pin collection",
    blurb:
      "A set of four enamel lapel pins—including the Zazooka rocket launcher, a gold-plated skeleton outlaw head, a UV-reactive neon saguaro cactus, and a shiny logo pin—mounted on a Wild West ammo box kraft backer card.",
    image: "/images/merch-pins.jpg",
    price: 4200,
  },
  {
    slug: "outlaw-zippo",
    name: "Outlaw Zippo",
    kind: "iron",
    line: "Antique brass",
    blurb:
      "A solid brass flip-top lighter with a heavy hand-antiqued patina, deep 3D-engraved skeleton cowboy on the front, desert canyon horizon on the back, side flame filigree, and a serial-numbered bottom hallmark.",
    image: "/images/merch-zippo.jpg",
    gallery: [
      { src: "/images/merch-zippo-lit.jpg", alt: "Outlaw Zippo — open flame" },
    ],
    price: 7500,
  },
];

export const festival = {
  title: "Rope Burn",
  spoken: "the Rodeo",
  place: "the Burning Grounds",
  where: "The Burning Grounds. Daytime in, nighttime out. No camping.",
  when: "October 26–27 · two days · 21+",
  creed: "A two-day, 21+ cannabis expo. Cowboy Grown. Limited. Physical. Serious about flower. Trade-and-culture floor first.",
  days: [
    {
      id: "one",
      name: "October 26 — Day one",
      hours: "Doors to evening",
      line: "Vendor Row, buyer hours, Main Stage. Evening at the Saloon and the Arena.",
    },
    {
      id: "two",
      name: "October 27 — Day two",
      hours: "Expo to close-out",
      line: "Floor, featured activations, close-out, load-out. Guests leave the Grounds at close.",
    },
  ],
  zones: [
    { name: "Vendor Row", line: "Brand booths, product display, meetings" },
    { name: "Main Stage", line: "Talks, drop announcements, live program" },
    { name: "The Arena", line: "Demos, competitions, featured activations" },
    { name: "Saloon", line: "Hospitality, seated meetings, evening hold" },
    { name: "First Aid", line: "Required operations" },
  ],
} as const;

export const doctrine = [
  { title: "If it don't slap, it ain't Rope.", body: "Nose, smoke, bag. If two of three miss, it stays in the room." },
  { title: "Indoor. Single source.", body: "Valley rooms. Cold cure. No mystery farm." },
  { title: "Cowboy Grown.", body: "Named for the smell. Kept for the standard. SFV." },
  { title: "Direct from the rooms.", body: "Flower and merch ship from this shop. Selected rooms carry the same cuts." },
  { title: "21+ only.", body: "Adult-use. California. The gate is the door." },
];

export const tapeLegend = [
  { label: "Room", body: "Indoor, single source" },
  { label: "Cut", body: "The cross" },
  { label: "Drop", body: "3.5g – 7g" },
  { label: "Cure", body: "Cold" },
  { label: "Temper", body: "In the hand" },
  { label: "Smell", body: "The nose" },
  { label: "Flavour", body: "The smoke" },
];

export const ironGets = [
  "The next cut, named, before it hits the shop.",
  "Rope Burn, October 26–27. The list hears first.",
  "Room openings on the locator.",
];

export const ironDonts = [
  "Daily mail. Coupons. A founder newsletter.",
  "A drop calendar you have to screenshot.",
];

export const marquee = [
  "IN ROPE WE TRUST",
  "IF IT DON'T SLAP IT AIN'T ROPE",
  "COWBOY GROWN",
  "21+",
  "INDOOR · SINGLE SOURCE",
  "THE RODEO IS COMING",
  "SFV",
];

export const regions = [
  {
    id: "sfv",
    name: "SFV",
    line: "Where the bags first smelled like burning rope.",
    query: "SFV",
    image: "/images/cowboy-grown.jpg",
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    line: "Selected rooms across the city.",
    query: "Los Angeles",
    image: "/images/grounds.jpg",
  },
  {
    id: "california",
    name: "California",
    line: "The Rope lands where the rooms can hold it.",
    query: "California",
    image: "/images/rope-burn.jpg",
  },
] as const;

export const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
] as const;

export function getCut(slug: string): Cut | undefined {
  return cuts.find((cut) => cut.slug === slug);
}

export function getMerch(slug: string): MerchItem | undefined {
  return merch.find((item) => item.slug === slug);
}

export function relatedCuts(slug: string): Cut[] {
  return cuts.filter((cut) => cut.slug !== slug);
}

export function cutsByFormat(format: "all" | FormatId): Cut[] {
  if (format === "all") return cuts;
  return cuts.filter((cut) => cut.formats.some((item) => item.id === format));
}

export function merchByKind(kind: "all" | MerchItem["kind"]): MerchItem[] {
  if (kind === "all") return merch;
  return merch.filter((item) => item.kind === kind);
}

export function cutFromPrice(cut: Cut): number | null {
  if (!cut.formats.length) return null;
  return Math.min(...cut.formats.map((f) => f.price));
}

export function searchRooms(query?: string, cut?: string): Room[] {
  const q = (query ?? "").trim().toLowerCase();
  return rooms.filter((room) => {
    const cutOk = !cut || room.cuts.includes(cut);
    if (!cutOk) return false;
    if (!q) return true;
    const hay = [room.name, room.city, room.region, room.neighborhood, room.line]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export const NAV = [
  { to: "/cuts", label: "The Cuts" },
  { to: "/grounds", label: "Grounds" },
  { to: "/tape", label: "Tape" },
  { to: "/rope-burn", label: "Rope Burn" },
  { to: "/merch", label: "Merch" },
  { to: "/cowboy", label: "Cowboy" },
  { to: "/find", label: "Find" },
] as const;

export const LIST_KEY = "rope-iron-list";
export const AGE_KEY = "rope-grounds-21";
export const VENDOR_KEY = "rope-vendor";
export const ORDER_KEY = "rope-last-order";
