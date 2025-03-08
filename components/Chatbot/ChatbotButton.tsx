"use client";
import Image from "next/image";
import React, { memo } from "react";
import chatbotImage from "@/public/chatbot_image.webp";
import { useTranslations } from "next-intl";

type ChatbotButtonProps = {
  onClick: () => void;
  open: boolean;
};

const ChatbotButton = ({ onClick, open }: ChatbotButtonProps) => {
  const t = useTranslations("Chatbot");

  return (
    <div className="md:cursor-pointer" onClick={onClick}>
      <div className="flex flex-col items-center justify-center rounded-lg p-3  md:bg-slate-800">
        <Image
          className={`${
            open ? "-translate-x-[60vw] -translate-y-[50vh] -rotate-45" : ""
          } transition`}
          src={chatbotImage}
          alt="Chatbot Image"
          style={{ width: "50px", height: "auto" }}
        />
        <div className="hidden md:block">{t("askAI")}</div>
      </div>
    </div>
  );
};

export default memo(ChatbotButton);
