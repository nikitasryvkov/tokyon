import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/content";

type PricingCardProps = {
  plan: {
    title: string;
    description: string;
    priceFrom: string;
    duration: string;
    bestFor: string;
    features: unknown;
  };
};

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.map(String) : [];
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <article className="pricing-card">
      <div>
        <p className="eyebrow">{plan.duration}</p>
        <h3>{plan.title}</h3>
        <p>{plan.description}</p>
      </div>
      <strong className="price">{plan.priceFrom}</strong>
      <p className="best-for">{plan.bestFor}</p>
      <ul className="check-list">
        {asStringArray(plan.features).map((feature) => (
          <li key={feature}>
            <Check aria-hidden size={17} />
            {feature}
          </li>
        ))}
      </ul>
      <ButtonLink href={site.emailHref} variant="secondary">
        Написать на почту
      </ButtonLink>
    </article>
  );
}
