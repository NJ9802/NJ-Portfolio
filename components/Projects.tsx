"use client";
import React from "react";
import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";
import Project from "@/types/Project";
import ProjectSection from "./ProjectSection";

type Props = {
  projects: Project[];
};

export default function Projects({ projects }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row
    max-w-full justify-evenly mx-auto items-center z-0"
    >
      <SectionHeader title="Projects" />

      <div
        className="relative mt-12 w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20
       scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#38bdf8]/80"
      >
        {projects.map((project, i) => (
          <ProjectSection
            key={project._id}
            project={project}
            i={i}
            totalProjects={projects.length}
          />
        ))}
      </div>
      <div className="w-full absolute top-[30%] bg-[#38bdf8]/10 left-0 h-[26rem] -skew-y-12" />
    </motion.div>
  );
}
