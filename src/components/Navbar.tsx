import Link from "next/link";

import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Menu } from "./Icons";
import { useState } from "react";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";

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

  return (
    <div className="bg-white">
      <div className="mx-auto bg-white px-4 lg:container md:py-4 lg:px-0 lg:py-9">
        <nav className="relative flex h-12 items-center justify-between bg-white py-2 md:py-0">
          <Logo hasWordmark />
          <Button
            className="p-0 md:hidden"
            variant="ghost"
            onClick={() => setMenuopen((state) => !state)}
            aria-label="Menu"
          >
            <Menu />
          </Button>
          <div
            className={cn(
              "absolute left-0 right-0 top-12 -mx-4 bg-white px-3 text-gray-900 md:relative md:top-auto md:mx-0 md:flex md:justify-end md:px-0",
              !menuOpen && isMobile && "hidden",
            )}
          >
            {links.map((link, i) => (
              <Link
                className={cn([
                  "block py-3 underline decoration-transparent decoration-4 underline-offset-8 transition-all md:px-3 md:py-3 md:first:ps-0 md:last:pe-0 lg:px-5",
                  link.currentPage
                    ? "md:text-900 text-red underline-offset-10 md:decoration-red"
                    : "hover:underline-offset-10 md:hover:decoration-red",
                ])}
                key={i}
                href={link.url}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export { Navbar };
