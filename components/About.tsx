import Image from "next/image";

import PageInfo from "../types/PageInfo";

import { useLocale, useTranslations } from "next-intl";
import SectionHeader from "./SectionHeader";

type Props = {
  pageInfo: PageInfo;
};

const About = ({ pageInfo }: Props) => {
  const locale = useLocale();
  const t = useTranslations("About");

  return (
    <div className="relative flex lg:flex-row max-w-7xl px-0 md:px-10 flex-col h-screen justify-center mx-auto items-center">
      <SectionHeader title={t("title")} />

      <div className="hidden flex-shrink-0 xs:block mt-[4rem] mb-5 md:my-0 object-cover max-w-xs lg:max-w-none rounded-full md:rounded-lg">
        <Image
          src={pageInfo.profilePic}
          alt={pageInfo.name}
          width={500}
          height={500}
        />
      </div>

      <div className="space-y-5 px-0 md:px-10">
        <h4 className="text-2xl pl-0 md:pl-5 text-center text-white md:text-4xl font-semibold">
          {t("whoiam")}
        </h4>
        <p className="px-5 lg:pr-0 overflow-y-auto">
          {pageInfo.backgroundInformation[locale]}
        </p>
      </div>
    </div>
  );
};

export default About;
