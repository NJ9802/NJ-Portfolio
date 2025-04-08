import React from "react";
import SectionHeader from "./SectionHeader";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import ContactMeForm from "./ContactMeForm";
import PageInfo from "../types/PageInfo";
import { useTranslations } from "next-intl";

type Props = {
  pageInfo: PageInfo;
};

export default function ContactMe({ pageInfo }: Props) {
  const t = useTranslations("Contact");

  return (
    <div
      className="relative flex flex-col text-center md:text-left
     max-w-7xl px-10 pb-32 mx-auto items-center"
    >
      <SectionHeader title={t("title")} />

      <div className="flex flex-col space-y-5 px-5">
        <h4 className="hidden xs:block text-md text-white md:text-2xl font-semibold text-center">
          {t("subtitle")}
          <span className="ml-2">{t("letsTalk")}</span>
        </h4>

        <div className="hidden xs:block space-y-1 ">
          {pageInfo.phoneNumber && (
            <div className="flex items-center space-x-5 justify-center">
              <PhoneIcon className="text-accent h-5 w-5 animate-pulse" />
              <p className="text-lg">{pageInfo.phoneNumber}</p>
            </div>
          )}

          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="text-accent h-5 w-5 animate-pulse" />
            <p className="text-lg">{pageInfo.email}</p>
          </div>
        </div>

        <ContactMeForm />
      </div>
    </div>
  );
}
