import { Document } from '@sanity/client';

export interface Sitemap extends Document {
  _key: string;
  title: string;
  page?: {
    _type: 'page';
    slug: {
      _type: 'slug';
      current: string;
    };
  };
  children?: Sitemap[];
}