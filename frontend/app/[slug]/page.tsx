import client from '@/sanity/sanityClient'
import { HeroBlock } from '@/app/components/blocks/HeroBlock'
import { ArticleBlock } from '@/app/components/blocks/ArticleBlock'
import { ContactBlock } from '@/app/components/blocks/ContactBlock'

export default async function DynamicPage({
  params,
}: {
  params: { slug: string }
}) {
  const currentSlug = await Promise.resolve(params.slug);

  const pageQuery = `*[_type == "page" && slug.current == $slug][0] {
    title,
    blocks[] {
      _type,
      _key,
      title,
      subtitle,
      image,
      address,
      email,
      phone,
      contactName,
      headline,
      content,
    }
  }`

  const pageData = await client.fetch(pageQuery, { slug: currentSlug });

  if (!pageData) {
    console.error('No page data found for slug:', currentSlug); // Debugging-Log
    return <div>404 - Seite nicht gefunden</div>; // Fallback für 404
  }

  console.log('Page Data:', JSON.stringify(pageData, null, 2));

  const renderBlock = (block: any) => {
    switch (block._type) {
      case 'hero':
        return <HeroBlock key={block._key} {...block} />
      case 'article':
        return <ArticleBlock key={block._key} {...block} />
      case 'contact':
        return <ContactBlock key={block._key} {...block} />
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {pageData?.blocks?.map(renderBlock)}
    </main>
  )
} 