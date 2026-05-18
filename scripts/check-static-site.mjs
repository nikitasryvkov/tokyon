import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const findings = [];

async function walk(dir) {
  const entries = await readdir(dir);
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const fileStat = await stat(fullPath);

    if (fileStat.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function addFinding(file, message) {
  findings.push(`${path.relative(process.cwd(), file)}: ${message}`);
}

function checkHtml(file, html) {
  const forbiddenElements = [
    ["<form", /<form\b/i],
    ["<input", /<input\b/i],
    ["<textarea", /<textarea\b/i],
    ["<select", /<select\b/i],
    ["<iframe", /<iframe\b/i]
  ];

  for (const [label, pattern] of forbiddenElements) {
    if (pattern.test(html)) {
      addFinding(file, `found forbidden element ${label}`);
    }
  }

  if (/href=["'][^"']*\/cases\/?["']/i.test(html) || /\/cases\//i.test(html)) {
    addFinding(file, "found removed /cases route reference");
  }

  const scriptTagPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(scriptTagPattern)) {
    const [, attrs, body] = match;

    if (/\bsrc=["']https?:\/\//i.test(attrs)) {
      addFinding(file, "found external script source");
    }

    const scriptBody = `${attrs}\n${body}`;
    const trackerPatterns = [
      ["Yandex Metrika runtime", /\bym\s*\(/],
      ["Google gtag runtime", /\bgtag\s*\(/],
      ["Google dataLayer runtime", /\bdataLayer\b/],
      ["Meta pixel runtime", /\bfbq\s*\(/],
      ["VK retargeting runtime", /\bVK\.Retargeting\b/],
      ["Jivo widget runtime", /\bjivo/i],
      ["Bitrix widget runtime", /\bbitrix/i],
      ["amoCRM widget runtime", /\bamocrm/i],
      ["Roistat runtime", /\broistat/i],
      ["Calltouch runtime", /\bcalltouch/i]
    ];

    for (const [label, pattern] of trackerPatterns) {
      if (pattern.test(scriptBody)) {
        addFinding(file, `found ${label}`);
      }
    }
  }
}

try {
  const htmlFiles = (await walk(root)).filter((file) => file.endsWith(".html"));

  if (htmlFiles.length === 0) {
    throw new Error("No static HTML files found in out/. Run npm run build first.");
  }

  for (const file of htmlFiles) {
    checkHtml(file, await readFile(file, "utf8"));
  }

  if (findings.length > 0) {
    console.error("Static site safety check failed:");
    for (const finding of findings) {
      console.error(`- ${finding}`);
    }
    process.exit(1);
  }

  console.log(`Static site safety check passed: ${htmlFiles.length} HTML files scanned.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
