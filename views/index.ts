import { lazy } from "react";

const loadChatbotPage = () => import("@/views/ChatbotPage");
export const ChatbotPage = lazy(loadChatbotPage);
