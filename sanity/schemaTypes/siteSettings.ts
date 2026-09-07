import { defineField, defineType } from "sanity";
import { fallbackSettings } from "../../lib/site-defaults";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "brandName", title: "Brand name", type: "string", initialValue: "BrandLogiq" }),
    defineField({ name: "siteTitle", title: "Browser title", type: "string", initialValue: "BrandLogiq | Unified Powerhouse" }),
    defineField({
      name: "siteDescription",
      title: "Browser description",
      type: "text",
      rows: 2,
      initialValue: "Visions Scaled. Legacies Owned.",
    }),
    defineField({ name: "workNavLabel", title: "Work nav label", type: "string", initialValue: "Work" }),
    defineField({ name: "contactNavLabel", title: "Contact nav label", type: "string", initialValue: "Contact" }),
    defineField({ name: "location", title: "Location", type: "string", initialValue: "Kathmandu / Global Remote" }),
    defineField({ name: "email", title: "Email", type: "string", initialValue: "hello@brandlogiq.org" }),
    defineField({ name: "copyright", title: "Footer copyright", type: "string", initialValue: "© 2026 BrandLogiq" }),
  ],
  initialValue: fallbackSettings,
});
