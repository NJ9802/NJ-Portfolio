"use client";
import ChatbotContainer from "@/containers/ChatbotContainer";
import { ChatbotConfigProvider } from "@/context/ChatbotConfigProvider";
import React, { memo } from "react";

const ChatbotPage = () => {
  return (
    <ChatbotConfigProvider>
      <ChatbotContainer />
    </ChatbotConfigProvider>
  );
};

export default memo(ChatbotPage);
