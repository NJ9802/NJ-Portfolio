import React from "react";

type Props = { title: string };

export default function SectionHeader({ title }: Props) {
  return (
    <h3 className="absolute ml-5 top-8 sm:top-12 md:top-24 uppercase tracking-[10px] text-xl md:tracking-[20px] text-gray-500 md:text-2xl">
      {title}
    </h3>
  );
}
