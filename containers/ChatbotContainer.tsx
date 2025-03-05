"use client";
import Chatbot from "@/components/Chatbot/Chatbot";
import { CHAT_ROLES } from "@/constants";
import { CHAT_STATUS_ENUM } from "@/constants/chat-status.enum";
import { useChatbotConfig } from "@/hooks/useChatbotConfig";
import { Message } from "@/types/Message";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useRef, useState } from "react";

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
  } = useChatbotConfig();

  return (
    <>
      <div className="absolute bottom-12 right-12">
        <button onClick={handleOpen}>Ask AI</button>
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
        />
      )}
    </>
  );
};

export default ChatbotContainer;
