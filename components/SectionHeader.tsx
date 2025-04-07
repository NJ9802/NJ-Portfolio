import React from "react";

type Props = { title: string };

export default function SectionHeader({ title }: Props) {
  return (
    <h3 className="mb-16 sm:mb-5 md:mb-12 uppercase tracking-[10px] text-xl md:tracking-[20px] text-gray-500 md:text-2xl">
      {title}
    </h3>
  );
}
