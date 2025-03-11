import { ChatbotPage } from "@/pages";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ScrollContextProvider from "../../context/scrollContext";
import { routing } from "../../i18n/routing";
import { getSocials } from "../../utils";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
  };
}

export const revalidate = 3600;

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const socials = await getSocials();
  return (
    <html lang={locale}>
      <body className="bg-[#0f172a] text-[#94a3b8] overflow-hidden">
        <NextIntlClientProvider messages={messages}>
          <ScrollContextProvider>
            <Header socials={socials} />
            <main className="relative">
              {children}
              <ChatbotPage />
              <Toaster />
            </main>
            <Footer />
          </ScrollContextProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
