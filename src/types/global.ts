import {
  SanityFooter,
  SanityHeader,
  SanitySetting,
} from "@/sanity/types/documents";
import { SanityPageMeta } from "@/sanity/types/objects";
import type { Session } from "next-auth";

export type GlobalPageProps = {
  footer?: SanityFooter | null;
  header?: SanityHeader | null;
  pageMeta?: SanityPageMeta | null;
  preview?: string | null;
  session?: Session | null;
  setting?: SanitySetting | null;
};

export type FormAPIResponse = {
  error?: boolean;
  message: string;
};
