import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";

const linkClass =
  "inline-flex min-h-9 items-center text-xs text-ash hover:text-cream sm:min-h-11 sm:text-sm";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-iron bg-hat pb-10">
      <div className="page-pad mx-auto max-w-[1440px] py-10">
        <div className="max-w-sm">
          <Logo imgClassName="h-16 sm:h-24" />
          <p className="stamp mt-4 text-sand">In Rope We Trust</p>
          <p className="mt-3 text-sm text-ash">
            Cowboy Grown. If it don't slap, it ain't Rope. 21+ flower and merch. California adult-use.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-8">
          <div>
            <p className="stamp text-cream">Shop</p>
            <ul className="mt-3 space-y-1">
              <li>
                <Link to="/cuts" className={linkClass}>
                  The Cuts
                </Link>
              </li>
              <li>
                <Link to="/merch" className={linkClass}>
                  Merch
                </Link>
              </li>
              <li>
                <Link to="/cart" className={linkClass}>
                  Bag
                </Link>
              </li>
              <li>
                <Link to="/find" className={linkClass}>
                  Find
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="stamp text-cream">Grounds</p>
            <ul className="mt-3 space-y-1">
              <li>
                <Link to="/grounds" className={linkClass}>
                  Grounds
                </Link>
              </li>
              <li>
                <Link to="/tape" className={linkClass}>
                  Tape
                </Link>
              </li>
              <li>
                <Link to="/rope-burn" className={linkClass}>
                  Rope Burn
                </Link>
              </li>
              <li>
                <Link to="/cowboy" className={linkClass}>
                  Cowboy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="stamp text-cream">Iron</p>
            <ul className="mt-3 space-y-1">
              <li>
                <Link to="/list" className={linkClass}>
                  The List
                </Link>
              </li>
              <li>
                <Link to="/login" className={linkClass}>
                  Members
                </Link>
              </li>
              <li>
                <a href="mailto:iron@burningropepharms.com" className={linkClass}>
                  Email
                </a>
              </li>
              <li>
                <Link to="/privacy" className={linkClass}>
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className={linkClass}>
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-iron">
        <div className="page-pad mx-auto flex max-w-[1440px] flex-col gap-2 py-5 text-legal text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Burning Rope Pharms. SFV. 21+.</p>
          <p className="flex items-center gap-4">
            <span>Cowboy Grown · Adult-use California</span>
            <Link to="/admin" className="hover:text-cream">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
