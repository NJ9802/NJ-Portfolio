import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Experience from "../types/Experience";

type Props = { workExperience: Experience };

export default function ExperienceCard({ workExperience }: Props) {
  const locale = useLocale();
  const t = useTranslations("Experience");

  return (
    <article className="flex flex-col rounded-lg items-center space-between space-y-4 flex-shrink-0 max-w-xs sm:max-w-sm md:max-w-none xl:w-2/4 bg-accent/10 p-8 sm:p-10 overflow-hidden">
      <div>
        <Image
          src={workExperience.companyImage}
          alt={workExperience.company}
          className="max-w-md h-auto xl:w-23 xl:h-23 object-cover object-center"
          width={250}
          height={250}
        />
      </div>

      <div className="px-0 md:px-10">
        <h4 className="text-lg md:text-3xl text-white font-light">
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
          className="text-sm md:text-base text-white max-h-48 md:max-h-36 pr-5 overflow-y-auto 
        md:scrollbar-thin md:scrollbar-track-black/10 md:scrollbar-thumb-accent"
        >
          {workExperience.points.map((point, i) => (
            <li key={i}>
              <p>- {point[locale]}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
