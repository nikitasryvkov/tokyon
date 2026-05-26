import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { benefits, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "TOKYON TECH / TEKYON - IT-компания для разработки сайтов, backend, API, баз данных, админок и поддержки web-проектов.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">О компании</p>
          <h1>TOKYON TECH проектирует web-проекты как инженерные системы</h1>
          <p>
            Мы помогаем бизнесу запускать и развивать сайты, приложения и интеграции, которые можно
            поддерживать: с понятной структурой, БД, безопасностью, SEO и документацией.
          </p>
        </div>
      </section>
      <Section
        eyebrow="Принципы"
        title="Работаем с фокусом на результат, который можно проверить"
      >
        <div className="benefit-grid">
          {benefits.map((benefit) => (
            <article className="benefit-item" key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Реквизиты" title="Официальная информация">
        <div className="contact-panel">
          <p>{site.legalName}</p>
          <p>ИНН {site.inn}</p>
          <p>ОГРНИП {site.ogrnip}</p>
          <p>{site.address}</p>
          <p>
            <a href={site.emailHref}>{site.email}</a>
          </p>
        </div>
      </Section>
    </>
  );
}
