import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { navItems, site } from "@/lib/content";
import { ButtonLink } from "@/components/ButtonLink";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="logo" href="/" aria-label="TOKYON TECH на главную">
          <span className="logo-mark">T</span>
          <span>
            <strong>{site.name}</strong>
            <small>{site.altName}</small>
          </span>
        </Link>

        <nav aria-label="Основная навигация" className="main-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <ButtonLink href={site.telegramHref} variant="ghost" className="header-telegram">
            <MessageCircle aria-hidden size={18} />
            Telegram
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
