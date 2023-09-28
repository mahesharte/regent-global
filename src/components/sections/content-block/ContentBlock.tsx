import type { SanitySection } from "@/sanity/types/documents";
import type { FC } from "react";

import { ContentBlock as ContentBlockComponent } from "@/components/ContentBlock";
import RichText from "@/components/richtext/RichText";
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
      verticalAlign={section.styleVerticalAlignment}
      heading={section.title ?? ""}
      image={section.image ?? undefined}
      body={
        <RichText value={section.content ?? []} defaultClassNames="standard" />
      }
      cta={(section.buttons ?? []).map((button) => ({
        text: button.title ?? button.link?.title,
        url: button.link?.url ?? "",
      }))}
    />
  );
};

export default ContentBlock;
