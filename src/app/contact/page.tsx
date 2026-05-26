import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Section } from "@/components/Section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты TOKYON TECH: email и реквизиты для связи.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Контакты</p>
          <h1>Контакты для связи</h1>
          <p>
            Напишите на почту, чтобы обсудить проект, уточнить стоимость работ или задать вопрос
            по услугам.
          </p>
          <div className="hero-actions">
            <ButtonLink href={site.emailHref}>
              <Mail aria-hidden size={18} />
              Написать на почту
            </ButtonLink>
          </div>
        </div>
      </section>
      <Section
        eyebrow="Официальные контакты"
        title="Контакты и реквизиты"
      >
        <div className="contact-panel">
          <p>{site.legalName}</p>
          <p>ИНН {site.inn}</p>
          <p>ОГРНИП {site.ogrnip}</p>
          <p>{site.address}</p>
          <p>
            Email: <a href={site.emailHref}>{site.email}</a>
          </p>
        </div>
      </Section>
    </>
  );
}
