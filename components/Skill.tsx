"use client";
import React from "react";
import { motion } from "framer-motion";
import type Skill from "../types/Skill";
import Image from "next/image";

type Props = {
  skill: Skill;
  directionUp: boolean;
  delay: number;
};

export default function Skill({ skill, directionUp, delay }: Props) {
  return (
    <div className="group flex md:cursor-pointer">
      <motion.div
        initial={{ x: directionUp ? 30 : -30, opacity: 0 }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        transition={{ duration: 1, delay }}
        viewport={{ once: true }}
      >
        <Image
          className="rounded-full border border-gray-500 object-cover p-2 w-16 h-16 md:w-18 md:h-18 xl:w-18 xl:h-18
        group-hover:grayscale transition duration-300 ease-in-out z-10]"
          src={skill.logo}
          alt={skill.title}
          width={90}
          height={90}
        />
      </motion.div>

      <div
        className="absolute opacity-0 group-hover:opacity-90 transition duration-300
      ease-in-out group-hover:bg-white w-16 h-16 md:w-18 md:h-18 xl:w-18 xl:h-18 rounded-full z-0"
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-xs md:text-md font-bold text-black opacity-100 text-center">
            {skill.title}
          </p>
        </div>
      </div>
    </div>
  );
}
