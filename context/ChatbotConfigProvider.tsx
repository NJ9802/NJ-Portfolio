import { useChatbotConfig } from "@/hooks/useChatbotConfig";
import { Message } from "@/types/Message";
import { createContext, FormEvent, RefObject, useContext } from "react";

type ChatbotConfigContextProps = { children: React.ReactNode };

type ChatbotConfigContextValue = {
  isOpen: boolean;
  handleOpen?: () => void;
  handleClose?: () => void;
  isLoading?: boolean;
  isStopped?: boolean;
  currentMessage: string;
  userMessage: string;
  messages: Message[];
  handleChangeUserMessage: (value: string) => void;
  handleSendMessage: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  isError?: boolean;
  handleWritingFinish: () => void;
  messagesEndRef: RefObject<HTMLDivElement>;
  scrollToBottom: () => void;
  cleanError: () => void;
  isWriting?: boolean;
  isStreaming?: boolean;
  handleStopStreaming: () => void;
  handleCancelScrollingBottom: () => void;
};

// @ts-ignore
const ChatbotConfigContext = createContext<ChatbotConfigContextValue>();

const ChatbotConfigProvider = ({ children }: ChatbotConfigContextProps) => {
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
    <ChatbotConfigContext.Provider
      value={{
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
      }}
    >
      {children}
    </ChatbotConfigContext.Provider>
  );
};

const useChatbotConfigContext = () => {
  const context = useContext(ChatbotConfigContext);
  if (context === undefined) {
    throw new Error("You must be inside a ChatbotConfigProvider");
  }
  return context;
};

export { ChatbotConfigProvider, useChatbotConfigContext };
