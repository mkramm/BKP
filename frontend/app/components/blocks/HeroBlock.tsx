"use client";

import React, { useState, useEffect } from "react";
import { urlFor } from "@/app/utils/image";
import { Image } from "sanity";

interface HeroBlockProps {
  title?: string;
  subtitle: string;
  image: Image;
  titleImage?: Image;
}

export function HeroBlock({ title, titleImage, subtitle, image }: HeroBlockProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {image && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${urlFor(image).url()})`,
              transform: `translateY(${offset * 0.5}px)`,
              backgroundPosition: `center ${offset * 0.5}px`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </>
      )}
      <div className="relative z-10 text-center text-white">
      {titleImage ? (
          <img src={urlFor(titleImage).url()} alt="Title Image" className="mx-auto mb-4" />
        ) : (
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
        )}
        <p className="text-xl">{subtitle}</p>
      </div>
    </section>
  );
} 