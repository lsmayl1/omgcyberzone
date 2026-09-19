export type Spec = { key: string; name: string };

/** Hours are numbers so each locale can pluralise them itself. */
export type Price = { hours: number; dayPrice?: string; nightPrice?: string };

export type RoomPricing = { midweek: Price[]; weekend: Price[] };

export type Room = {
  title: string;
  /** Also the key into dictionary.roomAlts for image alt text. */
  key: string;
  images: string[];
  price?: RoomPricing;
  specs?: Spec[];
};

/** STANDART's build. Every other zone is expressed as a diff against it. */
const BASE_SPECS: Spec[] = [
  { key: "cpu", name: "INTEL CORE I5-12400F" },
  { key: "videoCart", name: "RTX 3060 TI 8 GB" },
  { key: "ssd", name: "NVME 512GB" },
  { key: "ram", name: "DDR5 16 GB 3600Mhz" },
  { key: "monitor", name: "DELL 240Hz" },
  { key: "mouse", name: "Endgame OP1 RGB" },
  { key: "keyboard", name: "HyperX Alloy Origins" },
  { key: "headset", name: "HyperX Cloud II" },
];

const withSpecs = (overrides: Partial<Record<string, string>> = {}): Spec[] =>
  BASE_SPECS.map((spec) =>
    overrides[spec.key] ? { ...spec, name: overrides[spec.key]! } : spec,
  );

export const ROOMS: Room[] = [
  {
    title: "STANDART",
    key: "standart",
    images: ["/standart_room.webp", "/standart_3.webp", "/standart_4.webp"],
    price: {
      midweek: [
        { hours: 1, dayPrice: "1.80 ₼", nightPrice: "2.00 ₼" },
        { hours: 3, nightPrice: "5.00 ₼" },
        { hours: 5, nightPrice: "8.00 ₼" },
        { hours: 7, nightPrice: "10.00 ₼" },
        { hours: 9, nightPrice: "12.00 ₼" },
      ],
      weekend: [
        { hours: 1, nightPrice: "2.00 ₼" },
        { hours: 3, nightPrice: "8.00 ₼" },
        { hours: 5, nightPrice: "12.00 ₼" },
        { hours: 7, nightPrice: "15.00 ₼" },
        { hours: 9, nightPrice: "18.00 ₼" },
      ],
    },
    specs: withSpecs(),
  },
  {
    title: "VIP",
    key: "vip",
    images: ["/standart_2.webp", "/standart_3.webp", "/standart_4.webp"],
    price: {
      midweek: [
        { hours: 1, dayPrice: "2.40 ₼", nightPrice: "3.00 ₼" },
        { hours: 3, nightPrice: "8.00 ₼" },
        { hours: 5, nightPrice: "12.00 ₼" },
        { hours: 7, nightPrice: "15.00 ₼" },
        { hours: 9, nightPrice: "18.00 ₼" },
      ],
      weekend: [
        { hours: 1, nightPrice: "3.00 ₼" },
        { hours: 3, nightPrice: "8.00 ₼" },
        { hours: 5, nightPrice: "12.00 ₼" },
        { hours: 7, nightPrice: "15.00 ₼" },
        { hours: 9, nightPrice: "18.00 ₼" },
      ],
    },
    specs: withSpecs({
      cpu: "INTEL CORE I7-12700F",
      videoCart: "RTX 3080 12 GB",
      ram: "DDR5 32 GB 3600Mhz",
    }),
  },
  {
    title: "PRO",
    key: "pro",
    // The real PRO room. It used to show gamerparking + two STANDART shots,
    // which were not this zone at all.
    images: ["/pro_zone.webp"],
    price: {
      midweek: [
        { hours: 1, dayPrice: "4.00 ₼", nightPrice: "5.00 ₼" },
        { hours: 3, nightPrice: "12.00 ₼" },
        { hours: 5, nightPrice: "20.00 ₼" },
        { hours: 7, nightPrice: "25.00 ₼" },
        { hours: 9, nightPrice: "30.00 ₼" },
      ],
      weekend: [
        { hours: 1, nightPrice: "5.00 ₼" },
        { hours: 3, nightPrice: "12.00 ₼" },
        { hours: 5, nightPrice: "20.00 ₼" },
        { hours: 7, nightPrice: "25.00 ₼" },
        { hours: 9, nightPrice: "30.00 ₼" },
      ],
    },
    specs: withSpecs({
      cpu: "INTEL CORE I7-12700F",
      videoCart: "RTX 4070 TI 12 GB",
      ram: "DDR5 32 GB 3600Mhz",
      monitor: "ALLINWARE 500Hz",
      mouse: "Logitech Superlight 2",
      keyboard: "Logitech G413 TKL SE",
      headset: "Logitech PRO",
    }),
  },
  {
    title: "PLAYSTATION",
    key: "ps",
    // Three real PS-zone photos. The previous list repeated pszone2.webp
    // twice, so the carousel looped past the same picture.
    images: ["/ps_zone_1.webp", "/ps_zone_2.webp", "/ps_zone_3.webp"],
    price: {
      midweek: [
        { hours: 1, dayPrice: "4.00 ₼", nightPrice: "5.00 ₼" },
        { hours: 3, nightPrice: "12.00 ₼" },
        { hours: 5, nightPrice: "20.00 ₼" },
        { hours: 7, nightPrice: "25.00 ₼" },
        { hours: 9, nightPrice: "30.00 ₼" },
      ],
      weekend: [
        { hours: 1, nightPrice: "5.00 ₼" },
        { hours: 3, nightPrice: "12.00 ₼" },
        { hours: 5, nightPrice: "20.00 ₼" },
        { hours: 7, nightPrice: "25.00 ₼" },
        { hours: 9, nightPrice: "30.00 ₼" },
      ],
    },
  },
  {
    title: "PREMIUM",
    key: "premium",
    images: ["/standart_4.webp"],
    specs: withSpecs({
      ram: "DDR5 32 GB 3600Mhz",
      monitor: "ARON 2K 240Hz",
      mouse: "Logitech G PRO",
      keyboard: "Logitech G413 TKL SE",
      headset: "Logitech PRO",
    }),
  },
];

