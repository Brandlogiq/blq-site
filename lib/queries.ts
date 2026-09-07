export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  brandName, siteTitle, siteDescription, workNavLabel, contactNavLabel, location, email, copyright
}`;

export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  heroTitle, heroAccent, heroSubtitle, marqueeLeft, marqueeRight, aboutText, aboutCtaLabel, aboutCtaHref,
  "heroVideo": coalesce(heroVideo.asset->url, heroVideoUrl),
  "capabilities": capabilities[]{
    title,
    "description": description,
    "image": coalesce(image.asset->url, imageUrl)
  }
}`;

export const WORK_PAGE_QUERY = `*[_type == "workPage"][0]{
  title, filterAllLabel, filterClientLabel, filterVenturesLabel, viewProjectLabel,
  backLabel, clientLabel, yearLabel, categoryLabel, briefLabel, servicesLabel, galleryLabel, nextLabel
}`;

export const CONTACT_PAGE_QUERY = `*[_type == "contactPage"][0]{
  title, intro, location, email, namePlaceholder, emailPlaceholder, briefPlaceholder, submitLabel
}`;

export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, year desc) {
  _id,
  title,
  "slug": slug.current,
  client,
  category,
  year,
  description,
  services,
  "videoUrl": coalesce(backgroundVideo.asset->url, videoUrl),
  featured,
  featuredTitle,
  featuredLabel,
  featuredColor,
  "coverImage": coverImage.asset->url,
  "gallery": gallery[]{
    "_type": _type,
    "url": coalesce(url, asset->url),
    alt
  }
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
  "videoUrl": coalesce(backgroundVideo.asset->url, videoUrl),
  featured,
  featuredTitle,
  featuredLabel,
  featuredColor,
  "coverImage": coverImage.asset->url,
  "gallery": gallery[]{
    "_type": _type,
    "url": coalesce(url, asset->url),
    alt
  }
}`;
