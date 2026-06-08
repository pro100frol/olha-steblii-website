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
      name: "specialties",
      title: "Specialties",
      description:
        "List of short specialty labels shown under the artist bio (e.g. 'Fine Line Specialist'). Leave empty to use the defaults.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "artistPortrait",
      title: "Artist Portrait",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "locationEyebrow",
      title: "Location – Eyebrow",
      type: "string",
      description: "Small label above the Location heading (default: 'Find Me').",
    }),
    defineField({
      name: "locationHeading",
      title: "Location – Heading",
      type: "string",
      description: "Main heading for the Location section (default: 'Location').",
    }),
    defineField({
      name: "studioLabel",
      title: "Studio Section Label",
      type: "string",
      description: "Label above the studio info (default: 'Currently Based At').",
    }),
    defineField({
      name: "studioName",
      title: "Studio Name",
      type: "string",
      description: "Default: 'Origin Tattoo London'.",
    }),
    defineField({
      name: "studioAddress",
      title: "Studio Address",
      type: "text",
      rows: 3,
      description:
        "Full address, supports multiple lines. Default: '41 Snowsfields\nLondon Bridge, London SE1 3SU'.",
    }),
    defineField({
      name: "studioHours",
      title: "Studio Hours",
      type: "text",
      rows: 4,
      description: "Supports multiple lines.",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      description: "Default: 'olhasteblii@gmail.com'.",
    }),
    defineField({
      name: "guestSpotsLabel",
      title: "Guest Spots Section Label",
      type: "string",
      description: "Label above the guest spots text (default: 'Upcoming Guest Spots').",
    }),
    defineField({
      name: "waitlistStatus",
      title: "Guest Spots / Waitlist Status",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "accentColour",
      title: "Accent Colour (hex)",
      type: "string",
      description: "Hex colour string, e.g. #c8b89a",
    }),
  ],
});
