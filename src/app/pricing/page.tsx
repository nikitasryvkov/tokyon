import type { Metadata } from "next";
import { PricingCard } from "@/components/PricingCard";
import { Section } from "@/components/Section";
import { getPricingPlans } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Тарифы и пакеты услуг",
  description:
    "Пакеты TOKYON TECH: landing, корпоративный сайт, web-приложение, поддержка, доработка проекта и аудит сайта.",
  alternates: { canonical: "/pricing" }
};

export default async function PricingPage() {
  const plans = await getPricingPlans();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Тарифы</p>
          <h1>Пакеты услуг с понятной стартовой стоимостью</h1>
          <p>
            Точная оценка зависит от интеграций, контента, сроков, требований к админке и объема
            backend-логики.
          </p>
        </div>
      </section>
      <Section>
        <div className="cards-grid">
          {plans.map((plan) => (
            <PricingCard key={plan.slug} plan={plan} />
          ))}
        </div>
      </Section>
    </>
  );
}
