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
  { id: "paper", label: "Paper" },
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
    slug: "studded-hat",
    name: "Studded Hat",
    kind: "wear",
    line: "Black felt. Marked brim.",
    blurb: "The house hat. Black felt, studded band, Rope mark in the crown. One size, shaped to wear.",
    image: "/images/merch-hat.jpg",
    price: 8500,
  },
  {
    slug: "rope-tee",
    name: "Rope Tee",
    kind: "wear",
    line: "Cream field. Coil print.",
    blurb: "Heavyweight cream tee. Burnt rope on the chest. Nothing on the back.",
    image: "/images/merch-tee.jpg",
    price: 4800,
    sizes: TEE_SIZES,
  },
  {
    slug: "burn-bandana",
    name: "Burn Bandana",
    kind: "wear",
    line: "Rust cotton. Iron knot.",
    blurb: "Cotton bandana in rust. House mark in the corner. Neck, hat, or pocket.",
    image: "/images/merch-bandana.jpg",
    price: 2800,
  },
  {
    slug: "rope-boot",
    name: "Rope Boot",
    kind: "wear",
    line: "Black leather. One coil.",
    blurb: "Black studded shaft, rust rope wrap. Leather that takes dirt. Sold as a pair.",
    image: "/images/merch-boot.jpg",
    price: 26000,
    sizes: BOOT_SIZES,
  },
  {
    slug: "skull-patch",
    name: "Skull Patch",
    kind: "wear",
    line: "Ivory thread. Hat on.",
    blurb: "Embroidered ivory skull in a black hat. Iron-on or stitch. Jacket work.",
    image: "/images/merch-patch.jpg",
    price: 1800,
  },
  {
    slug: "cooling-iron",
    name: "Cooling Iron",
    kind: "iron",
    line: "The house stamp.",
    blurb: "Cast iron Rope brand. Heavy. Display, or heat once. Not a toy.",
    image: "/images/merch-iron.jpg",
    price: 14000,
  },
  {
    slug: "jar-crate",
    name: "Jar Crate",
    kind: "iron",
    line: "Burn-marked wood.",
    blurb: "Pine crate, rope handles, brand on the lid. Holds wraps and jars.",
    image: "/images/merch-crate.jpg",
    price: 7200,
  },
  {
    slug: "wanted-sheet",
    name: "Wanted Sheet",
    kind: "paper",
    line: "Letterpress on stock.",
    blurb: "The county poster, printed on heavy stock. Nailed, not framed.",
    image: "/images/wanted-still.jpg",
    price: 2200,
  },
  {
    slug: "burn-matches",
    name: "Burn Matches",
    kind: "paper",
    line: "Black box. Wooden sticks.",
    blurb: "House matchbox. Skull mark. Sticks that light.",
    image: "/images/merch-matches.jpg",
    price: 1400,
  },
];

export const festival = {
  title: "Rope Burn",
  spoken: "the Rodeo",
  place: "the Burning Grounds",
  where: "San Fernando Valley. Canyon edge.",
  when: "Date TBA · three days · 21+",
  creed: "A three-day flower festival and expo. Booths, stages, and a Sunday close at the Burning Grounds.",
  days: [
    {
      id: "branding",
      name: "Friday — The Branding",
      hours: "12:00 – 02:00",
      line: "Gates and 21+ check. Expo floor opens, merch barn, first sets on Dust Stage.",
    },
    {
      id: "rodeo",
      name: "Saturday — The Rodeo",
      hours: "11:00 – 02:00",
      line: "Main day. Grower village, talks, cut judging, Iron Stage after dark.",
    },
    {
      id: "burn",
      name: "Sunday — The Burn",
      hours: "12:00 – 22:00",
      line: "Last look at the floor. Cowboy Grown talk. The gate closes the weekend.",
    },
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
  "Rope Burn date, when it exists.",
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
