import type { SanitySection } from "@/sanity/types/documents";
import type { FC } from "react";

import { BigNumbers as BigNumbersComponent } from "@/components/BigNumbers";
import RichText from "@/components/richtext/RichText";
import { useSectionStyles } from "../utils";
import useDynamicStyles from "@/lib/hooks/useDynamicStyles";

type Props = {
  section: SanitySection;
};

const BigNumbers: FC<Props> = ({ section }) => {
  const styles = useSectionStyles(section, ["gradient", "margin", "padding"]);
  const { className, ref } = useDynamicStyles<HTMLDivElement>(styles);
  return (
    <BigNumbersComponent
      ref={ref}
      className={className}
      headline={section.title ?? ""}
      items={(section.items ?? []).map((item) => ({
        number: item.title,
        imageUrl: item.image?.asset?.url ?? "",
        subText: <RichText value={item.content ?? []} />,
      }))}
    />
  );
};

export default BigNumbers;
