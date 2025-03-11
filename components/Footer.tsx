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
    <motion.div style={{ translateY: y }} className="fixed bottom-5 px-10">
      <div className="flex items-center justify-start">
        <a href="#hero">
          <div className="group p-3">
            <ArrowUpIcon className="h-8 w-8 opacity-40 group-hover:opacity-80 group-hover:animate-bounce transition" />
          </div>
        </a>
      </div>
    </motion.div>
  );
}
