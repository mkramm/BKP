import { Document } from '@sanity/client';

export interface Sitemap extends Document {
  _id: string;
  title: string;
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