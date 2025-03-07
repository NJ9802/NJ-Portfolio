"use client";
import { ChatbotButton } from "@/components/Chatbot";
import Chatbot from "@/components/Chatbot/Chatbot";
import { useChatbotConfig } from "@/hooks/useChatbotConfig";
import chatbotImage from "@/public/chatbot_image.webp";
import { useTranslations } from "next-intl";

const ChatbotContainer = () => {
  const t = useTranslations("Chatbot");
  const {
    isOpen,
    handleOpen,
    handleClose,
    currentMessage,
    isLoading,
    isError,
    isWriting,
    handleSendMessage,
    messages,
    userMessage,
    handleChangeUserMessage,
    handleWritingFinish,
    messagesEndRef,
    scrollToBottom,
    cleanError,
  } = useChatbotConfig();

  return (
    <>
      <div className="absolute bottom-16 right-3 md:bottom-10 md:right-10 z-50">
        <ChatbotButton onClick={handleOpen} />
      </div>

      {isOpen && (
        <Chatbot
          introductionMessage={t("introduction")}
          onSend={handleSendMessage}
          messages={messages}
          isLoading={isLoading}
          isWriting={isWriting}
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
          cleanError={cleanError}
        />
      )}
    </>
  );
};

export default ChatbotContainer;
