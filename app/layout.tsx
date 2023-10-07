import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getSocials } from "@/utils";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import ScrollContextProvider from "@/context/scrollContext";

export const metadata = {
  title: "NJ Portfolio",
  description: `Discover the cutting-edge software engineering portfolio of a dedicated professional, showcasing a diverse range of projects and technical skills. Explore our creative solutions to complex problems, demonstrating expertise in coding languages, debugging, project management, and leadership. Dive into an engaging and interactive experience that highlights the value of quality over quantity, and reveals a unique approach to software development.`,
  keywords: "Web Development, Software Engineer, Portfolio, Full Stack",
};

export const revalidate = 3600;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const socials = await getSocials();
  return (
    <html lang="es">
      <body className="bg-[#0f172a] text-[#94a3b8] overflow-hidden">
        <ScrollContextProvider>
          <Header socials={socials} />
          <main>{children}</main>
          <Footer />
        </ScrollContextProvider>
        <Analytics />
      </body>
    </html>
  );
}
