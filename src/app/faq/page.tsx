import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { getFaqItems } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Ответы на вопросы о разработке сайтов, доработках, backend, API, заявках, админке, уведомлениях и юридических документах.",
  alternates: { canonical: "/faq" }
};

export default async function FaqPage() {
  const items = await getFaqItems();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer
            }
          }))
        }}
      />
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">FAQ</p>
          <h1>Вопросы, которые обычно появляются перед стартом</h1>
          <p>
            Собрали ответы про разработку, доработку, заявки, админку, запуск, поддержку и
            юридические документы.
          </p>
        </div>
      </section>
      <Section>
        <FaqList items={items} />
      </Section>
    </>
  );
}
