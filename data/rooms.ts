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

const BASE_SPECS: Spec[] = [
  { key: "cpu", name: "INTEL I5 12400" },
  { key: "videoCart", name: "RTX 3060 TI 8 GB" },
  { key: "ssd", name: "NVME 512GB" },
  { key: "ram", name: "DDR5 32 GB 3600Mhz" },
  { key: "monitor", name: "DELL 25 240Hz" },
  { key: "mouse", name: "HyperX Pulsefire Haste" },
  { key: "keyboard", name: "HyperX Alloy Core TKL" },
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
    specs: withSpecs({ ram: "DDR5 16 GB 3600Mhz" }),
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
    specs: withSpecs(),
  },
  {
    title: "PRO",
    key: "pro",
    images: ["/gamerparking.webp", "/standart_3.webp", "/standart_4.webp"],
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
    specs: withSpecs(),
  },
  {
    title: "PLAYSTATION",
    key: "ps",
    images: ["/pszone2.webp", "/pszone.webp", "/pszone2.webp"],
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
    specs: withSpecs(),
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
