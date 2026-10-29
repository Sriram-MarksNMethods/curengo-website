// Structured data for search engines (schema.org JSON-LD), rendered as a script tag in the page.
export default function JsonLd({ data }: { data: object | object[] }) {
  // "<" is escaped so the JSON can never close the script tag early
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
