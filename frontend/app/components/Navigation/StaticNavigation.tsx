// Server-Komponente für initialen Render
import { NavigationProps } from "./types";
import { NavigationTitle } from "./NavigationTitle";
import { NavigationItemList } from "./NavigationItemList";
import { MobileMenu } from "./MobileMenu";

export default function StaticNavigation({ sitemapData, siteTitle }: NavigationProps) {
  const staticScrollData = {
    progress: 0,
    isScrolled: false
  };

  const getTextColor = () => 'text-white hover:text-gray-200';
  const getTitleColor = () => 'text-white';
  const getScale = () => 1;
  const getFontWeight = () => '700';

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-lg"
      style={{
        backgroundColor: 'rgba(26, 31, 44, 0.4)',
        minHeight: 'var(--nav-height-initial)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-[var(--nav-height-initial)]">
          <NavigationTitle
            siteTitle={siteTitle}
            mounted={true}
            getScale={getScale}
            getFontWeight={getFontWeight}
            getTitleColor={getTitleColor}
          />

          {/* Desktop Navigation */}
          <NavigationItemList
            className="hidden md:flex items-center space-x-4"
            sitemapData={sitemapData}
            scrollData={staticScrollData}
            mounted={true}
            getTextColor={getTextColor}
          />

          <MobileMenu sitemapData={sitemapData} />
        </div>
      </div>
    </nav>
  );
}
