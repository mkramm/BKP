import React from 'react'

interface ArticleBlockProps {
  content: string
}

const ArticleBlock: React.FC<ArticleBlockProps> = ({ content }) => {
  return (
    <div className="text">
      <p>{content}</p>
    </div>
  )
}

export default ArticleBlock