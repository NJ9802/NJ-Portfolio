"use client";
import { ChatbotButton } from "@/components/Chatbot";
import Chatbot from "@/components/Chatbot/Chatbot";
import { useChatbotConfigContext } from "@/context/ChatbotConfigProvider";
import chatbotImage from "@/public/chatbot_image.webp";
import { useTranslations } from "next-intl";

const ChatbotContainer = () => {
  const t = useTranslations("Chatbot");
  const { handleOpen, isOpen } = useChatbotConfigContext();

  return (
    <>
      <div className="fixed bottom-5 right-3 md:bottom-10 md:right-10 z-50">
        <ChatbotButton onClick={handleOpen} open={isOpen} />
      </div>

      {isOpen && (
        <Chatbot
          introductionMessage={t("introduction")}
          title={t("title")}
          placeholderText={t("inputPlaceholder")}
          logoUrl={chatbotImage.src}
        />
      )}
    </>
  );
};

export default ChatbotContainer;
