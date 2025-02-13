import Link from "next/link";

interface NavigationTitleProps {
    siteTitle: string;
    mounted: boolean;
    getScale: () => number;
    getFontWeight: () => string;
    getTitleColor: () => string;
}

export function NavigationTitle({ 
    siteTitle, 
    mounted, 
    getScale, 
    getFontWeight, 
    getTitleColor 
}: NavigationTitleProps) {
    return (
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
    );
} 