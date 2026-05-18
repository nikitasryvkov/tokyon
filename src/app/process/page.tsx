import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { processSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Процесс работы",
  description:
    "Как TOKYON TECH ведет проект: заявка, обсуждение, оценка, договор, разработка, тестирование, запуск и поддержка.",
  alternates: { canonical: "/process" }
};

export default function ProcessPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Процесс</p>
          <h1>Работа строится по этапам, чтобы результат был предсказуемым</h1>
          <p>
            На каждом этапе понятно, что делаем, какие данные нужны, что считается готовым и как
            двигаемся дальше.
          </p>
        </div>
      </section>
      <Section>
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <article className="process-step" key={step.title}>
              <span className="process-index">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
