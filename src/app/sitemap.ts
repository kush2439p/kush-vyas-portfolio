import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kush-portfolio-kappa.vercel.app";
  return [{ url: baseUrl, lastModified: new Date() }, ...projects.map((project) => ({ url: `${baseUrl}/work/${project.slug}`, lastModified: new Date() }))];
}
