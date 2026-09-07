export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "0mj8fx70";
export const organizationId =
  process.env.NEXT_PUBLIC_SANITY_ORGANIZATION_ID || "o19o6qogl";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const isSanityConfigured = Boolean(projectId && projectId !== "mock_project_id");

export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333";

export const manageUrl = `https://www.sanity.io/manage/project/${projectId}`;
export const organizationManageUrl = `https://www.sanity.io/organizations/${organizationId}`;
