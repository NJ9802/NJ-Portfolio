"use client";
import Chatbot from "@/components/Chatbot/Chatbot";
import { useChatbotConfig } from "@/hooks/useChatbotConfig";
import { useTranslations } from "next-intl";
import Image from "next/image";
import chatbotImage from "@/public/chatbot_image.webp";
import { ChatbotButton } from "@/components/Chatbot";

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
      <div className="absolute bottom-16 right-5 md:bottom-10 md:right-10 z-50">
        <ChatbotButton onClick={handleOpen} />
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
          logoUrl={chatbotImage.src}
        />
      )}
    </>
  );
};

export default ChatbotContainer;
