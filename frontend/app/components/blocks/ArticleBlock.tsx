import React from 'react';

interface ArticleBlockProps {
  Headline: string;
  content: any[];
}

export function ArticleBlock({ Headline, content }: ArticleBlockProps) {
  console.log(content);
  return (
    <article className="max-w-4xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-6">{Headline}</h2>
      <div className="prose max-w-none text-gray-900">
        {content.map((block: any) => (
          <div key={block._key}>
            {block.children.map((child: any) => {
              const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote'];
              const Tag = validTags.includes(child.style) ? child.style : 'p';
              console.log(block);
              const isListItem = block.listItem === 'bullet' || block.listItem === 'number';
              const ListTag = block.listItem === 'bullet' ? 'ul' : block.listItem === 'number' ? 'ol' : null;

              console.log(isListItem, ListTag);
              return (
                isListItem ? (
                  ListTag ? (
                    React.createElement(ListTag, { key: block._key, className: block.listItem === 'bullet' ? 'list-disc pl-5' : 'list-decimal pl-5' },
                      React.createElement('li', { key: child._key },
                        child.marks && child.marks.length > 0 ? (
                          child.marks.reduce((acc: any, mark: any) => {
                            const className = 
                              mark === 'strong' ? 'font-bold' :
                              mark === 'em' ? 'italic' :
                              mark === 'underline' ? 'underline' :
                              mark === 'strike-through' ? 'line-through' :
                              mark === 'code' ? 'font-mono' : '';

                            return acc.map((text: string, index: number) => (
                              <span key={index} className={className}>
                                {text}
                              </span>
                            ));
                          }, [child.text])
                        ) : (
                          child.text
                        )
                      )
                    )
                  ) : (
                    React.createElement(Tag, { key: child._key },
                      child.marks && child.marks.length > 0 ? (
                        child.marks.reduce((acc: any, mark: any) => {
                          const className = 
                            mark === 'strong' ? 'font-bold' :
                            mark === 'em' ? 'italic' :
                            mark === 'underline' ? 'underline' :
                            mark === 'strike-through' ? 'line-through' :
                            mark === 'code' ? 'font-mono' : '';

                          return acc.map((text: string, index: number) => (
                            <span key={index} className={className}>
                              {text}
                            </span>
                          ));
                        }, [child.text])
                      ) : (
                        child.text
                      )
                    )
                  )
                ) : (
                  React.createElement(Tag, { key: child._key },
                    child.marks && child.marks.length > 0 ? (
                      child.marks.reduce((acc: any, mark: any) => {
                        const className = 
                          mark === 'strong' ? 'font-bold' :
                          mark === 'em' ? 'italic' :
                          mark === 'underline' ? 'underline' :
                          mark === 'strike-through' ? 'line-through' :
                          mark === 'code' ? 'font-mono' : '';

                        return acc.map((text: string, index: number) => (
                          <span key={index} className={className}>
                            {text}
                          </span>
                        ));
                      }, [child.text])
                    ) : (
                      child.text
                    )
                  )
                )
              );
            })}
          </div>
        ))}
      </div>
    </article>
  );
} 