"use client";

// Deine bestehende Navigation-Komponente, aber mit einem Wrapper:
import { useEffect, useState } from "react";
import { NavigationProps } from "./types";
import StaticNavigation from "./StaticNavigation";
import DynamicNavigation from "./DynamicNavigation"; // Die ursprüngliche Navigation-Komponente

export default function ClientNavigation(props: NavigationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <StaticNavigation {...props} />;
  }

  return <DynamicNavigation {...props} />;
}
