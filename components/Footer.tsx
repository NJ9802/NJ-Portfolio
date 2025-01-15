"use client";
import React, { useContext } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

import { ScrollContext } from "../context/scrollContext";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

type Props = {};

export default function Footer({}: Props) {
  const { scrollY } = useContext(ScrollContext);
  const translateY = useSpring(scrollY);
  const y = useTransform(translateY, [0, 750], [100, 0]);

  return (
    <motion.footer
      style={{ translateY: y }}
      className="fixed bottom-5 w-full px-10"
    >
      <div className="flex items-center justify-end">
        <a href="#hero">
          <ArrowUpIcon
            className="h-6 w-6 opacity-20 rounded-full
        hover:opacity-80 hover:animate-bounce transition"
          />
        </a>
      </div>
    </motion.footer>
  );
}
