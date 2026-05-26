import Link from "next/link";
import { navItems, site } from "@/lib/content";

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
      </div>
    </header>
  );
}
