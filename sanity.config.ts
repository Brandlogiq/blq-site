"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

const repo = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/^\//, "");

export default defineConfig({
  name: "brandlogiq",
  title: "BrandLogiq Admin",
  projectId: projectId || "0mj8fx70",
  dataset,
  basePath: repo ? `/${repo}/admin` : "/admin",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Website")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("Home Page")
              .child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem()
              .title("Work Page")
              .child(S.document().schemaType("workPage").documentId("workPage")),
            S.listItem()
              .title("Contact Page")
              .child(S.document().schemaType("contactPage").documentId("contactPage")),
            S.divider(),
            S.listItem()
              .title("Projects")
              .schemaType("project")
              .child(S.documentTypeList("project").title("Projects")),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
});
