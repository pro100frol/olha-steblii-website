import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://olhasteblii.com/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}