const numeric = (price: string) =>
  parseFloat(price.replace(",", ".").replace(/[^\d.]/g, ""));

/** Cheapest one-hour rate, used for the "from X ₼ / hour" headline. */
export const minHourlyPrice = (room: Room): string | null => {
  if (!room.price) return null;
  const values = [...room.price.midweek, ...room.price.weekend]
    .filter((row) => row.hours === 1)
    .flatMap((row) => [row.dayPrice, row.nightPrice])
    .filter((p): p is string => Boolean(p));
  if (values.length === 0) return null;
  return values.reduce((a, b) => (numeric(b) < numeric(a) ? b : a));
};

/** Gallery tiles: src + span, alt text comes from dictionary.gallery.alts. */
export const GALLERY_TILES: { key: string; src: string; span: string }[] = [
  // The real venue photography leads. All five are portrait (3:4), so each
  // takes one column across two 200px rows.
  { key: "lounge", src: "/lounge.webp", span: "col-span-1 row-span-2" },
  { key: "pro_zone", src: "/pro_zone.webp", span: "col-span-1 row-span-2" },
  { key: "ps_zone_1", src: "/ps_zone_1.webp", span: "col-span-1 row-span-2" },
  { key: "ps_zone_2", src: "/ps_zone_2.webp", span: "col-span-1 row-span-2" },
  { key: "ps_zone_3", src: "/ps_zone_3.webp", span: "col-span-1 row-span-2" },
  {
    key: "pszone2",
    src: "/pszone2.webp",
    span: "col-span-1 row-span-1 max-md:row-span-2",
  },
  { key: "standart_3", src: "/standart_3.webp", span: "col-span-1 row-span-2" },
  { key: "standart_2", src: "/standart_2.webp", span: "col-span-2 row-span-1" },
  {
    key: "standart_4",
    src: "/standart_4.webp",
    span: "col-span-1 row-span-1 max-md:col-span-2",
  },
  {
    key: "standart_room",
    src: "/standart_room.webp",
    span: "col-span-1 row-span-1",
  },
  {
    key: "gamerparking",
    src: "/gamerparking.webp",
    span: "col-span-2 row-span-2",
  },
  { key: "pszone", src: "/pszone.webp", span: "col-span-1 row-span-1" },
  { key: "standart_5", src: "/standart_5.webp", span: "col-span-1 row-span-1" },
];
