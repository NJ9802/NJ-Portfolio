"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type Experience from "../types/Experience";
import ExperienceCard from "./ExperienceCard";
import SectionHeader from "./SectionHeader";

type Props = { workExperiences: Experience[] };

export default function Experience({ workExperiences }: Props) {
  const t = useTranslations("Experience");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full md:px-10
    justify-evenly mx-auto items-center"
    >
      <SectionHeader title={t("title")} />

      <div
        className={`w-full flex ${
          workExperiences.length === 1 ? "justify-center" : ""
        } space-x-5 overflow-x-auto pb-4 snap-mandatory snap-x styled-scrollbar`}
      >
        {workExperiences.map((workExperience) => (
          <ExperienceCard
            key={workExperience._id}
            workExperience={workExperience}
          />
        ))}
      </div>
    </motion.div>
  );
}
