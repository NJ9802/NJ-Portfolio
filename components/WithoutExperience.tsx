import React from "react";
import picture from "@/public/freepikPicture.svg";
import Image from "next/image";

type Props = { content: string };

function WithoutExperience({ content }: Props) {
  return (
    <div className="flex flex-col shrink-0 items-center lg:space-x-20 space-y-10 justify-center lg:flex-row">
      <div className="max-w-lg text-center md:text-left">
        <h4 className="text-base lg:text-lg">{content}</h4>
      </div>
      <figure className="flex flex-col items-center justify-center">
        <Image
          className="h-52 w-52 md:h-64 md:w-64 lg:h-96 lg:w-96"
          src={picture}
          alt="Developer"
        />
        <figcaption className="text-xs">
          <a
            className="underline decoration-1 hover:decoration-[#00dfc0] hover:text-[#00dfc0] transition-colors"
            href="https://www.freepik.com/free-vector/programming-concept-illustration_7118756.htm#query=developer&position=1&from_view=search&track=sph"
          >
            Image by storyset
          </a>{" "}
          on Freepik
        </figcaption>
      </figure>
    </div>
  );
}

export default WithoutExperience;
