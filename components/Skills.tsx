import React from "react";
import SectionHeader from "./SectionHeader";
import Skill from "./Skill";
import SkillType from "../types/Skill";
import { useTranslations } from "next-intl";

type Props = {
  skills: SkillType[];
};

export default function Skills({ skills }: Props) {
  const t = useTranslations("Skills");

  return (
    <div className="flex relative flex-col text-center md:text-left max-w-[2000px] xl:px-10 justify-center items-center mx-auto">
      <SectionHeader title={t("title")} />

      <h3 className="hidden lg:block uppercase tracking-[3px] text-gray-500 text-sm mb-10">
        {t("subtitle")}
      </h3>

      <div className="grid grid-cols-4 gap-5 px-3 sm:px-0">
        {skills.map((skill, i) => (
          <Skill
            key={skill._id}
            skill={skill}
            directionUp={i + 1 > skills.length / 2 ? true : false}
            delay={i * 0.06}
          />
        ))}
      </div>
    </div>
  );
}
