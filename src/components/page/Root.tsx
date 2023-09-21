import type { FC } from "react";

import Page from "./Page";
import Preview from "./Preview";
import { useAppContext } from "@/components/app/context";
import { PageProps } from "./types";

const RootPage: FC<PageProps> = (props) => {
  const [{ preview }] = useAppContext();
  return preview.active ? <Preview {...props} /> : <Page {...props} />;
};

export default RootPage;
