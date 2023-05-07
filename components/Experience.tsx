"use client";
import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import SectionHeader from "./SectionHeader";
import Experience from "@/types/Experience";
import WithoutExperience from "./WithoutExperience";

type Props = { workExperiences: Experience[] };

export default function Experience({ workExperiences }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full px-10
    justify-evenly mx-auto items-center"
    >
      <SectionHeader title="Experience" />

      {workExperiences.length !== 0 ? (
        <div
          className={`w-full flex ${
            workExperiences.length === 1 ? "justify-center" : ""
          } space-x-5 overflow-x-scroll snap-mandatory snap-x 
      scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#38bdf8]/80`}
        >
          {workExperiences.map((workExperience) => (
            <ExperienceCard
              key={workExperience._id}
              workExperience={workExperience}
            />
          ))}
        </div>
      ) : (
        <WithoutExperience />
      )}
    </motion.div>
  );
}
