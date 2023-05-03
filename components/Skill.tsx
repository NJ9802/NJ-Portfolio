import React from "react";
import { motion } from "framer-motion";
import Skill from "@/types/Skill";

type Props = {
  skill: Skill;
  directionUp: boolean;
};

export default function Skill({ skill, directionUp }: Props) {
  return (
    <div className="group flex cursor-pointer">
      <motion.img
        initial={{ y: directionUp ? 60 : -60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="rounded-full border border-gray-500 object-cover p-2 w-16 h-16 md:w-18 md:h-18 xl:w-18 xl:h-18
        group-hover:grayscale transition duration-300 ease-in-out]"
        src={skill.logo}
        alt={skill.title}
        loading="lazy"
      />
      <div
        className="absolute opacity-0 group-hover:opacity-90 transition duration-300
      ease-in-out group-hover:bg-white w-16 h-16 md:w-18 md:h-18 xl:w-18 xl:h-18 rounded-full z-0"
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-xs md:text-md font-bold text-black opacity-100">
            {skill.title}
          </p>
        </div>
      </div>
    </div>
  );
}
