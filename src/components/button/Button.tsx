import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { SanityButton } from "@/sanity/types/objects";
import getLinkAttributes from "@/sanity/utils/getLinkAttributes";
import { useAppContext } from "../app/context";
import { applyGradientStyles } from "../sections/utils";
import useDynamicStyles, { DynamicStyles } from "@/lib/hooks/useDynamicStyles";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AccessGateModal from "../AccessGateModal";

type Props = {
  button: SanityButton;
  className?: string;
};

const Button: FC<Props> = ({ button, className }) => {
  const router = useRouter();
  const [isGatedModalOpen, setIsGatedModalOpen] = useState(false);
  const [pageSlug, setPageSlug] = useState('');
  const [{ setting }] = useAppContext();
  const dynamicStyles: DynamicStyles = {};
  applyGradientStyles(dynamicStyles, setting?.themeGlobalGradient);
  const { className: dynamicClassName, ref } =
    useDynamicStyles<HTMLAnchorElement>(dynamicStyles);

  // Get page slug from router after component mounts
  useEffect(() => {
    if (router.isReady) {
      setPageSlug(router.asPath.split("?")[0] || router.pathname);
    }
  }, [router.isReady, router.asPath, router.pathname]);

  // Handle gated PDF button click
  const handleGatedPdfClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsGatedModalOpen(true);
  };

  // Extract PDF data from link
  const getPdfData = () => {
    if (!button.link) return { pdfFileRef: undefined, pdfExternalUrl: undefined };
    
    // If link type is URL (like PDF from media), use the url field
    if (button.link.type === 'url' && button.link.url) {
      return {
        pdfFileRef: undefined,
        pdfExternalUrl: button.link.url,
      };
    }
    
    return { pdfFileRef: undefined, pdfExternalUrl: undefined };
  };

  const pdfData = button.isGated ? getPdfData() : { pdfFileRef: undefined, pdfExternalUrl: undefined };

  // Handle modal submission for gated PDFs
  const handleModalSubmit = async (data: {
    organisationName: string;
    email: string;
  }) => {
    if (!pdfData.pdfFileRef && !pdfData.pdfExternalUrl) {
      throw new Error("Missing PDF information");
    }

    if (!pageSlug) {
      throw new Error("Missing page information");
    }

    const response = await fetch("/api/pdf-gate-submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        organisationName: data.organisationName,
        email: data.email,
        pageSlug,
        pdfLabel: button.title,
        pdfFileRef: pdfData.pdfFileRef,
        pdfExternalUrl: pdfData.pdfExternalUrl,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to process PDF request");
    }

    const result = await response.json();
    setIsGatedModalOpen(false);

    // Open PDF in new tab
    if (result.pdfUrl) {
      window.open(result.pdfUrl, "_blank");
    }
  };

  // Render as button if gated, otherwise as link
  if (button.isGated) {
    return (
      <>
        <button
          ref={ref as any}
          onClick={handleGatedPdfClick}
          className={cn(
            "ring-offset-background transition-background focus-visible:ring-ring inline-flex items-center justify-center rounded-full px-8 py-[14px] text-sm",
            "font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            dynamicClassName,
            className,
          )}
        >
          {!!button.icon?.asset?.url && button.alignment === "right" && (
            <Image
              className="mr-2 inline-block h-5 w-auto"
              src={button.icon.asset.url}
              height={20}
              width={20}
              alt="icon"
            />
          )}
          <span className="inline-block">{button.title}</span>
          {!!button.icon?.asset?.url && button.alignment === "left" && (
            <Image
              className="ml-2 inline-block h-5 w-auto"
              src={button.icon.asset.url}
              height={20}
              width={20}
              alt="icon"
            />
          )}
        </button>
        <AccessGateModal
          isOpen={isGatedModalOpen}
          onClose={() => setIsGatedModalOpen(false)}
          onSubmit={handleModalSubmit}
          pageSlug={pageSlug}
          pdfLabel={button.title}
        />
      </>
    );
  }

  // Regular link behavior
  return (
    <Link
      ref={ref}
      className={cn(
        "ring-offset-background transition-background focus-visible:ring-ring inline-flex items-center justify-center rounded-full px-8 py-[14px] text-sm",
        "font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        dynamicClassName,
        className,
      )}
      {...getLinkAttributes(button.link)}
    >
      {!!button.icon?.asset?.url && button.alignment === "right" && (
        <Image
          className="mr-2 inline-block h-5 w-auto"
          src={button.icon.asset.url}
          height={20}
          width={20}
          alt="icon"
        />
      )}
      <span className="inline-block">{button.title}</span>
      {!!button.icon?.asset?.url && button.alignment === "left" && (
        <Image
          className="ml-2 inline-block h-5 w-auto"
          src={button.icon.asset.url}
          height={20}
          width={20}
          alt="icon"
        />
      )}
    </Link>
  );
};

export default Button;
