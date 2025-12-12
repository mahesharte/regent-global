'use client';

import Link from "next/link";
import Image from "next/image";
import camelCase from "lodash/camelCase";

import { Logo } from "@/components/Logo";
import RichText from "@/components/richtext/RichText";
import { Button } from "@/components/ui/button";
import { FormProps } from "@/lib/hooks/useFormAction";
import { SanityRichtext } from "@/sanity/types/objects";
import type { SanityImage } from "@/sanity/types/documents";
import type { LinkList } from "./Navbar";

type SocialLinks = {
  facebook?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  linkedin?: string | null;
};

type LegalLinks = {
  cookies?: string | null;
  privacy?: string | null;
};

type SocialIcons = {
  facebook?: SanityImage | null;
  instagram?: SanityImage | null;
  tiktok?: SanityImage | null;
  linkedin?: SanityImage | null;
};

type FooterProps = {
  form?: FormProps;
  formTitle?: string;
  links: LinkList[];
  copyrightText?: SanityRichtext;
  socialLinks?: SocialLinks;
  legalLinks?: LegalLinks;
  socialIcons?: SocialIcons;
};

const Footer: React.FC<FooterProps> = ({
  form,
  links,
  copyrightText,
  socialLinks,
  legalLinks,
  socialIcons,
}) => {
  // Debug logging
  if (typeof window !== 'undefined') {
    console.log('Footer social data:', {
      socialLinks,
      socialIcons,
      facebookIcon: socialIcons?.facebook,
      facebookAsset: socialIcons?.facebook?.asset,
      facebookAssetUrl: socialIcons?.facebook?.asset?.url,
    });
  }

  const hasSocialLinks =
    !!socialLinks?.facebook ||
    !!socialLinks?.instagram ||
    !!socialLinks?.tiktok ||
    !!socialLinks?.linkedin;

  const renderSocialIcons = (size: number = 50) => (
    <div className="flex gap-2">
      {socialLinks?.facebook && socialIcons?.facebook?.asset?.url && (
        <Link href={socialLinks.facebook} target="_blank" rel="noreferrer">
          {socialIcons.facebook.asset.url.endsWith('.svg') ? (
            <img
              src={socialIcons.facebook.asset.url}
              alt="Facebook"
              width={size}
              height={size}
              style={{ width: size, height: size }}
            />
          ) : (
            <Image
              src={socialIcons.facebook.asset.url}
              alt="Facebook"
              width={size}
              height={size}
              unoptimized
            />
          )}
        </Link>
      )}
      {socialLinks?.facebook && !socialIcons?.facebook?.asset?.url && (
        <Link href={socialLinks.facebook} target="_blank" rel="noreferrer">
          <span className="text-sm">FB</span>
        </Link>
      )}

      {socialLinks?.instagram && socialIcons?.instagram?.asset?.url && (
        <Link href={socialLinks.instagram} target="_blank" rel="noreferrer">
          {socialIcons.instagram.asset.url.endsWith('.svg') ? (
            <img
              src={socialIcons.instagram.asset.url}
              alt="Instagram"
              width={size}
              height={size}
              style={{ width: size, height: size }}
            />
          ) : (
            <Image
              src={socialIcons.instagram.asset.url}
              alt="Instagram"
              width={size}
              height={size}
              unoptimized
            />
          )}
        </Link>
      )}
      {socialLinks?.instagram && !socialIcons?.instagram?.asset?.url && (
        <Link href={socialLinks.instagram} target="_blank" rel="noreferrer">
          <span className="text-sm">IG</span>
        </Link>
      )}

      {socialLinks?.tiktok && socialIcons?.tiktok?.asset?.url && (
        <Link href={socialLinks.tiktok} target="_blank" rel="noreferrer">
          {socialIcons.tiktok.asset.url.endsWith('.svg') ? (
            <img
              src={socialIcons.tiktok.asset.url}
              alt="TikTok"
              width={Math.min(size, 40)}
              height={Math.min(size, 40)}
              style={{ width: Math.min(size, 40), height: Math.min(size, 40) }}
            />
          ) : (
            <Image
              src={socialIcons.tiktok.asset.url}
              alt="TikTok"
              width={Math.min(size, 40)}
              height={Math.min(size, 40)}
              unoptimized
            />
          )}
        </Link>
      )}
      {socialLinks?.tiktok && !socialIcons?.tiktok?.asset?.url && (
        <Link href={socialLinks.tiktok} target="_blank" rel="noreferrer">
          <span className="text-sm">TT</span>
        </Link>
      )}

      {socialLinks?.linkedin && socialIcons?.linkedin?.asset?.url && (
        <Link href={socialLinks.linkedin} target="_blank" rel="noreferrer">
          {socialIcons.linkedin.asset.url.endsWith('.svg') ? (
            <img
              src={socialIcons.linkedin.asset.url}
              alt="LinkedIn"
              width={size}
              height={size}
              style={{ width: size, height: size }}
            />
          ) : (
            <Image
              src={socialIcons.linkedin.asset.url}
              alt="LinkedIn"
              width={size}
              height={size}
              unoptimized
            />
          )}
        </Link>
      )}
      {socialLinks?.linkedin && !socialIcons?.linkedin?.asset?.url && (
        <Link href={socialLinks.linkedin} target="_blank" rel="noreferrer">
          <span className="text-sm">IN</span>
        </Link>
      )}
    </div>
  );

  return (
    <div className="bg-gradient bg-gradient-to-r from-blue to-red">
      <div className="px-8 lg:container lg:mx-auto lg:px-0">

        {/* TOP: Logo + links + form + social icons aligned horizontally */}
        <div className="flex flex-col-reverse md:flex-row items-start justify-start gap-14 pb-10 pt-10 md:gap-4 md:pb-16 md:pt-10 lg:gap-24 lg:pb-24 lg:pt-14">

          <div className="mx-auto md:basis-1/2 lg:basis-3/5">
            <nav className="flex flex-col-reverse md:flex-row items-center md:items-start gap-14 md:gap-4">

              {/* Logo */}
              <Link href="/" className="md:basis-1/3">
                <Logo fill="white" className="h-14" />
              </Link>

              {/* Links */}
              <div className="flex flex-col w-full gap-4 md:basis-2/3">
                <div className="flex flex-wrap">
                  {links.map((link, i) => (
                    <Link
                      key={i}
                      href={link.url}
                      className="basis-1/2 pb-2 pt-2 text-center text-sm text-white md:pb-4 md:pt-0 md:text-left"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile: Connect text + smaller icons below */}
                {hasSocialLinks && (
                  <div className="md:hidden">
                    <div className="flex justify-center">
                      <span className="text-white font-semibold text-sm">Connect with us</span>
                    </div>
                    <div className="mt-2 flex justify-center">
                      {renderSocialIcons(28)}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right side: form */}
          <div className="md:basis-1/2 lg:basis-2/5">
            {!!form?.title && (
              <h4 className="pb-4 text-3xl font-black text-white">{form.title}</h4>
            )}

            {!!form?.content && (
              <RichText
                value={form.content}
                classNames={{ block: { normal: "pb-4 text-lg text-white" } }}
              />
            )}

            <form method="post" onSubmit={form?.onSubmit} className="relative h-16 w-full">
              {!!form?.inputs?.[0] && (
                <>
                  <input
                    className="h-full w-full rounded-full pl-5 pr-28 text-sm"
                    placeholder={form.inputs[0].placeholder}
                    required={form.inputs[0].required}
                    disabled={form?.state?.isSubmitting}
                    {...form?.register?.(camelCase(form.inputs[0]?.title ?? "email"))}
                  />
                  <Button type="submit" disabled={form?.state?.isSubmitting} className="absolute right-2 top-2">
                    {form?.cta ?? "Submit"}
                  </Button>
                </>
              )}

              <span className="block pt-3 text-white">{form?.message || <>&nbsp;</>}</span>
            </form>
          </div>

          {/* Social icons on same line as links, at right side */}
          {hasSocialLinks && (
            <div className="hidden md:flex gap-4 md:ml-auto">
              <span className="text-white font-semibold text-sm whitespace-nowrap flex-shrink-0 flex items-center">
                Connect with us
              </span>
              <div className="flex gap-2 items-start">
                {renderSocialIcons(50)}
              </div>
            </div>
          )}
        </div>

        {/* Bottom: Copyright + Cookies | Privacy */}
        {(copyrightText ||
          legalLinks?.cookies ||
          legalLinks?.privacy) && (
            <div className="border-t border-white/20 pb-8 pt-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm text-white gap-2">

                {/* Copyright (mobile last, desktop left) */}
                <div className="order-2 md:order-none text-center md:text-left">
                  {!!copyrightText && (
                    <RichText value={copyrightText} defaultClassNames="standard" />
                  )}
                </div>

                {/* Mobile-first: Cookies | Privacy above copyright; Desktop: right aligned */}
                <div className="flex items-center justify-center gap-3 text-xs md:justify-end order-1 md:order-none">
                  {legalLinks?.cookies && (
                    <Link href={legalLinks.cookies} className="underline hover:no-underline">
                      Cookies
                    </Link>
                  )}

                  {legalLinks?.cookies && legalLinks?.privacy && (
                    <span className="opacity-60">|</span>
                  )}

                  {legalLinks?.privacy && (
                    <Link href={legalLinks.privacy} className="underline hover:no-underline">
                      Privacy
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export { Footer };
