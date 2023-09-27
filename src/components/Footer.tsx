import Link from "next/link";
import camelCase from "lodash/camelCase";

import { Logo } from "@/components/Logo";
import RichText from "@/components/richtext/RichText";
import { Button } from "@/components/ui/button";
import { FormProps } from "@/lib/hooks/useFormAction";
import { SanityRichtext } from "@/sanity/types/objects";
import { cn } from "@/lib/utils";
import { LinkList } from "./Navbar";

type NavbarProps = {
  form?: FormProps;
  formTitle?: string;
  links: LinkList[];
  copyrightText?: SanityRichtext;
};

const Footer: React.FC<NavbarProps> = ({ form, links, copyrightText }) => (
  <div className="bg-gradient bg-gradient-to-r from-blue to-red">
    <div className="px-4 lg:container lg:mx-auto lg:px-0">
      <div className="flex flex-col-reverse items-start justify-start gap-14 pb-10 pt-10 md:flex-row md:gap-4 md:pb-16 md:pt-10 lg:gap-24 lg:pb-24 lg:pt-14">
        <div className="mx-auto md:basis-1/2 lg:basis-3/5">
          <nav className="flex flex-col-reverse items-center gap-14 text-gray-900 md:flex-row md:items-start md:gap-4">
            <Link href="/" className="lg:basis-1/3">
              <Logo fill="white" className="h-14" />
            </Link>
            <div className="flex flex-wrap md:basis-2/3">
              {links.map((link, i) => (
                <Link
                  className="basis-1/2 pb-2 pt-2 text-center text-sm text-white md:pb-4 md:pt-0 md:text-left"
                  key={i}
                  href={link.url}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="md:basis-1/2 lg:basis-2/5">
          {!!form?.title && (
            <h4 className="pb-4 text-3xl font-black text-white">
              {form.title}
            </h4>
          )}
          {!!form?.content && (
            <RichText
              value={form.content}
              classNames={{
                block: {
                  normal: "pb-4 text-lg text-white",
                },
              }}
            />
          )}
          <form
            method="post"
            className="relative h-16 w-full"
            onSubmit={form?.onSubmit}
          >
            {!!form?.inputs?.[0] && (
              <input
                className="h-full w-full rounded-full pl-5 pr-28 text-sm"
                disabled={form?.state?.isSubmitting}
                placeholder={form.inputs[0].placeholder}
                required={form.inputs[0].required}
                type={form.inputs[0].type ?? "email"}
                {...form?.register?.(
                  camelCase(form?.inputs?.[0]?.title ?? "email"),
                )}
              />
            )}
            <Button
              className="absolute right-2 top-2"
              disabled={form?.state?.isSubmitting}
              type="submit"
            >
              {form?.cta ?? "Submit"}
            </Button>
            <span className="block pt-3 text-white">
              {form?.message || <>&nbsp;</>}
            </span>
          </form>
        </div>
      </div>
      {!!copyrightText && (
        <div className="pb-8 text-center text-sm text-white md:text-left">
          <RichText value={copyrightText} defaultClassNames="standard" />
        </div>
      )}
    </div>
  </div>
);

export { Footer };
