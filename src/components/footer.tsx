import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LinkList } from './navbar';

type NavbarProps = {
  links: LinkList[];
};

const Footer: React.FC<NavbarProps> = ({ links }) => (
  <div className="flex justify-start items-start bg-gradient-to-r from-red to-blue p-24 gap-24 h-[451px]">
    <div className="flex basis-3/5 h-full gap-16">

      <nav className="flex text-gray-900 flex-col flex-wrap gap-4 h-full w-full">
        <a href='/' className="basis-full">
          <Logo fill="white" />
        </a>
        {links.map((link, i) => (
          <a className="text-white text-sm" key={i} href={link.url}>
            {link.name}
          </a>
        ))}
      </nav>
    </div>
    <div className="basis-2/5">
      <h4 className="text-3xl text-white font-black pb-4">Keep in the know</h4>
      <p className="text-lg text-white pb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam
        volutpat ornare. Duis dui purus.
      </p>
      <form className='w-full relative h-16'>
        <input className="rounded-full w-full h-full" />
        <Button className='absolute right-2 top-2'>Submit</Button>
      </form>
    </div>
  </div>
);

export { Footer };
