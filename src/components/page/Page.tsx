import type { FC } from "react";

import Sections from "@/components/sections/Sections";
import { PageProps } from "./types";

const Page: FC<PageProps> = ({ page, sectionVariables = {} }) => (
  <Sections sections={page.sections ?? []} variables={sectionVariables} />
);

export default Page;
