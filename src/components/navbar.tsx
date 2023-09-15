import { Logo } from "@/components/logo";
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
  <div className="flex justify-between items-center">
    <Logo hasWordmark />
    <nav className="flex text-gray-900">
      {links.map((link, i) => {
        const Tag = link.currentPage ? "span" : "a";
        return (
          <Tag
            className={cn([
              "underline-offset-8 underline decoration-transparent decoration-4 transition-all px-5 py-8 first:ps-0 last:pe-0",
              link.currentPage
                ? "underline-offset-10 decoration-red"
                : "hover:underline-offset-10 hover:decoration-red",
            ])}
            key={i}
            href={link.currentPage ? undefined : link.url}
          >
            {link.name}
          </Tag>
        );
      })}
    </nav>
  </div>
);

export { Navbar };
