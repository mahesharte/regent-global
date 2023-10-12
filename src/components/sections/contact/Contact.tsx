import type { SanitySection } from "@/sanity/types/documents";
import type { FC } from "react";
import Image from "next/image";
import clsx from "clsx";

import useDynamicStyles from "@/lib/hooks/useDynamicStyles";
import { ContactBlock } from "@/components/ContactBlock";
import RichText from "@/components/richtext/RichText";
import useFormAction from "@/lib/hooks/useFormAction";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import imageUrlBuilder from "@/sanity/utils/imageUrlBuilder";
import { cn } from "@/lib/utils";
import { useSectionStyles } from "../utils";

type Props = {
  section: SanitySection;
};

const textAlignments = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const Contact: FC<Props> = ({ section }) => {
  const {
    content,
    image,
    title = "",
    form,
    styleAlignment = "right",
    styleTheme = "dark",
  } = section;
  const styles = useSectionStyles(section, ["gradient", "margin", "padding"]);
  const isMobile = !useBreakpoint("sm");
  const { className, ref } = useDynamicStyles<HTMLDivElement>(styles);
  const { formState, message, onSubmit, register } = useFormAction(form);
  const textColor = styleTheme === "light" ? "text-black" : "text-white";

  return (
    <div ref={ref} className={className}>
      <div className="container mx-auto">
        <div className="flex flex-col justify-between pb-20 max-md:px-4 md:flex-row">
          {!!content && (
            <div
              className={cn(
                "max-w-[64ch] max-md:order-2 md:text-lg",
                textColor,
              )}
            >
              <RichText value={content} defaultClassNames="standard" />
            </div>
          )}
          {!!title && (
            <h1
              className={cn(
                "flex-grow text-5xl font-black max-md:order-1 max-md:pb-4 md:text-right md:text-5xl lg:text-7xl",
                styleTheme === "light" ? "text-blue" : "text-white",
              )}
            >
              {title}
            </h1>
          )}
        </div>
        <div className="grid grid-cols-8 gap-0">
          {!!image?.asset?.url && (
            <Image
              className={clsx(
                "col-span-3 h-full w-full object-cover max-md:hidden lg:col-span-4",
                styleAlignment === "left" ? "order-1" : "order-0",
              )}
              src={imageUrlBuilder(image).url()}
              width={image.asset.metadata.dimensions.width}
              height={image.asset.metadata.dimensions.height}
              alt={title ?? ""}
            />
          )}
          <div
            className={cn(
              "col-span-8 bg-white px-4 py-10 md:col-span-5 md:px-14 md:pb-14 md:pt-12 lg:col-span-4",
              !image?.asset?.url && "md:col-span-8 lg:col-span-8",
              styleAlignment === "left" ? "order-0" : "order-1",
            )}
          >
            <ContactBlock
              form={{
                content: form?.content,
                cta: form?.cta,
                inputs: form?.inputs ?? [],
                message,
                onSubmit,
                register,
                state: formState,
                title: form?.title,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
