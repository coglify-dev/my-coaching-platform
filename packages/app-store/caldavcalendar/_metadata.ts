import type { AppMeta } from "@calcom/types/App";

import _package from "./package.json";

export const metadata = {
  name: "CalDav (Beta)",
  description: _package.description,
  installed: true,
  type: "caldav_calendar",
  title: "CalDav (Beta)",
  variant: "calendar",
  category: "calendar",
  categories: ["calendar"],
  logo: "icon.svg",
  publisher: "Coglify.com",
  slug: "caldav-calendar",
  url: "https://coglify.com/",
  email: "ali@coglify.com",
  dirName: "caldavcalendar",
} as AppMeta;

export default metadata;
