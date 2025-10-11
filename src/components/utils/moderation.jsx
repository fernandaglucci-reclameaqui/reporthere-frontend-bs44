// naive filter: redact PII/links; block profanity
const PROFANITY = ["idiot","stupid"]; // extend as needed
const PII_OR_LINKS = /(\b\d{3}[- .]?\d{2}[- .]?\d{4}\b)|(\b\d{10,16}\b)|(@\w+)|(https?:\/\/\S+)/gi;

export function moderateText(text = "") {
  if (!text) return { ok: true, text };
  let t = text.replace(PII_OR_LINKS, "[redacted]");
  if (PROFANITY.some(w => t.toLowerCase().includes(w))) {
    return { ok: false, reason: "profanity" };
  }
  return { ok: true, text: t };
}