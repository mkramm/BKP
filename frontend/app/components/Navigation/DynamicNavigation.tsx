"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavigationProps } from "./types";
import { NavigationTitle } from "./NavigationTitle";
import { NavigationItemList } from "./NavigationItemList";
import { NavigationMenuButton } from "./NavigationMenuButton";

export default function DynamicNavigation({ sitemapData, siteTitle }: NavigationProps) {
    const [mounted, setMounted] = useState(false);
    const [initialMount, setInitialMount] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollData, setScrollData] = useState({
        progress: 0,
        isScrolled: false
    });

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
        return Math.round(maxWeight - (weightDiff * scrollData.progress)).toString();
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
                minHeight: mounted ? getHeight() : '120px',
                transition: initialMount ? 'none' : 'all 0.5s ease-in-out'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div
                    style={{ height: mounted ? getHeight() : '120px' }}
                    className="flex justify-between items-center transition-all duration-500"
                >
                    <NavigationTitle
                        siteTitle={siteTitle}
                        mounted={mounted}
                        getScale={getScale}
                        getFontWeight={getFontWeight}
                        getTitleColor={getTitleColor}
                    />

                    {/* Desktop Navigation */}
                    <NavigationItemList
                        className="hidden md:flex items-center space-x-4"
                        sitemapData={sitemapData}
                        scrollData={scrollData}
                        mounted={mounted}
                        getTextColor={getTextColor}
                    />

                    {/* Mobile Menu Button */}
                    <NavigationMenuButton
                        className="flex md:hidden"
                        isMobileMenuOpen={isMobileMenuOpen}
                        toggleMobileMenu={toggleMobileMenu}
                        scrollData={scrollData}
                    />
                </div>

                {/* Mobile Menu */}
                <NavigationItemList
                    className={`md:hidden ${isMobileMenuOpen
                        ? 'flex flex-col items-end pt-4'
                        : 'hidden'
                        }`}
                    sitemapData={sitemapData}
                    scrollData={scrollData}
                    mounted={mounted}
                    getTextColor={getTextColor}
                    isMobile={true}
                    closeMenu={() => setIsMobileMenuOpen(false)}
                />
            </div>
        </nav >
    );
} 