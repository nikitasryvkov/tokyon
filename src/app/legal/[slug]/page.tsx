import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getLegalDocument, getLegalDocuments } from "@/lib/public-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const documents = await getLegalDocuments();
  return documents.map((document) => ({ slug: document.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = await getLegalDocument(slug);
  if (!document) return {};

  return {
    title: document.title,
    description: document.excerpt,
    alternates: { canonical: `/legal/${document.slug}` }
  };
}

export default async function LegalDocumentPage({ params }: PageProps) {
  const { slug } = await params;
  const document = await getLegalDocument(slug);
  if (!document) notFound();

  return (
    <section className="page-hero">
      <div className="container">
        <MarkdownContent body={document.body} />
      </div>
    </section>
  );
}
