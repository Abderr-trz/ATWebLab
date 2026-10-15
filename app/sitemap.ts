import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, lastModified: new Date("2026-10-15"), changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/creation-site-web-maroc`, lastModified: new Date("2026-10-15"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/creation-site-web-restaurant`, lastModified: new Date("2026-10-15"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/creation-site-web-photographe`, lastModified: new Date("2026-10-15"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/mentions-legales`, lastModified: new Date("2026-10-03"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
