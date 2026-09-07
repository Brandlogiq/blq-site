export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, year desc) {
  _id,
  title,
  "slug": slug.current,
  client,
  category,
  year,
  description,
  services,
  videoUrl,
  featured,
  featuredTitle,
  featuredLabel,
  featuredColor,
  "coverImage": coverImage.asset->url,
  "gallery": gallery[]{ "url": coalesce(url, asset->url) }.url
}`;

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  client,
  category,
  year,
  description,
  services,
  videoUrl,
  featured,
  featuredTitle,
  featuredLabel,
  featuredColor,
  "coverImage": coverImage.asset->url,
  "gallery": gallery[]{ "url": coalesce(url, asset->url) }.url
}`;
