import { cuts, merch, type Cut, type MerchItem } from "@/lib/data";

export type CatalogOverlay = {
  extraCuts: Cut[];
  extraMerch: MerchItem[];
  hidden: string[];
  earlySlugs: string[];
};

export const EMPTY_OVERLAY: CatalogOverlay = {
  extraCuts: [],
  extraMerch: [],
  hidden: [],
  earlySlugs: [],
};

export function catalogCuts(overlay: CatalogOverlay): Cut[] {
  const map = new Map(cuts.map((cut) => [cut.slug, cut]));
  for (const extra of overlay.extraCuts) map.set(extra.slug, extra);
  return [...map.values()];
}

export function catalogMerch(overlay: CatalogOverlay): MerchItem[] {
  const map = new Map(merch.map((item) => [item.slug, item]));
  for (const extra of overlay.extraMerch) map.set(extra.slug, extra);
  return [...map.values()];
}

export function visibleCuts(overlay: CatalogOverlay, member: boolean): Cut[] {
  const early = new Set(overlay.earlySlugs);
  const hidden = new Set(overlay.hidden);
  return catalogCuts(overlay).filter((cut) => {
    if (hidden.has(cut.slug)) return false;
    if (early.has(cut.slug) && !member) return false;
    return true;
  });
}

export function visibleMerch(overlay: CatalogOverlay, member: boolean): MerchItem[] {
  const early = new Set(overlay.earlySlugs);
  const hidden = new Set(overlay.hidden);
  return catalogMerch(overlay).filter((item) => {
    if (hidden.has(item.slug)) return false;
    if (early.has(item.slug) && !member) return false;
    return true;
  });
}

export function findCut(overlay: CatalogOverlay, slug: string, member: boolean): Cut | undefined {
  return visibleCuts(overlay, member).find((cut) => cut.slug === slug);
}

export const PRODUCT_IMAGES = [
  "/images/zestperado-jar.jpg",
  "/images/zfuel-jar.jpg",
  "/images/zog-jar.jpg",
  "/images/keylimez-jar.jpg",
  "/images/zuma-jar.jpg",
  "/images/zazooka-jar.jpg",
  "/images/merch-hat.jpg",
  "/images/merch-tee.jpg",
  "/images/merch-bandana.jpg",
  "/images/merch-boot.jpg",
  "/images/merch-patch.jpg",
  "/images/merch-iron.jpg",
  "/images/merch-crate.jpg",
];
