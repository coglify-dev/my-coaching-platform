import type { AppMeta } from "@calcom/types/App";

import _package from "./package.json";

export const metadata = {
  name: "Giphy",
  description: _package.description,
  installed: true,
  categories: ["other"],
  logo: "icon.svg",
  publisher: "Coglify.com",
  slug: "giphy",
  title: "Giphy",
  type: "giphy_other",
  url: "https://coglify.com/apps/giphy",
  variant: "other",
  extendsFeature: "EventType",
  email: "help@coglify.com",
  dirName: "giphy",
} as AppMeta;

export default metadata;
