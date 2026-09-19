import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AgeGate } from "@/components/age-gate";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { PresencePing } from "@/components/presence-ping";
import { NotFoundPage } from "@/components/not-found";
import appCss from "../styles.css?url";

const APP_NAME = "Burning Rope Pharms";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content: "Cowboy Grown. If it don't slap, it ain't Rope. 21+ flower and merch from SFV.",
      },
      { name: "theme-color", content: "#0B0A09" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/images/logo.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Barlow+Condensed:wght@500;600;700&family=Rye&display=swap",
      },
    ],
  }),
  notFoundComponent: NotFoundPage,
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-bone text-cream">
        <PreviewHostBridge />
        <AuthProvider>
          <AgeGate>
            <PresencePing />
            <div className="flex min-h-svh flex-col">
              <Header />
              <Outlet />
              <Footer />
              <CartDrawer />
            </div>
          </AgeGate>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
