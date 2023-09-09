"use client";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Footer({}: Props) {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const scrollableDiv = document.getElementById("mainDiv");
    let onScroll: () => void;
    if (scrollableDiv) {
      onScroll = () => setScrollPosition(scrollableDiv.scrollTop);

      scrollableDiv.addEventListener("scroll", onScroll);
    }

    return () => {
      scrollableDiv?.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {scrollPosition !== 0 && (
        <footer className="fixed bottom-5 w-full">
          <div className="flex items-center justify-center">
            <a href="#hero">
              <ArrowUpIcon
                className="h-6 w-6 opacity-20 rounded-full
        hover:opacity-80 hover:animate-bounce transition"
              />
            </a>
          </div>
        </footer>
      )}
    </>
  );
}
