'use client';

import { useState } from "react";
import { NavigationItemList } from "./NavigationItemList";
import { NavigationMenuButton } from "./NavigationMenuButton";
import { Sitemap } from "@/app/types/sitemap";

interface MobileMenuProps {
    sitemapData: Sitemap[];
}

export function MobileMenu({ sitemapData }: MobileMenuProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const staticScrollData = {
        progress: 0,
        isScrolled: false
    };

    const getTextColor = () => 'text-white hover:text-gray-200';

    return (
        <>
            <NavigationMenuButton
                className="flex md:hidden"
                isMobileMenuOpen={isMobileMenuOpen}
                toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                scrollData={staticScrollData}
            />
            
            <NavigationItemList
                className={`md:hidden ${isMobileMenuOpen ? 'flex flex-col items-end pt-4' : 'hidden'}`}
                sitemapData={sitemapData}
                scrollData={staticScrollData}
                mounted={true}
                getTextColor={getTextColor}
                isMobile={true}
                closeMenu={() => setIsMobileMenuOpen(false)}
            />
        </>
    );
} 