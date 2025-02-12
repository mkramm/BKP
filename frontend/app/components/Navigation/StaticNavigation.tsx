// Server-Komponente für initialen Render
import { NavigationProps } from "./types";
import React from "react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { IconType } from '@/app/types/sitemap';
import { Home, Calendar, Info, Phone, Music } from "lucide-react";

const iconMap: Record<IconType, typeof Home> = {
  home: Home,
  calendar: Calendar,
  info: Info,
  phone: Phone,
  music: Music
};

export default function StaticNavigation({ sitemapData, siteTitle }: NavigationProps) {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-lg"
      style={{
        backgroundColor: 'rgba(26, 31, 44, 0.4)', // Initial opacity
        height: 'var(--nav-height-initial)',
      }}
    >
      {/* Statischer Inhalt mit dunklem Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <Link href="/">
              <span 
                className="text-2xl text-white"
                style={{ fontWeight: 700 }}
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
                    className="flex items-center gap-2 text-sm text-white hover:text-gray-200"
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
    </nav>
  );
}
