"use client";

import { Home, Calendar, Info, Phone, Music, X } from "lucide-react";
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        const baseHeight = 120; // Increased starting height
        const minHeight = 56; // End height
        const heightDiff = baseHeight - minHeight;
        return `${baseHeight - (heightDiff * scrollData.progress)}px`;
    };

    const getTextColor = () => {
        return scrollData.progress > 0.5 
            ? 'text-gray-800 hover:text-[#D40000]' 
            : 'text-white hover:text-gray-200';
    };

    const getTitleColor = () => {
        return scrollData.progress > 0.5 
            ? 'text-[#D40000]' 
            : 'text-white';
    };

    const getScale = () => {
        return 1 - (scrollData.progress * 0.1); // Smooth scale from 1 to 0.9
    };

    const getFontWeight = () => {
        // Transition from bold (700) to normal (400)
        const maxWeight = 700;
        const minWeight = 400;
        const weightDiff = maxWeight - minWeight;
        return Math.round(maxWeight - (weightDiff * scrollData.progress));
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-lg"
            style={{
                backgroundColor: mounted ? getBackgroundColor() : 'transparent',
                height: isMobileMenuOpen ? 'auto' : (mounted ? getHeight() : '120px'),
                maxHeight: isMobileMenuOpen ? '100vh' : 'auto',
                minHeight: isMobileMenuOpen ? getHeight() : 'auto',
                transition: initialMount ? 'none' : 'all 0.5s ease-in-out'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div 
                    style={{ height: mounted ? getHeight() : '120px' }}
                    className="flex justify-between items-center transition-all duration-500"
                >
                    {/* Logo/Title Section */}
                    <div className="flex items-center h-full">
                        <Link href="/">
                            <span
                                style={{
                                    transform: `scale(${getScale()})`,
                                    transition: 'all 0.5s ease-in-out',
                                    fontWeight: getFontWeight()
                                }}
                                className={`text-2xl ${mounted ? getTitleColor() : 'text-white'} transition-colors duration-500`}
                            >
                                {siteTitle}
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {sitemapData.map((item) => {
                            const icon = (item.icon ?? 'home') as IconType;
                            const IconComponent = iconMap[icon];
                            const hasChildren = item.children && item.children.length > 0;
                            
                            return (
                                <div key={item.title} className="relative group">
                                    <Button
                                        variant="ghost"
                                        asChild
                                        className={`flex items-center gap-2 transition-all duration-500 ${mounted ? getTextColor() : 'text-white'}`}
                                    >
                                        <Link href={item.page ? `/${item.page.slug.current}` : "#"}>
                                            <IconComponent className={`transition-all duration-500 ${
                                                scrollData.progress > 0.5 ? "h-4 w-4" : "h-5 w-5"
                                            }`} />
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
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#D40000] rounded-md"
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

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={toggleMobileMenu}
                            className={`transition-colors duration-500 ${
                                scrollData.progress > 0.5 ? "text-gray-800" : "text-white"
                            }`}
                        >
                            <span className="sr-only">
                                {isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                            </span>
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden ${
                        isMobileMenuOpen 
                            ? 'flex flex-col items-end pt-4'
                            : 'hidden'
                    }`}
                >
                    {sitemapData.map((item) => {
                        const icon = (item.icon ?? 'home') as IconType;
                        const IconComponent = iconMap[icon];
                        const hasChildren = item.children && item.children.length > 0;

                        return (
                            <div key={item.title} className="w-full py-2">
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="w-full justify-end text-lg font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Link 
                                        href={item.page ? `/${item.page.slug.current}` : "#"}
                                        className={`flex items-center gap-3 ${
                                            scrollData.progress > 0.5 
                                                ? 'text-gray-800 hover:text-[#D40000]' 
                                                : 'text-white hover:text-gray-200'
                                        }`}
                                    >
                                        <span>{item.title}</span>
                                        <IconComponent className="h-5 w-5" />
                                    </Link>
                                </Button>

                                {hasChildren && (
                                    <div className="pr-8 mt-2 space-y-2">
                                        {item.children?.map((child) => (
                                            <Button
                                                key={child.title}
                                                variant="ghost"
                                                asChild
                                                className="w-full justify-end"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <Link
                                                    href={child.page ? `/${child.page.slug.current}` : "#"}
                                                    className={`block text-sm text-right ${
                                                        scrollData.progress > 0.5 
                                                            ? 'text-gray-600 hover:text-[#D40000]' 
                                                            : 'text-gray-200 hover:text-white'
                                                    }`}
                                                >
                                                    {child.title}
                                                </Link>
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
} 