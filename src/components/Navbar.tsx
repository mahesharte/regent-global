import Link from "next/link";
import type React from "react"; // ✅ for React.MouseEvent
import { useEffect, useState } from "react";
import { useAppContext } from "@/components/app/context";
import { useRouter } from "next/router";

import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowRight, Close, Menu } from "./Icons";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";

// Exported type so other files (e.g., Footer.tsx) can import it
export type LinkList = {
  name: string;
  url: string;
  currentPage: boolean;
  children?: LinkList[];
};

// ✅ Missing before: define props that use LinkList
type NavbarProps = {
  links: LinkList[];
};

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const [menuOpen, setMenuopen] = useState(false);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const isMobile = !useBreakpoint("md");
  const { asPath } = useRouter();

  const [, setAppState] = useAppContext();

  const syncMenu = (next: boolean) => {
    setMenuopen(next);
    setAppState((prev) => ({ ...prev, ui: { ...(prev.ui || {}), menuOpen: next } }));
  };

  useEffect(() => setHydrated(true), []);
  const mobile = hydrated ? isMobile : false;

  useEffect(() => {
    syncMenu(false);
    setMobileOpenIndex(null);
  }, [asPath]);

  useEffect(() => {
    if (hydrated) {
      syncMenu(false);
      setMobileOpenIndex(null);
    }
  }, [mobile, hydrated]);

  const onParentClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hasChildren: boolean,
    idx: number,
  ) => {
    if (mobile && hasChildren) {
      e.preventDefault();
      setMobileOpenIndex((cur) => (cur === idx ? null : idx));
      return;
    }
    syncMenu(false);
  };

  return (
    <div className={!menuOpen ? "bg-white" : ""}>
      <div
        className={cn(
          "relative mx-auto bg-white px-4 pt-1 lg:container md:py-4 lg:py-9",
        )}
      >
        <nav className="flex h-12 items-center justify-between py-3 md:py-0">
          <Link className="z-20 h-full" href="/">
            <Logo hasWordmark fill={menuOpen ? "white" : "red"} />
          </Link>

          <Button
            className="z-20 p-0 md:hidden"
            variant="ghost"
            onClick={() => syncMenu(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
          >
            {menuOpen ? (
              <Close className="stroke-white" />
            ) : (
              <Menu className="stroke-blue" />
            )}
          </Button>

          <div
            id="primary-nav"
            className={cn(
              "absolute left-0 right-0 top-16 z-50 px-3 text-gray-900 md:relative md:top-auto md:flex md:justify-end md:gap-4 md:px-0",
              !menuOpen && mobile && "hidden",
            )}
          >
            {links.map((link, i) => {
              const hasChildren = !!(link.children && link.children.length > 0);

              return (
                <div key={i} className="group relative md:inline-block">
                  <Link
                    className="items-center gap-5 max-md:flex"
                    href={link.url}
                    onClick={(e) => onParentClick(e, hasChildren, i)}
                  >
                    <ArrowRight className="ml-1 h-4 w-4 stroke-white md:hidden" />
                    <span
                      className={cn([
                        "block py-3 underline decoration-transparent decoration-4 underline-offset-8 transition-all md:px-3 md:py-3 md:first:ps-0 md:last:pe-0 lg:px-5",
                        link.currentPage
                          ? "md:text-900 underline-offset-10 md:decoration-blue"
                          : "hover:underline-offset-10 md:hover:decoration-red",
                        "max-md:text-white",
                      ])}
                    >
                      {link.name}
                    </span>
                  </Link>

                  {/* Desktop dropdown (desktop only) */}
                  {!mobile && hasChildren && (
                    <div className="absolute left-0 z-50  hidden w-max max-w-[90vw] overflow-hidden bg-white text-black shadow-lg group-hover:block">
                      {link.children?.map((child, j) => (
                        <Link
                          key={j}
                          href={child.url}
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => syncMenu(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Mobile sublinks (only when that parent is opened) */}
                  {menuOpen &&
                    mobile &&
                    hasChildren &&
                    mobileOpenIndex === i && (
                      <div className="pl-6">
                        {link.children?.map((child, j) => (
                          <Link
                            key={j}
                            href={child.url}
                            className="block py-2 text-white"
                            onClick={() => syncMenu(false)}
                          >
                            ↳ &nbsp;{child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              );
            })}
          </div>

          {/* Gradient overlay (mobile only, after hydrate) */}
          {menuOpen && mobile && (
            <div className="absolute left-0 top-0 z-10 h-screen w-screen bg-gradient-to-r from-blue to-red" />
          )}
        </nav>
      </div>
    </div>
  );
};

export { Navbar };
