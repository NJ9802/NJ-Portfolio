"use client";

import React, { useContext } from "react";
import { SocialIcon } from "react-social-icons";
import { motion, useSpring, useTransform } from "framer-motion";
import Social from "../types/Social";
import { ScrollContext } from "../context/scrollContext";
import LocaleSwitcher from "./LocaleSwitcher";
import { useLocale } from "next-intl";

type Props = {
  socials: Social[];
};

export default function Header({ socials }: Props) {
  const { scrollY } = useContext(ScrollContext);
  const translateX = useSpring(scrollY);
  const invertTranslateX = useTransform(translateX, () => -translateX.get());
  const locale = useLocale();

  return (
    <header
      className="fixed w-full top-0 flex items-start px-5 md:px-[10rem] lg:px-[15rem] py-5 justify-between z-20
    xl:items-center"
    >
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 1.5 }}
        className={`flex flex-row items-center`}
        style={{ translateX: invertTranslateX }}
      >
        {socials.map((social) => (
          <SocialIcon
            key={social._id}
            url={social.url}
            fgColor="gray"
            bgColor="transparent"
          />
        ))}
      </motion.div>
      <motion.div
        initial={{ x: 500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="flex flex-row items-center lg:gap-4 text-gray-300"
        style={{ translateX }}
      >
        <div className="hidden sm:block">
          <SocialIcon
            url="#contact"
            className="cursor-pointer"
            network="email"
            fgColor="gray"
            bgColor="transparent"
          />
        </div>

        <a
          className="text-lg text-[#808080] font-bold tracking-widest"
          href={`/Nelson Front-End Developer CV ${locale}.pdf`}
          target="_blank"
        >
          CV
        </a>
        <LocaleSwitcher />
      </motion.div>
    </header>
  );
}
