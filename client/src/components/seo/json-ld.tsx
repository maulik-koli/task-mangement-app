import { DOMAIN_URL } from "@/constants/seo";

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Task Management Application",
          url: DOMAIN_URL,
          description: "Manage and organize your tasks efficiently with Task Management app.",
          publisher: {
            "@type": "Organization",
            name: "Task Management Team",
          },
        }).replace(/</g, '\\u003c'),
      }}
    />
  );
}
