"use client";

import type React from "react";

import { useCallback, useEffect, useRef, useState } from "react";

interface AutoResizeTextareaProps {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  label?: string;
  minRows?: number;
  maxRows?: number;
  disabled?: boolean;
}

export default function AutoResizeTextarea({
  id,
  name,
  placeholder = "Type a message...",
  value: propValue,
  onChange,
  className = "",
  disabled,
  minRows = 1,
  maxRows = 10,
}: AutoResizeTextareaProps) {
  const [value, setValue] = useState(propValue || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaLineHeight, setTextareaLineHeight] = useState(20); // Default line height

  // Calculate and set the textarea height
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto";

    // Calculate the height based on content
    const newHeight = Math.min(
      Math.max(textarea.scrollHeight, minRows * textareaLineHeight),
      maxRows * textareaLineHeight
    );

    textarea.style.height = `${newHeight}px`;

    // Add overflow only when content exceeds max height
    textarea.style.overflowY =
      textarea.scrollHeight > maxRows * textareaLineHeight ? "auto" : "hidden";
  }, [maxRows, minRows, textareaLineHeight]);

  // Get the line height on mount
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const computedStyle = window.getComputedStyle(textarea);
      const lineHeight = Number.parseInt(computedStyle.lineHeight, 10) || 20;
      setTextareaLineHeight(lineHeight);
    }
  }, []);

  // Adjust height when value changes
  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  useEffect(() => {
    if (propValue !== undefined && propValue !== value) {
      setValue(propValue);
    }
  }, [propValue, value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <textarea
      ref={textareaRef}
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={minRows}
      className={`w-full resize-none overflow-hidden rounded-md border border-gray-800 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
}
