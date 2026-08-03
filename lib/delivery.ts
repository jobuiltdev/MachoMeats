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
