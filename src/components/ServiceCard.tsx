import {
  Database,
  Globe2,
  Palette,
  RefreshCcw,
  SearchCheck,
  Server,
  Settings2,
  ShieldCheck
} from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/content";

type ServiceCardProps = {
  service: {
    slug: string;
    title: string;
    summary: string;
    priceFrom: string;
    duration: string;
    icon: string;
  };
};

const icons = {
  globe: Globe2,
  refresh: RefreshCcw,
  server: Server,
  database: Database,
  shield: ShieldCheck,
  palette: Palette,
  search: SearchCheck,
  settings: Settings2
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = icons[service.icon as keyof typeof icons] ?? Globe2;

  return (
    <article className="service-card">
      <div className="card-icon">
        <Icon aria-hidden size={22} />
      </div>
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
      <dl className="mini-meta">
        <div>
          <dt>Срок</dt>
          <dd>{service.duration}</dd>
        </div>
        <div>
          <dt>Стоимость</dt>
          <dd>{service.priceFrom}</dd>
        </div>
      </dl>
      <div className="card-actions">
        <ButtonLink href={`/services/${service.slug}`} variant="secondary">
          Подробнее
        </ButtonLink>
        <ButtonLink href={site.telegramHref} variant="ghost">
          Написать в Telegram
        </ButtonLink>
      </div>
    </article>
  );
}
