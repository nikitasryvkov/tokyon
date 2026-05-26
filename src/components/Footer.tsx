import Link from "next/link";
import { Mail } from "lucide-react";
import { legalDocuments, navItems, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="logo footer-logo" href="/" aria-label="TOKYON TECH на главную">
            <span className="logo-mark">T</span>
            <span>
              <strong>{site.name}</strong>
              <small>{site.altName}</small>
            </span>
          </Link>
          <p className="footer-text">
            Разработка сайтов, backend, API, базы данных, админки и техническая поддержка для
            бизнеса.
          </p>
        </div>

        <div>
          <h2 className="footer-title">Разделы</h2>
          <ul className="footer-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer-title">Документы</h2>
          <ul className="footer-links">
            {legalDocuments.map((document) => (
              <li key={document.slug}>
                <Link href={`/legal/${document.slug}`}>{document.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <address className="footer-address">
          <h2 className="footer-title">Контакты</h2>
          <a href={site.emailHref}>
            <Mail aria-hidden size={16} />
            {site.email}
          </a>
          <span>{site.legalName}</span>
          <span>ИНН {site.inn}</span>
          <span>ОГРНИП {site.ogrnip}</span>
        </address>
      </div>
    </footer>
  );
}
