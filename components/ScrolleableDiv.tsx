"use client";

import { ScrollContext } from "../context/scrollContext";
import React, { useContext } from "react";

interface ScrolleableDivProps {
  children: React.ReactNode;
}

const ScrolleableDiv: React.FC<ScrolleableDivProps> = ({ children }) => {
  const { scrollRef } = useContext(ScrollContext);
  return (
    <div
      ref={scrollRef}
      id="mainDiv"
      className="h-screen overflow-y-auto overflow-x-hidden md:scrollbar-thin md:scrollbar-track-gray-400/20 md:scrollbar-thumb-accent/80 
    scroll-smooth"
    >
      {children}
    </div>
  );
};

export default ScrolleableDiv;
