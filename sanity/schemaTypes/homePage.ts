import { defineArrayMember, defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", title: "Hero title", type: "string", initialValue: "Visions Scaled." }),
    defineField({ name: "heroAccent", title: "Hero accent line", type: "string", initialValue: "Legacies Owned." }),
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      rows: 2,
      initialValue: "We build the brands that define the world and own the assets that define the culture.",
    }),
    defineField({
      name: "heroVideo",
      title: "Hero background video",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      description: "MP4 recommended. Plays muted and looping behind the headline.",
    }),
    defineField({
      name: "heroVideoUrl",
      title: "Or hero video URL",
      type: "url",
    }),
    defineField({ name: "marqueeLeft", title: "Marquee left", type: "string", initialValue: "We Build Legacy." }),
    defineField({ name: "marqueeRight", title: "Marquee right", type: "string", initialValue: "Own The Future." }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "capability",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text", rows: 2 }),
            defineField({ name: "image", type: "image", options: { hotspot: true } }),
            defineField({ name: "imageUrl", title: "Or image URL", type: "url" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "aboutText",
      title: "About text",
      type: "text",
      rows: 4,
      initialValue:
        "BrandLogiq is a creative infrastructure. We are an interface between global brands and local execution, and a studio producing the next generation of original assets.",
    }),
    defineField({ name: "aboutCtaLabel", title: "About button", type: "string", initialValue: "Partner With Us" }),
    defineField({ name: "aboutCtaHref", title: "About button link", type: "string", initialValue: "/contact" }),
  ],
});
