import React from 'react';
import { PortableText, PortableTextComponents, PortableTextComponentProps, PortableTextMarkComponentProps } from '@portabletext/react';

interface ArticleBlockProps {
  Headline: string;
  content: any[];
}

// Define the types for the custom components
const components: PortableTextComponents = {
  block: {
    h1: ({ children }: PortableTextComponentProps<any>) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({ children }: PortableTextComponentProps<any>) => <h2 className="text-2xl font-bold mb-4">{children}</h2>,
    h3: ({ children }: PortableTextComponentProps<any>) => <h3 className="text-xl font-bold mb-4">{children}</h3>,
    h4: ({ children }: PortableTextComponentProps<any>) => <h4 className="text-lg font-bold mb-4">{children}</h4>,
    h5: ({ children }: PortableTextComponentProps<any>) => <h5 className="text-base font-bold mb-4">{children}</h5>,
    h6: ({ children }: PortableTextComponentProps<any>) => <h6 className="text-sm font-bold mb-4">{children}</h6>,
    normal: ({ children }: PortableTextComponentProps<any>) => <p className="mb-4">{children}</p>,
    blockquote: ({ children }: PortableTextComponentProps<any>) => <blockquote className="border-l-4 pl-4 italic text-gray-600">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps<any>) => {
      console.log('Rendering bullet list');
      return <ul className="list-disc pl-5">{children}</ul>;
    },
    number: ({ children }: PortableTextComponentProps<any>) => {
      console.log('Rendering numbered list');
      return <ol className="list-decimal pl-5">{children}</ol>;
    },
  },
  listItem: ({ children }: PortableTextComponentProps<any>) => {
    console.log('Rendering list item');
    return <li className="mb-2">{children}</li>;
  },
  marks: { 
    link: ({ value, children }: PortableTextMarkComponentProps) => (
      <a href={value?.href} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export function ArticleBlock({ Headline, content }: ArticleBlockProps) {
  console.log(content);
  return (
    <article className="max-w-4xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-6">{Headline}</h2>
      <div className="prose max-w-none text-gray-900">
        <PortableText value={content} components={components} />
      </div>
    </article>
  );
} 