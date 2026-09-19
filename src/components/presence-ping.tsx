import { useEffect } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { pingPresence } from "@/lib/shop";

export function PresencePing() {
  const { user, isPending } = useCurrentUserState();

  useEffect(() => {
    if (isPending || !user) return;
    const beat = () => {
      void pingPresence().catch(() => undefined);
    };
    beat();
    const id = window.setInterval(beat, 20000);
    const onVis = () => {
      if (document.visibilityState === "visible") beat();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [isPending, user]);

  return null;
}
