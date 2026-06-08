import { defineType, defineField } from "sanity";

export const siteContent = defineType({
  name: "siteContent",
  title: "Site Content",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
    }),
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "string",
      description: "Small text below the hero title. Leave empty to keep the default ('Precision in ink.').",
    }),
    defineField({
      name: "hideHeroTagline",
      title: "Hide Hero Tagline",
      type: "boolean",
      description: "Toggle on to hide the tagline entirely.",
      initialValue: false,
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutBio",
      title: "About Bio",
      type: "text",
    }),
    defineField({
      name: "artistPortrait",
      title: "Artist Portrait",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "studioHours",
      title: "Studio Hours",
      type: "string",
    }),
    defineField({
      name: "waitlistStatus",
      title: "Waitlist Status",
      type: "string",
    }),
    defineField({
      name: "accentColour",
      title: "Accent Colour (hex)",
      type: "string",
      description: "Hex colour string, e.g. #c8b89a",
    }),
  ],
});
