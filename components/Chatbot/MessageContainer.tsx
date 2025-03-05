import { CHAT_ROLES } from "@/constants";
import React, { memo } from "react";

type MessageContainerProps = {
  role: CHAT_ROLES.USER | CHAT_ROLES.MODEL;
  children: React.ReactNode;
};

const MessageContainer = ({ role, children }: MessageContainerProps) => {
  return (
    <div
      className={`${
        role === CHAT_ROLES.USER
          ? "bg-[#42537e] border-gray-800 border"
          : "bg-transparent"
      } rounded-lg p-4 text-gray-200`}
    >
      {children}
    </div>
  );
};

export default memo(MessageContainer);
