import type { SanitySection } from "@/sanity/types/documents";
import { PortableText } from "@portabletext/react";
import type { FC } from "react";

import { ContentBlock as ContentBlockComponent } from "@/components/ContentBlock";
import useDynamicStyles from "@/lib/hooks/useDynamicStyles";
import { useSectionStyles } from "../utils";

type Props = {
  section: SanitySection;
};

const ContentBlock: FC<Props> = ({ section }) => {
  const styles = useSectionStyles(section, ["margin", "padding"]);
  const { className, ref } = useDynamicStyles<HTMLDivElement>(styles);
  return (
    <ContentBlockComponent
      ref={ref}
      className={className}
      align={section.styleAlignment ?? "left"}
      heading={section.title ?? ""}
      image={section.image?.asset?.url}
      body={<PortableText value={section.content ?? []} />}
      cta={(section.buttons ?? []).map((button) => ({
        text: button.title ?? button.link?.title,
        url: button.link?.url ?? "",
      }))}
    />
  );
};

export default ContentBlock;
