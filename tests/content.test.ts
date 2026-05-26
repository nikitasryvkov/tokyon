import { describe, expect, it } from "vitest";
import { legalDocuments, navItems, services, site } from "../src/lib/content";

describe("site content", () => {
  it("does not contain template foreign domains", () => {
    const content = JSON.stringify({ legalDocuments, services, navItems });
    expect(content).not.toMatch(/kayota\.ru/i);
    expect(content).not.toMatch(/tekyon_tech/i);
  });

  it("has unique navigation links and service slugs", () => {
    expect(new Set(navItems.map((item) => item.href)).size).toBe(navItems.length);
    expect(new Set(services.map((service) => service.slug)).size).toBe(services.length);
  });

  it("uses only direct public contact links", () => {
    expect(site.email).toBe("hello@tekyon.ru");
    expect(site.emailHref).toBe("mailto:hello@tekyon.ru");
  });
});
