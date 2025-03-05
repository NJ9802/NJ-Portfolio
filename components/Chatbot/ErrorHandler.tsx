import { useTranslations } from "next-intl";
import React, { memo } from "react";

const ErrorHandler = () => {
  const t = useTranslations("Chatbot");
  return (
    <div className={`bg-red-500 rounded-lg p-4 border border-gray-800`}>
      {t("errorMessage")}
    </div>
  );
};

export default memo(ErrorHandler);
