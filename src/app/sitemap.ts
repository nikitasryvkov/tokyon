import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { getLegalDocuments, getServices } from "@/lib/public-data";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.domain;
  const [services, legalDocuments] = await Promise.all([getServices(), getLegalDocuments()]);
  const staticRoutes = [
    "",
    "/services",
    "/pricing",
    "/process",
    "/about",
    "/faq",
    "/contact",
    "/legal"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75
    })),
    ...legalDocuments.map((document) => ({
      url: `${baseUrl}/legal/${document.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.35
    }))
  ];
}
