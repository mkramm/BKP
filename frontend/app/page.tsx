import client from '@/sanity/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import { Sitemap } from '@/app/types/sitemap';
import HeroBlock from './components/HeroBlock';
import ArticleBlock from './components/ArticleBlock';
import ContactBlock from './components/ContactBlock';
import Navigation from './components/Navigation';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug || 'home';

  const query = `*[_type == "page" && slug.current == $slug][0]`;
  const page = await client.fetch(query, { slug });

  if (!page) {
    return <div>Seite nicht gefunden</div>;
  }

  const sitemapQuery = `*[_type == "sitemap"] {
    title,
    page-> {
      _key,
      _type,
      slug {
        current
      }
    },
    children[]-> {
      _key,
      title,
      page-> {
        _type,
        slug {
          current
        }
      },
      children[]-> {
        _key,
        title,
        page-> {
          _type,
          slug {
            current
          }
        },
        children[]-> {
          _key,
          title,
          page-> {
            _type,
            slug {
              current
            }
          },
        }
      }
    }
  }`;
  const sitemapData: Sitemap[] = await client.fetch(sitemapQuery);

  return (
    <div>
      <Navigation sitemapData={sitemapData} />
      {page.blocks.map((contentBlock: any) => {
        switch (contentBlock._type) {
          case 'hero':
            return <HeroBlock key={contentBlock._key} {...contentBlock} darkMode={page.darkMode} />;
          case 'article':
            return <ArticleBlock key={contentBlock._key} {...contentBlock} />;
          case 'contact':
            return <ContactBlock key={contentBlock._key} {...contentBlock} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

export async function generateStaticParams() {
  const query = `*[_type == "page"] { slug }`;
  const pages = await client.fetch(query);

  return pages.map((page: any) => ({
    slug: page.slug?.current || 'home',
  }));
}