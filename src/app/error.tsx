"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="not-found">
      <div className="container">
        <p className="eyebrow">Ошибка</p>
        <h1>Не удалось загрузить страницу</h1>
        <p>Попробуйте повторить действие. Технические детали не раскрываются пользователю.</p>
        <button className="button button-primary" type="button" onClick={reset}>
          Повторить
        </button>
      </div>
    </section>
  );
}
