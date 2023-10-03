import Link from "next/link";

import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowRight, Close, Menu } from "./Icons";
import { useEffect, useState } from "react";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { useRouter } from "next/router";

export type LinkList = {
  name: string;
  url: string;
  currentPage: boolean;
};

type NavbarProps = {
  links: LinkList[];
};

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const [menuOpen, setMenuopen] = useState(false);
  const isMobile = !useBreakpoint("md");
  const { asPath } = useRouter();

  useEffect(() => {
    setMenuopen(false);
  }, [asPath]);

  useEffect(() => {
    if (isMobile && menuOpen) {
      const prevOverflow = document.body.style.overflowY || "visible";
      document.body.style.overflowY = "hidden";
      return () => {
        document.body.style.overflowY = prevOverflow;
      };
    }
  }, [isMobile, menuOpen]);

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
            onClick={() => setMenuopen((state) => !state)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <Close className="stroke-white" />
            ) : (
              <Menu className="stroke-blue" />
            )}
          </Button>
          <div
            className={cn(
              "absolute left-0 right-0 top-16 z-50 px-3 text-gray-900 md:relative md:top-auto md:flex md:justify-end md:px-0",
              !menuOpen && isMobile && "hidden",
            )}
          >
            {links.map((link, i) => (
              <Link
                key={i}
                className="items-center gap-5  max-md:flex"
                href={link.url}
                onClick={() => setMenuopen(false)}
              >
                <ArrowRight className="ml-1 h-4 w-4 stroke-white md:hidden" />
                <span
                  className={cn([
                    "block py-3 underline decoration-transparent decoration-4 underline-offset-8 transition-all md:px-3 md:py-3 md:first:ps-0 md:last:pe-0 lg:px-5",
                    link.currentPage
                      ? "md:text-900 underline-offset-10 md:decoration-red"
                      : "hover:underline-offset-10 md:hover:decoration-red",
                    "max-md:text-white",
                  ])}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
          {menuOpen && isMobile && (
            <div className="absolute left-0 top-0 z-10 h-screen w-screen bg-gradient-to-r from-blue to-red" />
          )}
        </nav>
      </div>
    </div>
  );
};

export { Navbar };
