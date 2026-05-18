import { faqItems, legalDocuments, pricingPlans, services } from "@/lib/content";

type PublicContentStatus = "DRAFT" | "PUBLISHED";

export type PublicService = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  includes: string[];
  audience: string;
  result: string;
  duration: string;
  priceFrom: string;
  ctaLabel: string;
  icon: string;
  status: PublicContentStatus;
  sortOrder: number;
};

export type PublicPricingPlan = {
  slug: string;
  title: string;
  description: string;
  priceFrom: string;
  duration: string;
  bestFor: string;
  features: string[];
  status: PublicContentStatus;
  sortOrder: number;
};

export type PublicFaqItem = {
  question: string;
  answer: string;
  status: PublicContentStatus;
  sortOrder: number;
};

export type PublicLegalDocument = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  status: PublicContentStatus;
  sortOrder: number;
};

function published<T extends { status: PublicContentStatus; sortOrder: number }>(items: T[]) {
  return items
    .filter((item) => item.status === "PUBLISHED")
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getServices(): Promise<PublicService[]> {
  return published(services as PublicService[]);
}

export async function getService(slug: string): Promise<PublicService | null> {
  return (await getServices()).find((service) => service.slug === slug) ?? null;
}

export async function getPricingPlans(): Promise<PublicPricingPlan[]> {
  return published(pricingPlans as PublicPricingPlan[]);
}

export async function getFaqItems(): Promise<PublicFaqItem[]> {
  return published(faqItems as PublicFaqItem[]);
}

export async function getLegalDocuments(): Promise<PublicLegalDocument[]> {
  return published(legalDocuments as PublicLegalDocument[]);
}

export async function getLegalDocument(slug: string): Promise<PublicLegalDocument | null> {
  return (await getLegalDocuments()).find((document) => document.slug === slug) ?? null;
}
