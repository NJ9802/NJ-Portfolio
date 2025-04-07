import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://nelsonjavier.vercel.app",
      lastModified: new Date(),
      alternates: {
        languages: {
          es: "https://nelsonjavier.vercel.app/es",
          en: "https://nelsonjavier.vercel.app/en",
        },
      },
    },
  ];
}
