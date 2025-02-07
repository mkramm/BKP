// components/Navigation.tsx
import Link from "next/link";
import { Sitemap } from "@/app/types/sitemap";

interface NavigationProps {
  sitemapData: Sitemap[];
}

const Navigation: React.FC<NavigationProps> = ({ sitemapData }) => {
  const renderNavigation = (items: Sitemap[]) => {

    return (
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.page && (
              <Link href={`/${item.page.slug.current}`}>{item.title}</Link>
            )}
            {item.children && renderNavigation(item.children)}
          </li>
        ))}
      </ul>
    );
  };

  return <nav>{renderNavigation(sitemapData)}</nav>;
};

export default Navigation;
