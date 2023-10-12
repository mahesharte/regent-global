import imageUrlBuilder from "@sanity/image-url";

import { getClient } from "../client";
import { SanityImage } from "../types/documents";

const builder = (image: SanityImage) =>
  imageUrlBuilder(getClient()).image(image);

export default builder;
