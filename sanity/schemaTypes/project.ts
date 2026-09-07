import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Client", value: "Client" },
          { title: "Ventures", value: "Ventures" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "The Brief",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "backgroundVideo",
      title: "Background video",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      description: "MP4 recommended. Plays muted and looping behind the project title.",
    }),
    defineField({
      name: "videoUrl",
      title: "Or background video URL",
      type: "url",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
            }),
          ],
        }),
        defineArrayMember({
          name: "externalImage",
          title: "External image URL",
          type: "object",
          fields: [
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
            }),
          ],
        }),
        defineArrayMember({
          name: "youtubeVideo",
          title: "YouTube video",
          type: "object",
          fields: [
            defineField({
              name: "url",
              title: "YouTube URL",
              type: "url",
              validation: (rule) => rule.required(),
              description: "Paste a watch, youtu.be, shorts, or embed URL. The site pulls the thumbnail automatically.",
            }),
            defineField({
              name: "alt",
              title: "Label",
              type: "string",
            }),
          ],
          preview: {
            select: { url: "url" },
            prepare({ url }) {
              return {
                title: "YouTube video",
                subtitle: url,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "featuredTitle",
      title: "Featured title",
      type: "string",
      hidden: ({ parent }) => !parent?.featured,
    }),
    defineField({
      name: "featuredLabel",
      title: "Featured label",
      type: "string",
      hidden: ({ parent }) => !parent?.featured,
    }),
    defineField({
      name: "featuredColor",
      title: "Featured card color",
      type: "string",
      options: {
        list: [
          { title: "Near black", value: "bg-neutral-900" },
          { title: "Dark gray", value: "bg-neutral-800" },
          { title: "Accent", value: "bg-accent" },
        ],
      },
      hidden: ({ parent }) => !parent?.featured,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "client",
      media: "coverImage",
    },
  },
  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
