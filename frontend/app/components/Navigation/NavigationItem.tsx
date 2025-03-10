import { IconType, Sitemap } from "@/app/types/sitemap";
import { Button } from "../ui/button";
import Link from "next/link";
import { Home, Calendar, Info, Phone, Music, Church } from "lucide-react";

const iconMap: Record<IconType, typeof Home> = {
  home: Home,
  calendar: Calendar,
  info: Info,
  phone: Phone,
  music: Music,
  church: Church,
};

interface NavigationItemProps {
  item: Sitemap;
  isMobile: boolean;
  closeMenu: () => void;
  scrollData: {
    progress: number;
  };
  mounted: boolean;
  getTextColor: () => string;
}
export function NavigationItem({
  item,
  isMobile,
  closeMenu,
  scrollData,
  mounted,
  getTextColor,
}: NavigationItemProps) {
  const icon = (item.icon ?? "home") as IconType;
  const IconComponent = iconMap[icon] || Home;
  const hasChildren = item.children && item.children.length > 0;

  const buttonStyles = isMobile
    ? "w-full justify-end text-lg font-medium"
    : `flex items-center gap-2 transition-all duration-500 ${mounted ? getTextColor() : "text-white"}`;

  const linkStyles = isMobile
    ? `flex items-center gap-3 ${
        scrollData.progress > 0.5
          ? "text-gray-800 hover:text-[#D40000]"
          : "text-white hover:text-gray-200"
      }`
    : "";

  const iconStyles = isMobile
    ? "h-5 w-5"
    : `transition-all duration-500 ${scrollData.progress > 0.5 ? "h-4 w-4" : "h-5 w-5"}`;

  const getHref = (slug?: string) => {
    if (!slug) return "#";
    return `/${slug}`;
  };

  return (
    <div
      key={item.title}
      className={isMobile ? "w-full py-2" : "relative group"}
    >
      <Button
        variant="ghost"
        asChild
        className={buttonStyles}
        onClick={isMobile ? () => closeMenu() : undefined}
      >
        <Link href={getHref(item.page?.slug.current)} className={linkStyles}>
          {isMobile && <span>{item.title}</span>}
          <IconComponent className={iconStyles} />
          {!isMobile && <span>{item.title}</span>}
        </Link>
      </Button>

      {hasChildren &&
        (isMobile ? (
          <div className="pr-8 mt-2 space-y-2">
            {item.children?.map((child) => (
              <Button
                key={child.title}
                variant="ghost"
                asChild
                className="w-full justify-end"
                onClick={() => closeMenu()}
              >
                <Link
                  href={child.page ? `/${child.page.slug.current}` : "#"}
                  className={`block text-sm text-right ${
                    scrollData.progress > 0.5
                      ? "text-gray-600 hover:text-[#D40000]"
                      : "text-gray-200 hover:text-white"
                  }`}
                >
                  {child.title}
                </Link>
              </Button>
            ))}
          </div>
        ) : (
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
        ))}
    </div>
  );
}
