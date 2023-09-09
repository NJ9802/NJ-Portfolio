import React from "react";

type Props = { title: string };

export default function SectionHeader({ title }: Props) {
  return (
    <h3 className="absolute ml-5 top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
      {title}
    </h3>
  );
}
