"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import PageInfo from "@/types/PageInfo";

import SectionHeader from "./SectionHeader";

type Props = {
  pageInfo: PageInfo;
};

const About = ({ pageInfo }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 300 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="relative flex text-center md:text-left
    md:flex-row max-w-7xl px-0 md:px-10 flex-col h-screen justify-center mx-auto
    items-center"
    >
      <SectionHeader title="Sobre mí" />

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="hidden flex-shrink-0 xs:block mt-[4rem] mb-5 md:my-0 w-32 h-32 rounded-full md:rounded-lg
        md:w-80 md:h-80 xl:w-96 xl:h-96"
      >
        <Image
          src={pageInfo.profilePic}
          alt={pageInfo.name}
          width={5000}
          height={5000}
          className="h-full"
        />
      </motion.div>

      <div className="space-y-5 px-0 md:px-10">
        <h4 className="text-2xl pl-0 md:pl-5 text-white md:text-4xl font-semibold">
          ¿Quién soy?
        </h4>
        <p className="text-base max-h-72 px-5 lg:max-h-none lg:pr-0 overflow-y-auto">
          {pageInfo.backgroundInformation}
        </p>
      </div>
    </motion.div>
  );
};

export default About;
