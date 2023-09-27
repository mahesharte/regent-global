import type { SanitySection } from "@/sanity/types/documents";
import type { FC } from "react";

import {
  GradientDirection,
  TeamImage,
  gradientDirections,
} from "@/components/TeamImage";
import useDynamicStyles from "@/lib/hooks/useDynamicStyles";
import { useSectionStyles } from "../utils";

type Props = {
  section: SanitySection;
};

const showGradient = false;

const Team: FC<Props> = ({ section }) => {
  const styles = useSectionStyles(section, ["margin", "padding"]);
  const { className, ref } = useDynamicStyles<HTMLDivElement>(styles);
  const directions = Object.keys(gradientDirections) as GradientDirection[];
  return (
    <div className="container mx-auto scroll-m-10">
      <div ref={ref} className={className}>
        {!!section.title && (
          <h2 className="text-center text-5xl font-black text-blue">
            {section.title}
          </h2>
        )}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 pt-20 max-md:px-4 md:gap-16 lg:gap-20 [&>*]:basis-[calc(50%-8px)] [&>*]:md:basis-1/3 [&>*]:lg:basis-1/4">
          {(section.people ?? []).map((person, index) => (
            <TeamImage
              key={person._id}
              image={person.photo?.asset?.url ?? ""}
              name={person.name ?? ""}
              title={person.title ?? ""}
              gradientDirection={
                showGradient ? directions[index % 4] : undefined
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
