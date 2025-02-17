import { PortableText, PortableTextComponents } from '@portabletext/react';
import React from 'react';
import {PortableTextBlock } from 'sanity'

interface ArticleBlockProps {
  Headline: string;
  content: PortableTextBlock[];
}

// Define the types for the custom components
const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mb-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-bold mb-4">{children}</h4>,
    h5: ({ children }) => <h5 className="text-base font-bold mb-4">{children}</h5>,
    h6: ({ children }) => <h6 className="text-sm font-bold mb-4">{children}</h6>,
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    blockquote: ({ children }) => <blockquote className="border-l-4 pl-4 italic text-gray-600">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => {
      console.log('Rendering bullet list');
      return <ul className="list-disc pl-5">{children}</ul>;
    },
    number: ({ children }) => {
      console.log('Rendering numbered list');
      return <ol className="list-decimal pl-5">{children}</ol>;
    },
  },
  listItem: ({ children }) => {
    console.log('Rendering list item');
    return <li className="mb-2">{children}</li>;
  },
  marks: { 
    link: ({ value, children }) => (
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