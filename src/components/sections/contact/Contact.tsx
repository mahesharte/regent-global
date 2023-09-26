import type { SanitySection } from "@/sanity/types/documents";
import type { FC } from "react";
import Image from "next/image";
import clsx from "clsx";

import { useSectionStyles } from "../utils";
import useDynamicStyles from "@/lib/hooks/useDynamicStyles";
import { ContactBlock } from "@/components/ContactBlock";
import RichText from "@/components/richtext/RichText";
import useFormAction from "@/lib/hooks/useFormAction";

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
  } = section;
  const styles = useSectionStyles(section, ["gradient", "margin", "padding"]);
  const { className, ref } = useDynamicStyles<HTMLDivElement>(styles);
  const { formState, message, onSubmit, register } = useFormAction(form);

  return (
    <div ref={ref} className={className}>
      <div className="container mx-auto">
        <div
          className={clsx(
            "flex pb-20",
            styleAlignment === "center" ? "flex-col" : "flex-row",
          )}
        >
          {!!content && (
            <div
              className={clsx(
                "text-[18px] leading-[24px] text-white",
                styleAlignment === "right" ? "order-0" : "order-1",
                styleAlignment === "center"
                  ? "pt-10 text-center"
                  : "max-w-[670px] text-left",
              )}
            >
              <RichText value={content} />
            </div>
          )}
          {!!title && (
            <h1
              className={clsx(
                "flex-grow text-[78px] font-black leading-[78px] text-white",
                styleAlignment === "right" ? "order-1" : "order-0",
                textAlignments[styleAlignment],
              )}
            >
              {title}
            </h1>
          )}
        </div>
        <div className="grid grid-cols-2 gap-0">
          {!!image?.asset?.url && (
            <Image
              className={clsx(
                "h-full w-full object-cover",
                styleAlignment === "left" ? "order-1" : "order-0",
              )}
              src={image.asset.url}
              width={image.asset.metadata.dimensions.width}
              height={image.asset.metadata.dimensions.height}
              alt={title ?? ""}
            />
          )}
          <div
            className={clsx(
              "bg-white px-14 pb-14 pt-12",
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
