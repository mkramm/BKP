import { Sitemap } from '@/app/types/sitemap';
import { NavigationItem } from './NavigationItem';


interface NavigationItemListProps {
    sitemapData: Sitemap[];
    scrollData: {
        progress: number;
        isScrolled: boolean;
    };
    mounted: boolean;
    getTextColor: () => string;
    isMobile?: boolean;
    closeMenu?: () => void;
    className?: string;
}

export function NavigationItemList({ sitemapData, scrollData, mounted, getTextColor, isMobile, closeMenu = () => {}, className }: NavigationItemListProps) {
    return (
        <div className={className}>
            {sitemapData.map((item) => {
                return (
                    <NavigationItem key={item.title} item={item} isMobile={isMobile || false} closeMenu={closeMenu} scrollData={scrollData} mounted={mounted} getTextColor={getTextColor} />
                );
            })}
        </div>
    );
}