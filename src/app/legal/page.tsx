import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { getLegalDocuments } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Юридические документы",
  description:
    "Реквизиты, политика обработки персональных данных, информация об отсутствии форм сбора данных и публичная оферта TOKYON TECH.",
  alternates: { canonical: "/legal" }
};

export default async function LegalPage() {
  const documents = await getLegalDocuments();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Документы</p>
          <h1>Юридические страницы и реквизиты</h1>
          <p>Контакты, реквизиты и документы компании собраны в одном разделе.</p>
        </div>
      </section>
      <Section>
        <div className="cards-grid">
          {documents.map((document) => (
            <article className="legal-card" key={document.slug}>
              <h2>{document.title}</h2>
              <p>{document.excerpt}</p>
              <Link className="button button-secondary" href={`/legal/${document.slug}`}>
                Открыть документ
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
