"use client";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { memo } from "react";

type ErrorHandlerProps = {
  onClose?: () => void;
};

const ErrorHandler = ({ onClose }: ErrorHandlerProps) => {
  const t = useTranslations("Chatbot");
  return (
    <div
      className={`relative bg-red-800 rounded-lg p-4 border border-gray-800`}
    >
      <p className="pr-6">{t("errorMessage")}</p>
      {onClose && (
        <button onClick={onClose} className="absolute top-3 right-3">
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default memo(ErrorHandler);
