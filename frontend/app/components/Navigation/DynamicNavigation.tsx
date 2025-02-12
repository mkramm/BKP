"use client";

import { Home, Calendar, Info, Phone, Music } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Sitemap, IconType } from '@/app/types/sitemap';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationProps } from "./types";

const iconMap: Record<IconType, typeof Home> = {
    home: Home,
    calendar: Calendar,
    info: Info,
    phone: Phone,
    music: Music
};

export default function DynamicNavigation({ sitemapData, siteTitle }: NavigationProps) {
    const [mounted, setMounted] = useState(false);
    const [initialMount, setInitialMount] = useState(true);
    const [scrollData, setScrollData] = useState({
        progress: 0,
        isScrolled: false
    });
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => setInitialMount(false), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const progress = Math.min(scrollPosition / 100, 1);
            setScrollData({
                progress,
                isScrolled: scrollPosition > 50
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [mounted]);

    const getBackgroundColor = () => {
        const opacity = Math.min(
            0.95, // --nav-bg-opacity-final
            0.4 + (scrollData.progress * 0.55) // --nav-bg-opacity-initial + transition
        );
        if (scrollData.progress < 0.3) {
            return `rgba(26, 31, 44, ${opacity})`; // Dark start color
        } else if (scrollData.progress < 0.6) {
            return `rgba(64, 69, 82, ${opacity})`; // Mid transition color
        } else if (scrollData.progress < 0.9) {
            return `rgba(128, 133, 146, ${opacity})`; // Lighter transition color
        } else {
            return `rgba(255, 255, 255, ${opacity})`; // Final white color
        }
    };

    const getHeight = () => {
        return scrollData.isScrolled 
            ? 'var(--nav-height-scrolled)' 
            : 'var(--nav-height-initial)';
    };

    const getTextColor = () => {
        return scrollData.progress > 0.5 ? 'text-gray-800' : 'text-white';
    };

    const getScale = () => {
        return scrollData.isScrolled ? 0.8 : 1;
    };

    const getFontWeight = () => {
        // Transition from bold (700) to normal (400)
        const maxWeight = 700;
        const minWeight = 400;
        const weightDiff = maxWeight - minWeight;
        return Math.round(maxWeight - (weightDiff * scrollData.progress));
    };

    const renderNavContent = () => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex justify-between items-center h-full">
                <div className="flex items-center">
                    <Link href="/">
                        <span
                            style={{
                                transform: `scale(${getScale()})`,
                                transition: 'all 0.5s ease-in-out',
                                fontWeight: getFontWeight()
                            }}
                            className={mounted && scrollData.progress > 0.5 
                                ? "text-2xl text-gray-800" 
                                : "text-2xl text-white"}
                        >
                            {siteTitle}
                        </span>
                    </Link>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                    {sitemapData.map((item) => {
                        const icon = (item.icon ?? 'home') as IconType;
                        const IconComponent = iconMap[icon];
                        const hasChildren = item.children && item.children.length > 0;
                        
                        return (
                            <div key={item.title} className="relative group">
                                <Button
                                    variant="ghost"
                                    asChild
                                    className={`flex items-center gap-2 text-sm ${mounted ? getTextColor() : 'text-white'}`}
                                >
                                    <Link href={item.page ? `/${item.page.slug.current}` : "#"}>
                                        <IconComponent className="h-4 w-4" />
                                        <span>{item.title}</span>
                                    </Link>
                                </Button>
                                
                                {hasChildren && (
                                    <div className="absolute left-0 hidden group-hover:block pt-2">
                                        <div className="bg-white rounded-md shadow-lg p-2 min-w-[200px]">
                                            {item.children?.map((child) => (
                                                <Link
                                                    key={child.title}
                                                    href={child.page ? `/${child.page.slug.current}` : "#"}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                                >
                                                    {child.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-lg"
            style={{
                backgroundColor: mounted ? getBackgroundColor() : 'transparent',
                height: mounted ? getHeight() : 'var(--nav-height-initial)',
                transition: initialMount ? 'none' : 'all 0.5s ease-in-out'
            }}
        >
            {renderNavContent()}
        </nav>
    );
} 