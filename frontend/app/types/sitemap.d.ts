import { Document } from "@sanity/client";

export type IconType =
  | "home"
  | "calendar"
  | "info"
  | "phone"
  | "music"
  | "church";

export interface Sitemap extends Document {
  _id: string;
  title: string;
  icon?: IconType;
  page?: {
    _id: string;
    _type: "page";
    slug: {
      _type: "slug";
      current: string;
    };
  };
  children?: Sitemap[];
}
