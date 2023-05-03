"use client";
import React from "react";
import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";
import Project from "@/types/Project";

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
          <div
            key={project._id}
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5
          items-center justify-center p-10 md:p-44 h-screen"
          >
            <motion.img
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              alt={project.title}
              src={project.image}
              loading="lazy"
              className="w-24 h-20 xl:w-48 xl:h-32 rounded-xl"
            />
            <div
              className="space-y-4 shadow-2xl px-0 md:px-10 max-w-6xl
            bg-black/10 backdrop-blur-md rounded-lg p-5"
            >
              <h4 className="text-md text-white xl:text-2xl font-semibold text-center">
                <span className="underline decoration-[#38bdf8]/50">
                  Case Study {i + 1} of {projects.length}:
                </span>{" "}
                {project.title}
              </h4>

              <div className="flex items-center justify-center space-x-2">
                {project.technologies.map((technology) => (
                  <img
                    className="h-6 w-6"
                    key={technology._id}
                    src={technology.logo}
                    alt={technology.title}
                  />
                ))}
              </div>
              <div
                className="max-h-36 rounded-lg overflow-y-scroll p-5 md:scrollbar-thin md:scrollbar-track-black/10
                md:scrollbar-thumb-[#38bdf8] bg-blue-100/10 shadow-xl"
              >
                <p className="text-xs md:text-sm text-center md:text-left">
                  {project.summary}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full absolute top-[30%] bg-[#38bdf8]/10 left-0 h-[26rem] -skew-y-12" />
    </motion.div>
  );
}
