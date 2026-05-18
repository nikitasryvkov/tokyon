import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title?: string;
  text?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ eyebrow, title, text, children, className = "" }: SectionProps) {
  return (
    <section className={`section ${className}`}>
      <div className="container">
        {(eyebrow || title || text) && (
          <div className="section-intro">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
            {text && <p>{text}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
