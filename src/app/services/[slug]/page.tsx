import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { getService, getServices } from "@/lib/public-data";
import { site } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.map(String) : [];
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` }
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.domain
    },
    offers: {
      "@type": "Offer",
      price: service.priceFrom,
      priceCurrency: "RUB"
    }
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Услуга</p>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <div className="hero-actions">
            <ButtonLink href={site.emailHref}>Связаться по email</ButtonLink>
            <ButtonLink href={site.telegramHref} variant="ghost">
              Написать в Telegram
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Все услуги
            </ButtonLink>
          </div>
        </div>
      </section>
      <Section>
        <div className="content-split">
          <article>
            <h2>Что входит</h2>
            <ul className="check-list">
              {asStringArray(service.includes).map((item) => (
                <li key={item}>
                  <Check aria-hidden size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <aside className="contact-panel">
            <h2>Параметры</h2>
            <dl className="mini-meta">
              <div>
                <dt>Для кого</dt>
                <dd>{service.audience}</dd>
              </div>
              <div>
                <dt>Результат</dt>
                <dd>{service.result}</dd>
              </div>
              <div>
                <dt>Сроки</dt>
                <dd>{service.duration}</dd>
              </div>
              <div>
                <dt>Стоимость</dt>
                <dd>{service.priceFrom}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </Section>
    </>
  );
}
