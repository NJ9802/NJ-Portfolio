"use client";
import Chatbot from "@/components/Chatbot/Chatbot";
import { useChatbotConfig } from "@/hooks/useChatbotConfig";
import { useTranslations } from "next-intl";
import Image from "next/image";
import chatbotImage from "@/public/chatbot_image.webp";

const ChatbotContainer = () => {
  const t = useTranslations("Chatbot");
  const {
    isOpen,
    handleOpen,
    handleClose,
    currentMessage,
    isLoading,
    isError,
    handleSendMessage,
    messages,
    userMessage,
    handleChangeUserMessage,
    handleWritingFinish,
    messagesEndRef,
    scrollToBottom,
  } = useChatbotConfig();

  return (
    <>
      <div className="absolute bottom-10 right-10 z-50">
        <button onClick={handleOpen}>
          <div className="flex flex-col items-center justify-center rounded-lg p-3 bg-slate-800">
            <Image
              src={chatbotImage}
              alt="Chatbot Image"
              style={{ width: "50px", height: "auto" }}
            />
            {t("askAI")}
          </div>
        </button>
      </div>
      {isOpen && (
        <Chatbot
          introductionMessage={t("introduction")}
          onSend={handleSendMessage}
          messages={messages}
          isLoading={isLoading}
          onClose={handleClose}
          currentMessage={currentMessage}
          input={userMessage}
          onInputChange={handleChangeUserMessage}
          isError={isError}
          title={t("title")}
          placeholderText={t("inputPlaceholder")}
          onWritingFinish={handleWritingFinish}
          messagesEndRef={messagesEndRef}
          onScrollToBottom={scrollToBottom}
        />
      )}
    </>
  );
};

export default ChatbotContainer;
