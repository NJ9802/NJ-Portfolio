"use client";

import { MotionValue, useScroll } from "framer-motion";
import React, { createContext, useRef } from "react";

export const ScrollContext = createContext<{
  scrollRef: React.MutableRefObject<null>;
  scrollY: MotionValue<number> | number;
}>({ scrollRef: { current: null }, scrollY: 0 });

const ScrollContextProvider = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef(null);
  const { scrollY } = useScroll({ container: scrollRef });

  return (
    <ScrollContext.Provider value={{ scrollRef, scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollContextProvider;
