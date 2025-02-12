// components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/app/lib/utils";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  size?: "default" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<
  React.ComponentRef<"button">,
  ButtonProps
>(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  if (asChild) {
    return <Slot className={className} {...props} />;
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50",
        variant === "default" &&
          "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
        variant === "destructive" &&
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        variant === "outline" &&
          "border border-primary-600 text-primary-600 hover:bg-primary-500 hover:text-white focus:ring-primary-500",
        variant === "secondary" &&
          "bg-secondary-100 text-secondary-900 hover:bg-secondary-200 focus:ring-secondary-500",
        variant === "ghost" && "hover:bg-gray-100 dark:hover:bg-gray-800",
        size === "default" && "px-4 py-2",
        size === "icon" && "p-2",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };