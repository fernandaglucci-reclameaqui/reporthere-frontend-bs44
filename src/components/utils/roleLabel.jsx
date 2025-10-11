export function roleLabel(role) {
  if (!role) return "Consumer";
  const r = String(role).toLowerCase();
  if (r === "user") return "Consumer";
  return r.charAt(0).toUpperCase() + r.slice(1);
}