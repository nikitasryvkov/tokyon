import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { site } from "@/lib/content";
import { getServices } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Разработка сайтов, backend, API, базы данных, поддержка, аудит, дизайн web-интерфейсов и адаптация ПО.",
  alternates: { canonical: "/services" }
};

export default async function ServicesPage() {
  const services = await getServices();
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        provider: {
          "@type": "Organization",
          name: site.name
        }
      }
    }))
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Услуги</p>
          <h1>Разработка, доработка и поддержка web-проектов</h1>
          <p>
            Услуги собраны вокруг практических задач бизнеса: запустить сайт, модернизировать
            существующий проект, подключить backend, интеграции, БД, админку и поддержку.
          </p>
        </div>
      </section>
      <Section>
        <div className="cards-grid">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>
    </>
  );
}
