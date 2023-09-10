import Project from "@/types/Project";
import React from "react";
import Image from "next/image";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useMouse } from "@mantine/hooks";
import { useElementSize } from "@mantine/hooks";
import { useState } from "react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

type Props = {
  project: Project;
  i: number;
  totalProjects: number;
};

function Project({ project, i, totalProjects }: Props) {
  const { ref: circleEl, width, height } = useElementSize();
  const { ref: cardEl, x, y } = useMouse();
  const [position, setPosition] = useState({ left: -1000, top: -1000 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = () => {
    setOpacity(1);
    setPosition({
      left: x - width / 2,
      top: y - height / 2,
    });
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <article
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
        className="hidden xs:block w-auto h-28 xl:w-60 xl:h-auto rounded-xl"
      />
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={cardEl}
        className="relative overflow-hidden h-fit space-y-4 px-0 md:px-10 max-w-6xl
      bg-black/10 backdrop-blur-md rounded-lg p-5 xl:min-w-[894px]"
      >
        <div className="flex justify-center items-center space-x-2">
          <h4 className="text-md  text-white xl:text-2xl font-semibold">
            <span className="underline decoration-[#38bdf8]/50">
              Proyecto {i + 1} de {totalProjects}:
            </span>{" "}
            {project.title}
          </h4>
          <span className="md:hidden">
            <a href={project.linkToDemo}>
              <GlobeAltIcon className="h-4 w-4 text-gray-500" />
            </a>
          </span>
        </div>

        <div className="flex items-center justify-center space-x-2">
          {project.technologies.map((technology) => (
            <Image
              className="hover:scale-125 transition-transform duration-300"
              width={24}
              height={24}
              key={technology._id}
              src={technology.logo}
              alt={technology.title}
            />
          ))}
        </div>
        <div className="px-5">
          <p className="text-xs md:text-sm whitespace-pre-line">
            {project.summary}
          </p>
        </div>
        <div className="absolute top-1 right-2 flex">
          <a
            className="projectLink group"
            href={project.linkToBuild}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex w-full space-x-1 items-center justify-center">
              <CodeBracketIcon
                className="group-hover:text-[#38bdf8] h-4 w-4 text-gray-500 
          transition-all duration-500"
              />
              <p>Code</p>
            </div>
          </a>

          <a
            className="projectLink group"
            href={project.linkToDemo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex w-full space-x-1 items-center justify-center">
              <ArrowTopRightOnSquareIcon
                className="group-hover:text-[#38bdf8] h-4 w-4 text-gray-500 
          transition-all duration-500"
              />
              <p>Live</p>
            </div>
          </a>
        </div>

        <div
          style={{
            left: position.left,
            top: position.top,
            opacity,
          }}
          ref={circleEl}
          className="bg-[#38bdf8] absolute scale-[1.5] blur-3xl w-20
    h-20 rounded-full -z-10 transition-opacity duration-300 hidden md:block"
        ></div>
      </div>
    </article>
  );
}

export default Project;
