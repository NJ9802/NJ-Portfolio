import { lazy } from "react";

const loadChatbotPage = () => import("@/pages/ChatbotPage");
export const ChatbotPage = lazy(loadChatbotPage);
