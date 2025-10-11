export function reputationLevel(m) {
  if (!m) return "No Data";
  const responded = Number(m.responded_pct || 0);
  const solved    = Number(m.solved_pct || 0);
  const rating    = Number(m.rating_avg || 0);

  if (responded >= 90 && solved >= 90 && rating >= 8) return "Top Badge";
  if (solved >= 70 && rating >= 7) return "Excellent";
  if (solved >= 50) return "Good";
  return "Needs Improvement";
}