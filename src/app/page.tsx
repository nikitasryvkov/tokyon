import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PricingCard } from "@/components/PricingCard";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { TechVisual } from "@/components/TechVisual";
import { benefits, processSteps, site, tasks } from "@/lib/content";
import { getFaqItems, getPricingPlans, getServices } from "@/lib/public-data";

export default async function HomePage() {
  const [services, pricingPlans, faqItems] = await Promise.all([
    getServices(),
    getPricingPlans(),
    getFaqItems()
  ]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.slice(0, 6).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">IT-разработка для бизнеса</p>
            <h1>Сайты, web-приложения и backend для задач бизнеса</h1>
            <p className="hero-text">
              TOKYON TECH / TEKYON проектирует и разрабатывает сайты, API, базы данных,
              административные панели и поддержку, чтобы у компании была понятная цифровая
              платформа для заявок, контента и дальнейшего развития.
            </p>
            <div className="hero-actions">
              <ButtonLink href={site.emailHref}>
                Написать на почту
                <ArrowRight aria-hidden size={18} />
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Посмотреть услуги
              </ButtonLink>
              <ButtonLink href={site.telegramHref} variant="ghost">
                <MessageCircle aria-hidden size={18} />
                Написать в Telegram
              </ButtonLink>
            </div>
            <div className="trust-strip" aria-label="Факторы доверия">
              <div className="trust-item">
                <strong>Работа по договору</strong>
                <span>реквизиты, контакты и документы доступны на сайте</span>
              </div>
              <div className="trust-item">
                <strong>Понятная оценка</strong>
                <span>состав работ, сроки и стоимость фиксируются до старта</span>
              </div>
              <div className="trust-item">
                <strong>Передача проекта</strong>
                <span>доступы, инструкции и документация для дальнейшей поддержки</span>
              </div>
            </div>
          </div>
          <TechVisual />
        </div>
      </section>

      <Section
        eyebrow="Услуги"
        title="Собираем сайт как информационный и коммерческий инструмент"
        text="Каждая услуга упакована в понятный результат: что входит, кому подходит, какие сроки и от какой стоимости стартует работа."
      >
        <div className="cards-grid">
          {services.slice(0, 4).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Задачи"
        title="Какие задачи решаем"
        text="Делаем не только визуальную часть: продумываем структуру, заявки, данные, безопасность, SEO и последующее развитие проекта."
      >
        <div className="task-grid">
          {tasks.map((task, index) => (
            <article className="task-item" key={task}>
              <span className="task-index">{index + 1}</span>
              <h3>{task}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Процесс"
        title="Как проходит работа"
        text="Сначала фиксируем цель и ограничения, затем проектируем структуру, реализуем, тестируем и передаем проект с инструкциями."
      >
        <div className="process-grid">
          {processSteps.slice(0, 4).map((step, index) => (
            <article className="process-step" key={step.title}>
              <span className="process-index">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Тарифы"
        title="Пакеты под разные стадии проекта"
        text="Стоимость уточняется после короткого брифа: важны состав работ, интеграции, контент, сроки и уровень поддержки."
      >
        <div className="cards-grid">
          {pricingPlans.slice(0, 3).map((plan) => (
            <PricingCard key={plan.slug} plan={plan} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Преимущества"
        title="Почему проект будет проще поддерживать"
        text="Сайт проектируется как платформа: компонентный frontend, понятный backend, миграции, админка и документация."
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

      <Section eyebrow="FAQ" title="Коротко о важных деталях">
        <FaqList items={faqItems.slice(0, 4)} />
      </Section>

      <Section className="final-cta">
        <div className="cta-band">
          <p className="eyebrow">Начать проект</p>
          <h2>Напишите удобным способом, и мы предложим понятный план разработки</h2>
          <p>
            Можно прийти с идеей, текущим сайтом, списком задач или готовым техническим заданием.
            Связь происходит только через email или Telegram, без форм и сбора данных на сайте.
          </p>
          <div className="hero-actions">
            <ButtonLink href={site.emailHref}>Написать на почту</ButtonLink>
            <ButtonLink href={site.telegramHref} variant="ghost">
              <MessageCircle aria-hidden size={18} />
              Написать в Telegram
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Контакты"
        title="Готовы обсудить проект"
        text="На сайте нет форм обратной связи, регистрации, подписки, онлайн-чата и трекеров. Для связи используйте прямые ссылки."
      >
        <div className="content-split">
          <div className="cta-band">
            <h2>Свяжитесь напрямую</h2>
            <p>
              Нажатие на кнопку открывает ваш почтовый клиент или Telegram. Сайт не показывает
              форму, не принимает сообщения и не сохраняет данные посетителей.
            </p>
            <div className="hero-actions">
              <ButtonLink href={site.emailHref}>Связаться по email</ButtonLink>
              <ButtonLink href={site.telegramHref} variant="ghost">
                <MessageCircle aria-hidden size={18} />
                Обсудить проект в Telegram
              </ButtonLink>
            </div>
          </div>
          <aside className="contact-panel">
            <h3>Официальные контакты</h3>
            <p>{site.legalName}</p>
            <p>ИНН {site.inn}</p>
            <p>ОГРНИП {site.ogrnip}</p>
            <p>
              <a href={site.emailHref}>{site.email}</a>
            </p>
            <p>
              <a href={site.telegramHref}>{site.telegramLabel}</a>
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
