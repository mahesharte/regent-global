import type { FC } from "react";
import dynamic from "next/dynamic";

import { useAppContext } from "@/components/app/context";
import { Footer as FooterComponent } from "@/components/Footer";
import { SanityFooter } from "@/sanity/types/documents";
import sanityLinkToLinkList from "@/sanity/utils/sanityLinkToLinkList";
import getArticleSlugPrefix from "@/sanity/utils/getArticleSlugPrefix";
import useFormAction from "@/lib/hooks/useFormAction";
import inIframe from "@/lib/inIframe";

type Props = {
  footer?: SanityFooter | null;
};

const Banner = dynamic(() => import("@/components/preview/Banner"));

const Footer: FC<Props> = ({ footer }) => {
  const [{ preview, setting }] = useAppContext();
  const { formState, message, onSubmit, register } = useFormAction(
    footer?.form,
  );
  const articlePrefix = getArticleSlugPrefix(setting);
  const links = (footer?.links ?? []).map((link) =>
    sanityLinkToLinkList(link, {
      prefixes: {
        article: articlePrefix,
      },
    }),
  );

  return (
    <footer>
      <FooterComponent
        form={{
          content: footer?.form?.content,
          cta: footer?.form?.cta,
          inputs: footer?.form?.inputs ?? [],
          message,
          onSubmit,
          register,
          state: formState,
          title: footer?.form?.title,
        }}
        links={links}
        copyrightText={footer?.copyrightText}
        socialLinks={footer?.socialLinks}
        socialIcons={footer?.socialIcons}
        legalLinks={footer?.legalLinks}
      />
      {preview.active && !inIframe() && <Banner loading={preview.loading} />}
    </footer>
  );
};

export default Footer;
