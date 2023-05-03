import { ArrowUpIcon } from "@heroicons/react/24/solid";
import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="fixed bottom-5 w-full">
      <div className="flex items-center justify-center">
        <a href="#hero">
          <ArrowUpIcon
            className="h-6 w-6 opacity-20 rounded-full
        hover:opacity-80 hover:animate-bounce transition"
          />
        </a>
      </div>
    </footer>
  );
}
