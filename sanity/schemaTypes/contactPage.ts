import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page title", type: "string", initialValue: "Partner With Us" }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
      initialValue: "We build brands for the world and own the stories that define them.",
    }),
    defineField({ name: "location", title: "Location", type: "string", initialValue: "Kathmandu / Global Remote" }),
    defineField({ name: "email", title: "Email", type: "string", initialValue: "hello@brandlogiq.org" }),
    defineField({ name: "namePlaceholder", title: "Name field placeholder", type: "string", initialValue: "Name" }),
    defineField({ name: "emailPlaceholder", title: "Email field placeholder", type: "string", initialValue: "Email" }),
    defineField({ name: "briefPlaceholder", title: "Brief field placeholder", type: "string", initialValue: "Brief" }),
    defineField({ name: "submitLabel", title: "Form button", type: "string", initialValue: "Submit Request" }),
  ],
});
