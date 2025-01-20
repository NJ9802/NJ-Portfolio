import Experience from "../types/Experience";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

type Props = { workExperience: Experience };

export default function ExperienceCard({ workExperience }: Props) {
  const locale = useLocale();
  const t = useTranslations("Experience");

  return (
    <article
      className="flex flex-col rounded-lg items-center space-between space-y-4 flex-shrink-0
    w-80 md:w-96 xl:w-2/4 bg-[#38bdf8]/10 p-10 overflow-hidden"
    >
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <Image
          src={workExperience.companyImage}
          alt={workExperience.company}
          className="max-w-md h-auto xl:w-23 xl:h-23 object-cover object-center"
          width={250}
          height={250}
        />
      </motion.div>

      <div className="px-0 md:px-10">
        <h4 className="text-3xl text-white font-light">
          {workExperience.jobTitle}
        </h4>
        <p className="font-bold text-white text-xl mt-1">
          {workExperience.company}
        </p>

        <div className="flex space-x-2 my-2">
          {workExperience.technologies.map((technology) => (
            <Image
              key={technology._id}
              src={technology.logo}
              alt={technology.title}
              className="rounded-full"
              width={24}
              height={24}
            />
          ))}
        </div>

        <p className="uppercase text-xs py-2 text-gray-300">{`${new Date(
          workExperience.dateStarted
        ).toLocaleDateString(locale)} - ${
          workExperience.isCurrentlyWorkingHere
            ? t("present")
            : new Date(workExperience.dateEnded).toLocaleDateString(locale)
        }`}</p>

        <ul
          className="text-sm text-white max-h-48 md:max-h-28 w-64 pr-5 overflow-y-auto 
        md:scrollbar-thin md:scrollbar-track-black/10 md:scrollbar-thumb-[#38bdf8]"
        >
          {workExperience.points.map((point, i) => (
            <li key={i}>- {point[locale]}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
