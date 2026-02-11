import type { SanitySection } from "@/sanity/types/documents";
import type { FC } from "react";

import { ContentBlock as ContentBlockComponent } from "@/components/ContentBlock";
import RichText from "@/components/richtext/RichText";
import VideoRenderer from "@/components/VideoRenderer";
import useDynamicStyles from "@/lib/hooks/useDynamicStyles";
import { SanityButton } from "@/sanity/types/objects";
import { useSectionStyles } from "../utils";

type Props = {
  section: SanitySection;
};

const ContentBlock: FC<Props> = ({ section }) => {
  const styles = useSectionStyles(section, ["margin", "padding"]);
  const { className, ref } = useDynamicStyles<HTMLDivElement>(styles);

  // Determine media to display: video takes precedence over image if both exist
  const media = section.video?.mediaType ? (
    <VideoRenderer video={section.video} className="w-full" />
  ) : section.image ? (
    section.image
  ) : undefined;

  return (
    <ContentBlockComponent
      ref={ref}
      className={className}
      align={section.styleAlignment ?? "left"}
      verticalAlign={section.styleVerticalAlignment}
      heading={section.title ?? ""}
      image={media as any}
      animateImage={section.animateImage}
      body={
        <RichText value={section.content ?? []} defaultClassNames="standard" />
      }
      cta={section.buttons as SanityButton[]}
    />
  );
};

export default ContentBlock;
