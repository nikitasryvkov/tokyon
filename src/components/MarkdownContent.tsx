function renderInline(text: string) {
  return text;
}

export function MarkdownContent({ body }: { body: string }) {
  const lines = body.split(/\r?\n/);

  return (
    <div className="markdown-content">
      {lines.map((line, index) => {
        const key = `${index}-${line.slice(0, 16)}`;
        if (!line.trim()) return null;
        if (line.startsWith("# ")) return <h1 key={key}>{renderInline(line.replace("# ", ""))}</h1>;
        if (line.startsWith("## ")) return <h2 key={key}>{renderInline(line.replace("## ", ""))}</h2>;
        if (line.startsWith("- ")) return <li key={key}>{renderInline(line.replace("- ", ""))}</li>;
        return <p key={key}>{renderInline(line)}</p>;
      })}
    </div>
  );
}
