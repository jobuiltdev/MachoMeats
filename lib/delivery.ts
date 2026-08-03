export type DeliveryZone = {
  id: string;
  /** Lagos LGA or area name */
  name: string;
  fee: number;
  /** Estimated time in transit, dispatching from Kosofe (Ikosi Ketu) */
  eta: string;
};

/**
 * Estimated delivery fees by Lagos LGA, dispatching from Kosofe (Ikosi Ketu).
 * Fees are for standard parcels up to 5kg; oversized/fragile items and traffic
 * conditions may add to the estimate.
 */
export const DELIVERY_ZONES: DeliveryZone[] = [
  { id: "kosofe", name: "Kosofe", fee: 2000, eta: "30-60 mins" },
  { id: "shomolu", name: "Shomolu", fee: 2000, eta: "30-60 mins" },
  { id: "ikeja", name: "Ikeja", fee: 2500, eta: "45-75 mins" },
  { id: "ikorodu", name: "Ikorodu", fee: 3000, eta: "45 mins-1.5 hrs" },
  { id: "ifako-ijaiye", name: "Ifako-Ijaiye", fee: 3000, eta: "50-80 mins" },
  { id: "agege", name: "Agege", fee: 3000, eta: "60-90 mins" },
  { id: "mushin", name: "Mushin", fee: 3500, eta: "1-1.5 hrs" },
  { id: "lagos-mainland", name: "Lagos Mainland", fee: 3500, eta: "45-75 mins" },
  { id: "oshodi-isolo", name: "Oshodi-Isolo", fee: 3500, eta: "1-2 hrs" },
  { id: "alimosho", name: "Alimosho", fee: 4000, eta: "1-2 hrs" },
  { id: "surulere", name: "Surulere", fee: 4000, eta: "1-2 hrs" },
  { id: "lagos-island", name: "Lagos Island", fee: 4500, eta: "1-2 hrs" },
  { id: "eti-osa", name: "Eti-Osa (Lekki, VI, Ikoyi, Ajah)", fee: 5000, eta: "1-3 hrs" },
  { id: "apapa", name: "Apapa", fee: 5000, eta: "1.5-2.5 hrs" },
  { id: "ajeromi-ifelodun", name: "Ajeromi-Ifelodun", fee: 5000, eta: "1.5-2.5 hrs" },
  { id: "amuwo-odofin", name: "Amuwo-Odofin", fee: 5500, eta: "2-3 hrs" },
  { id: "ojo", name: "Ojo", fee: 6000, eta: "2-3.5 hrs" },
  { id: "ibeju-lekki", name: "Ibeju-Lekki", fee: 7000, eta: "2.5-4 hrs" },
  { id: "epe", name: "Epe", fee: 8000, eta: "3-5 hrs" },
  { id: "badagry", name: "Badagry", fee: 9000, eta: "3.5-5.5 hrs" },
];

export function getDeliveryZoneById(id: string): DeliveryZone | undefined {
  return DELIVERY_ZONES.find((zone) => zone.id === id);
}

/**
 * Common neighbourhood/landmark names mapped to the LGA that covers them, so
 * customers can type where they actually live rather than hunt for the
 * official LGA name. Best-effort — extend as mismatches turn up.
 */
const LOCATION_ALIASES: Record<string, string> = {
  "ikosi ketu": "kosofe", ketu: "kosofe", ogudu: "kosofe", "mile 12": "kosofe",
  somolu: "shomolu", bariga: "shomolu",
  gra: "ikeja", "ikeja gra": "ikeja", opebi: "ikeja", allen: "ikeja", "allen avenue": "ikeja", omole: "ikeja", ogba: "ikeja",
  yaba: "lagos-mainland", "ebute metta": "lagos-mainland", "ebute-metta": "lagos-mainland", iwaya: "lagos-mainland", costain: "lagos-mainland",
  dopemu: "agege",
  "idi oro": "mushin", "idi-oro": "mushin", idioro: "mushin",
  oshodi: "oshodi-isolo", isolo: "oshodi-isolo",
  egbeda: "alimosho", ikotun: "alimosho", idimu: "alimosho", ipaja: "alimosho", akowonjo: "alimosho", "abule egba": "alimosho", "iyana ipaja": "alimosho",
  ojuelegba: "surulere", aguda: "surulere", masha: "surulere",
  "isale eko": "lagos-island", marina: "lagos-island", cms: "lagos-island",
  lekki: "eti-osa", "victoria island": "eti-osa", vi: "eti-osa", ikoyi: "eti-osa", ajah: "eti-osa", "eti osa": "eti-osa", chevron: "eti-osa", ilasan: "eti-osa", agungi: "eti-osa", osapa: "eti-osa",
  ajegunle: "ajeromi-ifelodun", boundary: "ajeromi-ifelodun",
  festac: "amuwo-odofin", "festac town": "amuwo-odofin", "satellite town": "amuwo-odofin", "mile 2": "amuwo-odofin",
  okokomaiko: "ojo", alaba: "ojo", "trade fair": "ojo",
  sangotedo: "ibeju-lekki", awoyaya: "ibeju-lekki", eleko: "ibeju-lekki", "ibeju lekki": "ibeju-lekki",
};

type Keyword = { phrase: string; zoneId: string };

const KEYWORDS: Keyword[] = [
  ...DELIVERY_ZONES.map((zone) => ({ phrase: zone.name.toLowerCase().split(" (")[0], zoneId: zone.id })),
  ...Object.entries(LOCATION_ALIASES).map(([alias, zoneId]) => ({ phrase: alias, zoneId })),
  // Longest phrase first, so a specific match ("ibeju-lekki") is tried before
  // a shorter one that happens to be a substring of it ("lekki").
].sort((a, b) => b.phrase.length - a.phrase.length);

/**
 * Matches free-text customer input to a Lagos delivery zone against the LGA
 * names and the alias list. Checked in three passes, each stricter than the
 * last would be permissive: exact match (so short abbreviations like "VI"
 * work), then "the input contains a full keyword phrase" (safe against
 * collisions like "lekki" inside "ibeju-lekki" because direction matters),
 * then "a keyword starts with what's typed so far" for still-typing input.
 * Returns null if nothing in Lagos matches.
 */
export function matchLocationToZone(input: string): DeliveryZone | null {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return null;

  const exact = KEYWORDS.find((k) => k.phrase === normalized);
  if (exact) return getDeliveryZoneById(exact.zoneId) ?? null;

  const contained = KEYWORDS.find((k) => normalized.includes(k.phrase));
  if (contained) return getDeliveryZoneById(contained.zoneId) ?? null;

  if (normalized.length >= 3) {
    const prefixOf = KEYWORDS.find((k) => k.phrase.startsWith(normalized));
    if (prefixOf) return getDeliveryZoneById(prefixOf.zoneId) ?? null;
  }

  return null;
}
