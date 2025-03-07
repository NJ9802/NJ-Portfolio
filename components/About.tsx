"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import PageInfo from "../types/PageInfo";

import SectionHeader from "./SectionHeader";
import { useTranslations, useLocale } from "next-intl";

type Props = {
  pageInfo: PageInfo;
};

const About = ({ pageInfo }: Props) => {
  const locale = useLocale();
  const t = useTranslations("About");

  return (
    <div
      className="relative flex text-center md:text-left
    lg:flex-row max-w-7xl px-0 md:px-10 flex-col h-screen justify-center mx-auto
    items-center"
    >
      <SectionHeader title={t("title")} />

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="hidden flex-shrink-0 xs:block mt-[4rem] mb-5 md:my-0 object-cover max-w-xs lg:max-w-none rounded-full md:rounded-lg"
      >
        <Image
          src={pageInfo.profilePic}
          alt={pageInfo.name}
          width={500}
          height={500}
        />
      </motion.div>

      <div className="space-y-5 px-0 md:px-10">
        <h4 className="text-2xl pl-0 md:pl-5 text-white md:text-4xl font-semibold">
          {t("whoiam")}
        </h4>
        <p className="px-5 lg:pr-0 overflow-y-auto">
          {pageInfo.backgroundInformation[locale]}
        </p>
      </div>
    </div>
  );
};

export default About;
