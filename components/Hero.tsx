"use client";

import React from "react";
import BackgroundCircles from "./BackgroundCircles";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import PageInfo from "@/types/PageInfo";
import Image from "next/image";
import Experience from "@/types/Experience";

type Props = {
  pageInfo: PageInfo;
  workExperiences: Experience[];
};

export default function Hero({ pageInfo, workExperiences }: Props) {
  const [text] = useTypewriter({
    words: [
      `Hola soy ${pageInfo.name}`,
      "¡Me encanta la Ingeniería!",
      "¡Hagamos grandes cosas!",
    ],
    loop: 0,
    delaySpeed: 2000,
  });

  let sections;
  if (workExperiences.length === 0) {
    sections = ["sobre mí", "habilidades", "proyectos"];
  } else {
    sections = ["sobre mí", "experience", "habilidades", "proyectos"];
  }

  return (
    <div className="h-screen pt-16 flex flex-col items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />
      <Image
        priority
        className="relative shadow-md rounded-full mx-auto object-cover"
        src={pageInfo?.heroImage}
        alt={pageInfo.name}
        width={140}
        height={140}
      />
      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[8px] md:tracking-[15px]">
          {pageInfo.role}
        </h2>
        <h1 className="text-xl lg:text-4xl font-semibold px-10 text-white">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#38bdf8" />
        </h1>
        <nav className="pt-4">
          {sections.map((section) => (
            <a key={section} href={`#${section}`}>
              <button
                className="px-6 m-1 py-2 border border-[#242424] rounded-full uppercase text-xs
                tracking-widest text-gray-500 shadow-md transition-all duration-700 hover:border-[#38bdf8]/40
               hover:text-[#38bdf8]/40 bg-black/20"
              >
                {section}
              </button>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
