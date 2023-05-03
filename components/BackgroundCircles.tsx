import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gear from "@/public/gear.svg";

type Props = {};

export default function BackgroundCircles({}: Props) {
  return (
    <div className="relative flex justify-center items-center z-0">
      <div className="absolute rounded-lg h-[31rem] w-[31rem] mt-[13rem] bg-black/10 backdrop-blur-lg z-10" />
      <div className="absolute border border-[#333333] rounded-full h-72 w-72 mt-52 z-0" />
      <div className="absolute border border-[#333333] rounded-full h-[31rem] w-[31rem] mt-52 z-0" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          scale: [1, 2, 2, 3, 1],
          opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 0.4],
          borderRadius: ["20%", "20%", "20%", "50%", "80%", "100%"],
        }}
        transition={{ duration: 2.5 }}
        className="absolute border border-[#38bdf8] rounded-full opacity-20 h-[37rem] w-[37rem] mt-52 z-0"
      />
      <div className="absolute border border-[#333333] rounded-full  h-[50rem] w-[50rem] mt-52 z-0 animate-[ping_2s_linear_infinite]" />
      <Image
        priority
        className="absolute opacity-80 min-h-[14rem] min-w-[14rem] mt-52 z-0 animate-[reverseSpin_8s_linear_infinite]"
        src={gear}
        alt="gear"
        width={224}
        height={224}
      />
      <Image
        priority
        className="absolute opacity-60 min-h-[29rem] min-w-[29rem] mt-52 z-0 animate-[spin_8s_linear_infinite]"
        src={gear}
        alt="gear"
        width={464}
        height={464}
      />
    </div>
  );
}
