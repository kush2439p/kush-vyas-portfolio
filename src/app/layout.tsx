import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { profile } from "@/data/portfolio";
import { CursorAura } from "@/components/cursor-aura";
import { Loader } from "@/components/loader";
import { SpringAtmosphere } from "@/components/spring-atmosphere";

export const metadata: Metadata = {
  title: "Kush Vyas | Java backend developer",
  description: "Portfolio of Kush Vyas, a Java backend developer and product-minded builder from Indore, India.",
  metadataBase: new URL("https://kush-portfolio-kappa.vercel.app"),
  keywords: ["Kush Vyas", "Java backend developer", "Spring Boot developer", "REST API developer", "React developer", "Indore software engineer"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { title: "Kush Vyas | Java backend developer", description: "Java, Spring Boot, and product engineering portfolio.", type: "website", url: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Java Backend Developer",
    email: profile.email,
    address: { "@type": "PostalAddress", addressLocality: "Indore", addressCountry: "IN" },
    sameAs: [profile.github, profile.linkedin, profile.leetcode],
  };

  return (
    <html lang="en">
      <body>
        <Loader />
        <SpringAtmosphere />
        <CursorAura />
        {children}
        <Script id="person-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(personSchema)}
        </Script>
      </body>
    </html>
  );
}
