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
    handleStopStreaming,
    isStopped,
    isStreaming,
    handleCancelScrollingBottom,
  } = useChatbotConfig();

  return (
    <>
      <div className="fixed bottom-5 right-3 md:bottom-10 md:right-10 z-50">
        <ChatbotButton onClick={handleOpen} open={isOpen} />
      </div>

      {isOpen && (
        <Chatbot
          onCancelScrollingBottom={handleCancelScrollingBottom}
          introductionMessage={t("introduction")}
          onSend={handleSendMessage}
          messages={messages}
          isLoading={isLoading}
          isWriting={isWriting}
          isStopped={isStopped}
          isStreaming={isStreaming}
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
          onStopStreaming={handleStopStreaming}
        />
      )}
    </>
  );
};

export default ChatbotContainer;
