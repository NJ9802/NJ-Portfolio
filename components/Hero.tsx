"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { sections } from "../constants";
import PageInfo from "../types/PageInfo";
import BackgroundCircles from "./BackgroundCircles";

type Props = {
  pageInfo: PageInfo;
};

export default function Hero({ pageInfo }: Props) {
  const locale = useLocale();
  const t = useTranslations("HeroSection");
  const [text] = useTypewriter({
    words: [
      t("typeWritter.name", { name: pageInfo.name }),
      t("typeWritter.preferences"),
      t("typeWritter.actions"),
    ],
    loop: 0,
    delaySpeed: 2000,
  });

  return (
    <div className="h-screen pt-16 flex flex-col items-center justify-center text-center">
      <BackgroundCircles />
      <Image
        priority
        className="relative shadow-md rounded-full mx-auto object-cover"
        src={pageInfo?.heroImage}
        alt={pageInfo.name}
        width={140}
        height={140}
      />
      <div className="z-20 pt-8">
        <div className="pb-2 px-2">
          <h2 className="text-sm uppercase text-gray-500 tracking-[4px] md:tracking-[8px] font-semibold">
            {pageInfo.role[locale]}
          </h2>
        </div>
        <h1 className="text-xl lg:text-4xl font-semibold px-10 text-white">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#38bdf8" />
        </h1>
        <nav className="pt-4 max-w-[38rem]">
          {sections.map((section) => (
            <a key={section} href={`#${section}`}>
              <button
                className="px-6 m-1 py-2 border border-[#242424] rounded-full uppercase text-xs
                tracking-widest text-gray-500 shadow-md transition-all duration-700 hover:border-accent/40
               hover:text-accent/40 bg-black/20"
              >
                {t(`sections.${section}`)}
              </button>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
