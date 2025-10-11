export const slugify = (s = "") =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/[\s-]+/g, "-").replace(/(^-|-$)/g, "");