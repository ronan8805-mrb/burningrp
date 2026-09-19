import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/data";
import { cartCount, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

function navActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const lines = useCart((s) => s.lines);
  const setBag = useCart((s) => s.setOpen);
  const count = ready ? cartCount(lines) : 0;

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40">
      <div className="relative z-50 border-b border-iron bg-bone">
        <div className="page-pad mx-auto flex h-(--header-h) max-w-[1440px] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active = navActive(pathname, item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "ui press inline-flex min-h-11 items-center px-2 text-xs font-semibold tracking-wider",
                    active ? "text-fire" : "text-cream/80 hover:text-cream",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              to="/list"
              className={cn(
                "ui press hidden min-h-11 items-center px-3 text-xs font-semibold tracking-wider text-cream/80 hover:text-cream sm:inline-flex",
                pathname === "/list" && "text-fire",
              )}
            >
              List
            </Link>
            <AccountLink />
            <button
              type="button"
              className="press relative inline-flex size-11 items-center justify-center text-cream"
              aria-label={count ? `Bag, ${count} items` : "Bag"}
              onClick={() => {
                setOpen(false);
                setBag(true);
              }}
            >
              <ShoppingBag className="size-5" />
              {count > 0 ? (
                <span className="absolute top-1.5 right-1.5 inline-flex min-w-4 items-center justify-center bg-fire px-1 text-[10px] font-semibold text-cream">
                  {count}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              className="press inline-flex size-11 items-center justify-center text-cream xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-x-0 bottom-0 z-40 flex flex-col bg-bone xl:hidden"
          style={{ top: "var(--header-h)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-4" aria-label="Mobile">
            {NAV.map((item) => {
              const active = navActive(pathname, item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "ui flex min-h-14 items-center border-b border-iron text-xl font-semibold tracking-wider",
                    active ? "text-fire" : "text-cream",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/list"
              className="ui mt-8 mb-8 flex min-h-12 items-center justify-center border border-sand/60 text-base font-semibold text-cream"
            >
              Enter the List
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function AccountLink() {
  const { user, isPending } = useCurrentUserState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (isPending) return null;
  const to = user ? "/account" : "/login";
  const active = pathname === "/login" || pathname === "/account";
  return (
    <Link
      to={to}
      aria-label={user ? "Member desk" : "Sign in"}
      className={cn(
        "press inline-flex size-11 items-center justify-center",
        active ? "text-fire" : "text-cream",
      )}
    >
      <User className="size-5" />
    </Link>
  );
}
