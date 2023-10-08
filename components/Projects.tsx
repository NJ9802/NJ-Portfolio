"use client";
import React, { useRef, useState } from "react";
import clsx from "clsx";
import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";
import Project from "@/types/Project";
import ProjectSection from "./ProjectSection";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = {
  projects: Project[];
};

const ScrollButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  className: string;
}> = ({ children, onClick, className }) => {
  return (
    <button
      className={clsx(
        "hidden absolute z-40 lg:flex opacity-20 transition duration-500 hover:opacity-100",
        className && className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default function Projects({ projects }: Props) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollType: string) => {
    const container = scrollRef.current;

    if (container) {
      const scrollWidth = container.scrollWidth - container.clientWidth;
      let newPosition;
      if (scrollType === "left" && scrollPosition !== 0) {
        newPosition = scrollPosition - container.clientWidth;
        setScrollPosition(newPosition);
        container.scrollTo({
          left: newPosition,
          behavior: "smooth",
        });
      } else if (scrollType === "right" && scrollPosition !== scrollWidth) {
        newPosition = scrollPosition + container.clientWidth;
        setScrollPosition(newPosition);
        container.scrollTo({
          left: newPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 300 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row
    max-w-full justify-evenly mx-auto items-center z-0"
    >
      <SectionHeader title="Proyectos" />
      {scrollPosition !== 0 && (
        <ScrollButton className="left-20" onClick={() => handleScroll("left")}>
          <ChevronLeftIcon className="h-24 w-24 text-gray-500" />
        </ScrollButton>
      )}

      <div
        ref={scrollRef}
        className="relative mt-6 md:mt-12 w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20
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
      {scrollPosition !==
        scrollRef.current?.clientWidth! * (projects.length - 1) && (
        <ScrollButton
          className="right-20"
          onClick={() => handleScroll("right")}
        >
          <ChevronRightIcon className="h-24 w-24 text-gray-500" />
        </ScrollButton>
      )}
      <div className="w-full absolute top-[30%] bg-[#38bdf8]/10 left-0 h-[26rem] -skew-y-12" />
    </motion.div>
  );
}
