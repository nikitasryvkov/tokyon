import { Activity, FileCode2, LockKeyhole, SearchCheck, Server, ShieldCheck } from "lucide-react";

export function TechVisual() {
  return (
    <div className="tech-visual" aria-label="Схема технической платформы TOKYON TECH">
      <div className="visual-topline">
        <span />
        <span />
        <span />
      </div>
      <div className="visual-grid">
        <div className="visual-node primary">
          <Server aria-hidden size={22} />
          <span>Next.js</span>
        </div>
        <div className="visual-node">
          <FileCode2 aria-hidden size={22} />
          <span>Static export</span>
        </div>
        <div className="visual-node">
          <SearchCheck aria-hidden size={22} />
          <span>SEO</span>
        </div>
        <div className="visual-node">
          <ShieldCheck aria-hidden size={22} />
          <span>Static</span>
        </div>
        <div className="visual-node">
          <LockKeyhole aria-hidden size={22} />
          <span>No cookies</span>
        </div>
        <div className="visual-node">
          <Activity aria-hidden size={22} />
          <span>No trackers</span>
        </div>
      </div>
      <div className="visual-metrics">
        <div>
          <strong>90+</strong>
          <span>Lighthouse target</span>
        </div>
        <div>
          <strong>SSG</strong>
          <span>SEO-ready pages</span>
        </div>
        <div>
          <strong>0</strong>
          <span>forms and trackers</span>
        </div>
      </div>
    </div>
  );
}
