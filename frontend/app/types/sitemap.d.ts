import { Document } from '@sanity/client';

export type IconType = 'home' | 'calendar' | 'info' | 'phone' | 'music';

export interface Sitemap extends Document {
  _id: string;
  title: string;
  icon?: IconType;
  url: string;
  page?: {
    _id: string;
    _type: 'page';
    slug: {
      _type: 'slug';
      current: string;
    };
  };
  children?: Sitemap[];
}

