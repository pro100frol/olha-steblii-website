import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const client = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      apiVersion: "2024-01-01",
      useCdn: false,
    })
  : null;

const builder = client ? createImageUrlBuilder(client) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) throw new Error("Sanity client not configured");
  return builder.image(source);
}
