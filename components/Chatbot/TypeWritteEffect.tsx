import React, { useEffect, useState } from "react";
import MarkdownContent from "./MarkdownContent";

type TypeWritteEffectProps = {
  text: string;
  delay: number;
  onFinish?: () => void;
};

const TypeWritteEffect = ({
  text = "",
  delay = 50,
  onFinish,
}: TypeWritteEffectProps) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      onFinish?.();
    }
  }, [currentIndex, delay, text, onFinish]);

  return <MarkdownContent content={currentText} />;
};

export default TypeWritteEffect;
