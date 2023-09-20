import Link from "next/link";

import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

export type LinkList = {
  name: string;
  url: string;
  currentPage: boolean;
};

type NavbarProps = {
  links: LinkList[];
};

const Navbar: React.FC<NavbarProps> = ({ links }) => (
  <div className="flex items-center justify-between">
    <Link href="/">
      <Logo hasWordmark />
    </Link>
    <nav className="flex text-gray-900">
      {links.map((link, i) => (
        <Link
          className={cn([
            "px-5 py-8 underline decoration-transparent decoration-4 underline-offset-8 transition-all first:ps-0 last:pe-0",
            link.currentPage
              ? "decoration-red underline-offset-10"
              : "hover:decoration-red hover:underline-offset-10",
          ])}
          key={i}
          href={link.url}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  </div>
);

export { Navbar };
