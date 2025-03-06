import React, { useEffect, useState } from "react";
import MarkdownContent from "./MarkdownContent";

type TypeWritteEffectProps = {
  text: string;
  delay: number;
  onFinish?: () => void;
  scrollToBottom?: () => void;
};

const TypeWritteEffect = ({
  text = "",
  delay = 50,
  onFinish,
  scrollToBottom,
}: TypeWritteEffectProps) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else {
      onFinish?.();
    }
    scrollToBottom?.();
    return () => clearTimeout(timeout);
  }, [currentIndex, delay, text, onFinish, scrollToBottom]);

  return <MarkdownContent content={currentText} />;
};

export default TypeWritteEffect;
