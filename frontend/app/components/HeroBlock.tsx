"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/app/utils/image";

interface HeroBlockProps {
  title: string;
  subtitle: string;
  image: any;
  darkMode: boolean;
}

const HeroBlock: React.FC<HeroBlockProps> = ({
  title,
  subtitle,
  image,
  darkMode,
}) => {
  const overlayClass = darkMode ? "bg-black/50" : "bg-white/50";
  const textClass = darkMode ? "text-white" : "text-black";

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {windowSize.width > 0 && windowSize.height > 0 && (
        <Image
          src={urlFor(image).url()}
          alt={title}
          width={windowSize.width}
          height={windowSize.height}
          style={{ objectFit: "cover" }}
          priority // Add priority for above the fold image
        />
      )}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center ${overlayClass}`}
      >
        <h1 className={`text-5xl font-bold ${textClass}`}>{title}</h1>
        <p className={`text-2xl mt-4 ${textClass}`}>{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroBlock;
