"use client";
import React from "react";
import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";
import Skill from "./Skill";
import SkillType from "@/types/Skill";

type Props = {
  skills: SkillType[];
};

export default function Skills({ skills }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen
    justify-center xl:space-y-0 items-center mx-auto"
    >
      <SectionHeader title="Skills" />

      <h3 className="absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a skill for skill name
      </h3>

      <div className="grid grid-cols-4 gap-5">
        {skills.map((skill, i) => (
          <Skill
            key={skill._id}
            skill={skill}
            directionUp={i + 1 > skills.length / 2 ? true : false}
          />
        ))}
      </div>
    </motion.div>
  );
}
