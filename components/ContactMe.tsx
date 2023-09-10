import React from "react";
import SectionHeader from "./SectionHeader";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import ContactMeForm from "./ContactMeForm";
import PageInfo from "@/types/PageInfo";

type Props = {
  pageInfo: PageInfo;
};

export default function ContactMe({ pageInfo }: Props) {
  return (
    <div
      className="h-screen relative flex flex-col text-center md:text-left md:flex-row
     max-w-7xl px-10 justify-center mx-auto items-center"
    >
      <SectionHeader title="Contacto" />

      <div className="flex flex-col space-y-5 px-5">
        <h4 className="hidden xs:block text-md text-white md:text-2xl font-semibold text-center">
          Tengo la solución perfecta para usted.{" "}
          <span className="decoration-[#38bdf8]/50 underline">Hablemos</span>
        </h4>

        <div className="hidden xs:block space-y-1 ">
          {pageInfo.phoneNumber && (
            <div className="flex items-center space-x-5 justify-center">
              <PhoneIcon className="text-[#38bdf8] h-5 w-5 animate-pulse" />
              <p className="text-lg">{pageInfo.phoneNumber}</p>
            </div>
          )}

          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="text-[#38bdf8] h-5 w-5 animate-pulse" />
            <p className="text-lg">{pageInfo.email}</p>
          </div>
        </div>

        <ContactMeForm />
      </div>
    </div>
  );
}
