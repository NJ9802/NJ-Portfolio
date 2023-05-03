import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getSocials } from "@/utils";
import "./globals.css";

export const metadata = {
  title: "NJ Portfolio",
  description: "Look my incredibles Projects!!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const socials = await getSocials();
  return (
    <html lang="en">
      <body className="bg-[#09101e] text-[#94a3b8] overflow-hidden">
        <Header socials={socials} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
