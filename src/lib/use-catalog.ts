import { useEffect, useState } from "react";
import { EMPTY_OVERLAY, visibleCuts, visibleMerch, type CatalogOverlay } from "@/lib/catalog";
import { getCatalogOverlay } from "@/lib/shop";

export function useCatalog(member: boolean) {
  const [overlay, setOverlay] = useState<CatalogOverlay>(EMPTY_OVERLAY);
  useEffect(() => {
    void getCatalogOverlay()
      .then(setOverlay)
      .catch(() => setOverlay(EMPTY_OVERLAY));
  }, []);
  return {
    overlay,
    cuts: visibleCuts(overlay, member),
    merch: visibleMerch(overlay, member),
  };
}
