"use client";

import { CHAT_ROLES } from "@/constants";
import { Message } from "@/types/Message";
import { Download, Send, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FormEvent, RefObject, useEffect, useMemo } from "react";
import { Input } from "../ui/input";
import ErrorHandler from "./ErrorHandler";
import LoadingAnimation from "./LoadingAnimation";
import MarkdownContent from "./MarkdownContent";
import MessageContainer from "./MessageContainer";
import TypeWritteEffect from "./TypeWritteEffect";

interface ChatbotProps {
  title?: string;
  messages: Message[];
  onClose?: () => void;
  logoUrl?: string;
  poweredByText?: string;
  placeholderText?: string;
  isLoading?: boolean;
  currentMessage: string;
  input: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSend: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  isError?: boolean;
  introductionMessage: string;
  onWritingFinish: () => void;
  messagesEndRef: RefObject<HTMLDivElement>;
  onScrollToBottom: () => void;
}

export default function Chatbot({
  title = "Asistente del portafolio de Nelson",
  messages,
  onClose,
  logoUrl,
  poweredByText = "powered by NJ portfolio chatbot service",
  placeholderText = "Escribe tu pregunta...",
  introductionMessage,
  isLoading,
  currentMessage,
  input,
  onInputChange,
  onSend,
  isError,
  onWritingFinish,
  messagesEndRef,
  onScrollToBottom,
}: ChatbotProps) {
  useEffect(() => {
    onScrollToBottom();
  }, [messages, isLoading, isError, onScrollToBottom]);

  const isMessagesEmpty = useMemo(() => messages.length === 0, [messages]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0F1729]/80 backdrop-blur-sm min-h-[300px]">
      <div className="bg-[#0F1729] text-gray-100 w-full max-w-2xl rounded-lg overflow-hidden shadow-xl border border-gray-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-[#1a2236]">
          <div className="flex items-center space-x-3">
            {logoUrl ? (
              <Image
                src={logoUrl || "/placeholder.svg"}
                alt="Logo"
                className="w-6 h-6"
              />
            ) : (
              <div className="bg-gray-800 p-1.5 rounded">
                <div className="bg-gradient-to-br from-gray-200 to-gray-400 w-5 h-5 rounded-sm transform rotate-45"></div>
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-100">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Chat Messages */}
        <div className="p-4 max-h-[60vh] overflow-y-auto bg-[#0F1729] space-y-6">
          <MessageContainer role={CHAT_ROLES.MODEL}>
            {isMessagesEmpty ? (
              <TypeWritteEffect text={introductionMessage} delay={10} />
            ) : (
              <MarkdownContent content={introductionMessage} />
            )}
          </MessageContainer>
          {messages.map((message, index) => (
            <MessageContainer role={message.role} key={index}>
              {message.role === CHAT_ROLES.USER ? (
                <div className="text-gray-100">
                  <p className="text-lg">{message.content}</p>
                </div>
              ) : (
                <MarkdownContent content={message.content} />
              )}
            </MessageContainer>
          ))}
          {currentMessage && (
            <MessageContainer role={CHAT_ROLES.MODEL}>
              <TypeWritteEffect
                text={currentMessage}
                delay={0}
                onFinish={onWritingFinish}
                scrollToBottom={onScrollToBottom}
              />
            </MessageContainer>
          )}
          {isLoading && <LoadingAnimation />}
          {isError && <ErrorHandler />}

          <div ref={messagesEndRef} />
        </div>

        {/* Modal Footer - Input */}
        <div className="p-4 border-t border-gray-800 bg-[#1a2236]">
          <form onSubmit={onSend}>
            <div className="relative">
              <Input
                className="w-full bg-[#0F1729] border-gray-800 rounded-lg pl-4 pr-10 py-3 focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-gray-200 placeholder-gray-500"
                placeholder={placeholderText}
                value={input}
                onChange={onInputChange}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="absolute bg-slate-700 rounded-r-md py-[9px] px-3 right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{poweredByText}</span>
            {/* <span>protected by reCAPTCHA</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
