import React from 'react';
import client from '@/sanity/sanityClient';
import { HeroBlock } from '@/app/components/blocks/HeroBlock';
import { ArticleBlock } from '@/app/components/blocks/ArticleBlock';
import { ContactBlock } from '@/app/components/blocks/ContactBlock';
import { TimelineBlock, TimelineBlockProps } from '@/app/components/blocks/TimelineBlock';
import { Image, PortableTextBlock } from 'sanity';

type HeroBlockProps = {
  _type: string;
  _key: string;
  title: string;
  subtitle: string;
  image: Image;
};

type ArticleBlockProps = {
  _type: string;
  _key: string;
  Headline: string;
  content: PortableTextBlock[];
};

type ContactBlockProps = {
  _type: string;
  _key: string;
  address: string;
  email: string;
  phone: string;
  contactName: string;
};

type BlockProps = HeroBlockProps | ArticleBlockProps | ContactBlockProps | TimelineBlockProps;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params; // Warten auf das Promise

  const pageQuery = `*[_type == "page" && slug.current == $slug][0] {
    title,
    blocks[] {
      _type,
      _key,
      title,
      titleImage,
      subtitle,
      image,
      address,
      email,
      phone,
      contactName,
      headline,
      content,
      Headline,
      entries[] {
        title,
        year,
        content,
        image {
          asset->{
            _id,
            url,
            metadata {
              lqip, // Low Quality Image Placeholder
              dimensions {
                width,
                height
              }
            }
          }
        }
      }
    }
  }`;

  const pageData = await client.fetch(pageQuery, { slug: slug });

  if (!pageData) {
    console.error('No page data found for slug:', slug); // Debugging-Log
    return <div>404 - Seite nicht gefunden</div>; // Fallback für 404
  }
  console.log('pageData', pageData);
  const renderBlock = (block: BlockProps) => {
    switch (block._type) {
      case 'hero':
        return <HeroBlock key={block._key} {...(block as HeroBlockProps)} />;
      case 'article':
        return <ArticleBlock key={block._key} {...(block as ArticleBlockProps)} />;
      case 'contact':
        return <ContactBlock key={block._key} {...(block as ContactBlockProps)} />;
      case 'timeline':
        return <TimelineBlock key={block._key} {...(block as TimelineBlockProps)} />;
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        {pageData?.blocks?.map(renderBlock)}
      </div>
    </div>
  );
}
