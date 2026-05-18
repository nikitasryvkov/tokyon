import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>Страница не найдена</h1>
        <p>Ссылка устарела, была удалена или набрана с ошибкой.</p>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <ButtonLink href="/">На главную</ButtonLink>
          <ButtonLink href={site.emailHref} variant="secondary">
            Написать на почту
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
