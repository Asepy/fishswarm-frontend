import { DefaultSeo } from "next-seo";

// import your default seo configuration
// import SEO from "../next-seo.config";
const DEFAULT_DESC =
  "Unite a la comunidad de +4.000 emprendedores en los 17 departamentos, que está trabajando para hacer que emprender en Paraguay sea más fácil";

export default function Seo({ title, description = DEFAULT_DESC }) {
  const seoTitle = `${title} - A S E P Y`;
  return (
    <DefaultSeo
      title={seoTitle}
      description={description}
      openGraph={{
        type: "website",
        locale: "es_ES",
        url: process.env.NEXT_PUBLIC_SITE_URL,
        site_name: seoTitle,
      }}
      twitter={{
        handle: "@somosasepy",
        site: process.env.NEXT_PUBLIC_SITE_URL,
        cardType: "summary_large_image",
      }}
    />
  );
}
