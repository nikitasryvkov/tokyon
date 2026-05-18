import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Section } from "@/components/Section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контакты TOKYON TECH: прямые ссылки на email и Telegram без форм обратной связи и сбора данных на сайте.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Контакты</p>
          <h1>Связь без форм и сбора данных на сайте</h1>
          <p>
            На сайте нет полей ввода, регистрации, подписки, онлайн-чата и callback-виджетов. Для
            связи используйте прямую ссылку на email или Telegram.
          </p>
          <div className="hero-actions">
            <ButtonLink href={site.emailHref}>
              <Mail aria-hidden size={18} />
              Написать на почту
            </ButtonLink>
            <ButtonLink href={site.telegramHref} variant="ghost">
              <MessageCircle aria-hidden size={18} />
              Написать в Telegram
            </ButtonLink>
          </div>
        </div>
      </section>
      <Section
        eyebrow="Официальные контакты"
        title="Контакты и реквизиты"
        text="Передача сведений при обращении по email или Telegram происходит по инициативе пользователя во внешнем канале связи, а не через форму сайта."
      >
        <div className="contact-panel">
          <p>{site.legalName}</p>
          <p>ИНН {site.inn}</p>
          <p>ОГРНИП {site.ogrnip}</p>
          <p>{site.address}</p>
          <p>
            Email: <a href={site.emailHref}>{site.email}</a>
          </p>
          <p>
            Telegram: <a href={site.telegramHref}>{site.telegramLabel}</a>
          </p>
        </div>
      </Section>
    </>
  );
}
