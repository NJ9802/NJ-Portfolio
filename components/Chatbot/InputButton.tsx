import React, { memo } from "react";

type InputButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

const InputButton = ({
  type,
  onClick,
  children,
  disabled,
}: InputButtonProps) => {
  return (
    <button
      type={type}
      className="absolute bg-accent rounded-md py-[13px] px-4 right-0 -bottom-4 transform -translate-y-1/2 text-gray-800 hover:bg-[#2883aa] disabled:hover:bg-accent transition-colors disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default memo(InputButton);
