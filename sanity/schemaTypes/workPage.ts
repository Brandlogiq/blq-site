import { defineField, defineType } from "sanity";
import { fallbackWork } from "../../lib/site-defaults";

export const workPageType = defineType({
  name: "workPage",
  title: "Work Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page title", type: "string", initialValue: "The Work" }),
    defineField({ name: "filterAllLabel", title: "Filter: All", type: "string", initialValue: "All" }),
    defineField({ name: "filterClientLabel", title: "Filter: Client", type: "string", initialValue: "Client" }),
    defineField({ name: "filterVenturesLabel", title: "Filter: Ventures", type: "string", initialValue: "Ventures" }),
    defineField({ name: "viewProjectLabel", title: "View project label", type: "string", initialValue: "View Project" }),
    defineField({ name: "backLabel", title: "Back link label", type: "string", initialValue: "Back to Work" }),
    defineField({ name: "clientLabel", title: "Client heading", type: "string", initialValue: "Client" }),
    defineField({ name: "yearLabel", title: "Year heading", type: "string", initialValue: "Year" }),
    defineField({ name: "categoryLabel", title: "Category heading", type: "string", initialValue: "Category" }),
    defineField({ name: "briefLabel", title: "Brief heading", type: "string", initialValue: "The Brief" }),
    defineField({ name: "servicesLabel", title: "Services heading", type: "string", initialValue: "Services" }),
    defineField({ name: "galleryLabel", title: "Gallery heading", type: "string", initialValue: "Project Gallery" }),
    defineField({ name: "nextLabel", title: "Next project label", type: "string", initialValue: "Next Project" }),
  ],
  initialValue: fallbackWork,
});
