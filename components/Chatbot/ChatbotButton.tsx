"use client";
import Image from "next/image";
import React, { memo } from "react";
import chatbotImage from "@/public/chatbot_image.webp";
import { useTranslations } from "next-intl";

type ChatbotButtonProps = {
  onClick: () => void;
};

const ChatbotButton = ({ onClick }: ChatbotButtonProps) => {
  const t = useTranslations("Chatbot");

  return (
    <button onClick={onClick}>
      <div className="flex flex-col items-center justify-center rounded-lg p-3  md:bg-slate-800">
        <Image
          src={chatbotImage}
          alt="Chatbot Image"
          style={{ width: "50px", height: "auto" }}
        />
        <div className="hidden md:block">{t("askAI")}</div>
      </div>
    </button>
  );
};

export default memo(ChatbotButton);
