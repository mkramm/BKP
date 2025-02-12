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
  return (
    <div>
      <h1>Test</h1>
    </div>
  )
};

export default HeroBlock;
