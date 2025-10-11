import React from "react";

export default function Chip({ children, intent="neutral", className="" }) {
  const colors = {
    neutral: "bg-gray-100 text-gray-700",
    success: "bg-emerald-100 text-emerald-700",
    info: "bg-sky-100 text-sky-700",
    warning: "bg-amber-100 text-amber-700",
  }[intent];
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors} ${className}`}>
      {children}
    </span>
  );
}