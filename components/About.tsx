"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import PageInfo from "@/types/PageInfo";

type Props = {
  pageInfo: PageInfo;
};

const About = ({ pageInfo }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative flex text-center md:text-left
    md:flex-row max-w-7xl flex-col h-screen px-10 justify-center mx-auto
    items-center"
    >
      <SectionHeader title="About" />

      <motion.img
        loading="lazy"
        src={pageInfo.profilePic}
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        alt={pageInfo.name}
        className="mb-10 md:mb-0 flex-shrink-0 w-32 h-32 rounded-full object-cover md:rounded-lg
         md:w-64 md:h-96 xl:w-80 xl:h-96 "
      />

      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-2xl text-white md:text-4xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-[#38bdf8]/50">little</span>{" "}
          background
        </h4>
        <p className="text-base max-h-80 pr-5 md:max-h-none md:pr-0 overflow-y-scroll">
          {pageInfo.backgroundInformation}
        </p>
      </div>
    </motion.div>
  );
};

export default About;
