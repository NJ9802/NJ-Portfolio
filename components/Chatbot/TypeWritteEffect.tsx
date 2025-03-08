import React, { useEffect, useState } from "react";
import MarkdownContent from "./MarkdownContent";

type TypeWritteEffectProps = {
  text: string;
  delay: number;
  onFinish?: () => void;
  scrollToBottom?: () => void;
  isWriting?: boolean;
};

const TypeWritteEffect = ({
  text = "",
  delay = 50,
  onFinish,
  scrollToBottom,
  isWriting = true,
}: TypeWritteEffectProps) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (currentIndex < text.length && isWriting) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else {
      onFinish?.();
    }
    scrollToBottom?.();
    return () => clearTimeout(timeout);
  }, [currentIndex, delay, text, onFinish, scrollToBottom, isWriting]);

  return <MarkdownContent content={currentText} />;
};

export default TypeWritteEffect;
