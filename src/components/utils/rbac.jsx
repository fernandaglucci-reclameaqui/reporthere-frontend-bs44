export function requireCompanyRole(memberRole, minRole = "agent") {
  const order = ["viewer", "agent", "admin", "owner"];
  const have = memberRole || "viewer";
  if (order.indexOf(have) < order.indexOf(minRole)) {
    throw new Error("Permission denied. Required role: " + minRole);
  }
}

export function withinSeatLimit(subscription, membersCount) {
  // default open until billing is fully wired
  if (!subscription || subscription.plan === 'Free') return true; 
  return (subscription.status === "active") && (membersCount <= (subscription.seats || 3));
}