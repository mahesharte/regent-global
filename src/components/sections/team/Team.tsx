import type { SanityPerson, SanitySection } from "@/sanity/types/documents";
import type { FC } from "react";
import sortBy from "lodash/sortBy";

import {
  GradientDirection,
  TeamImage,
  gradientDirections,
} from "@/components/TeamImage";
import useDynamicStyles from "@/lib/hooks/useDynamicStyles";
import { useSectionStyles } from "../utils";

type Props = {
  section: SanitySection;
  team: SanityPerson[];
};

const showGradient = false;

const Team: FC<Props> = ({ section, team }) => {
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
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 pt-20 md:grid-cols-3 md:gap-10 lg:grid-cols-4 lg:gap-20 xl:gap-24">
          {sortBy(team, "name").map((person, index) => (
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
