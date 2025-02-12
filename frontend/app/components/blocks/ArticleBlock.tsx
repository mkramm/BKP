interface ArticleBlockProps {
  Headline: string;
  content: string;
}

export function ArticleBlock({ Headline, content }: ArticleBlockProps) {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-6">{Headline}</h2>
      <div className="prose max-w-none">
        <span>TEST</span>
        {content}
      </div>
    </article>
  );
} 