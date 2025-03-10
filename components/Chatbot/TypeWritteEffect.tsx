import React, { useEffect, useState } from "react";
import MarkdownContent from "./MarkdownContent";

type TypeWritteEffectProps = {
  text: string;
  delay: number;
  onFinish?: (finishAll?: boolean) => void;
  scrollToBottom?: () => void;
  isStopped?: boolean;
  isError?: boolean;
  isStreaming?: boolean;
};

const TypeWritteEffect = ({
  text = "",
  delay = 50,
  onFinish,
  scrollToBottom,
  isStopped = false,
  isError = false,
  isStreaming = false,
}: TypeWritteEffectProps) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (currentIndex < text.length && !isStopped && !isError) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else if (currentIndex === text.length && !isStreaming) {
      onFinish?.(true);
    } else {
      onFinish?.();
    }
    console.log("TYPEWRITER EFFECT EXECUTION");
    scrollToBottom?.();

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    delay,
    text,
    onFinish,
    scrollToBottom,
    isStopped,
    isError,
    isStreaming,
  ]);

  return <MarkdownContent content={currentText} />;
};

export default TypeWritteEffect;
