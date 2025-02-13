import { X } from "lucide-react";
import { Button } from "../ui/button";

interface NavigationMenuButtonProps {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    className?: string;
    scrollData: {
        progress: number;
    };
}

export function NavigationMenuButton({ isMobileMenuOpen, toggleMobileMenu, className, scrollData }: NavigationMenuButtonProps) {
    return (
        <div className={className}>
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className={`transition-colors duration-500 ${scrollData.progress > 0.5 ? "text-gray-800" : "text-white"
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
    );
}