import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gear from "@/public/gear.svg";

type Props = {};

export default function BackgroundCircles({}: Props) {
  return (
    <div className="relative flex justify-center items-center z-0">
      <div className="absolute rounded-lg h-screen md:h-[33rem] w-[33rem] mt-[15rem] bg-black/10 backdrop-blur-md z-10" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          scale: [0.1, 0.4, 0.7, 1],
          opacity: 0.4,
        }}
        transition={{ duration: 2.5 }}
        className="relative flex justify-center items-center"
      >
        <div className="absolute mt-52 border border-[#38bdf8] rounded-full opacity-20 h-[37rem] w-[37rem] z-0" />
        <div className="absolute mt-52 border border-[#38bdf8] rounded-full opacity-20 h-[56rem] w-[56rem] z-0" />
        <div className="absolute mt-52 border border-[#38bdf8] rounded-full opacity-20 h-[75rem] w-[75rem] z-0" />
      </motion.div>
      <div className="absolute border border-[#333333] rounded-full  h-[32rem] w-[32rem] mt-52 z-0 animate-[ping_2s_linear_infinite]" />
      <Image
        priority
        className="absolute bottom-4 left-16 min-h-[10rem] min-w-[10rem] z-0 animate-[spin_6s_linear_infinite]"
        src={gear}
        alt="gear"
      />
      <Image
        priority
        className="absolute min-h-[11rem] min-w-[11rem] z-0 animate-[reverseSpin_9s_linear_infinite]"
        src={gear}
        alt="gear"
      />
      <Image
        priority
        className="absolute top-5 right-2 min-h-[20rem] min-w-[20rem] z-0 animate-[spin_15s_linear_infinite]"
        src={gear}
        alt="gear"
      />
      <Image
        priority
        className="absolute top-20 left-0 min-h-[23rem] min-w-[23rem] z-0 animate-[reverseSpin_16s_linear_infinite]"
        src={gear}
        alt="gear"
      />
    </div>
  );
}
