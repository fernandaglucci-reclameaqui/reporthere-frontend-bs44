import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from 'lucide-react';

/**
 * Format a percentage value (0..1) to display string
 */
function formatPercent01(x) {
  if (x === null || x === undefined || !Number.isFinite(x)) return null;
  return `${Math.round(x * 100)}%`;
}

/**
 * Format duration in seconds to human-readable string
 */
function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return null;
  
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  
  if (h <= 0 && m <= 0) return "<1m";
  if (h <= 0) return `${m}m`;
  return m ? `${h}h ${m}m` : `${h}h`;
}

/**
 * Render metric value based on type
 */
function renderMetric(value) {
  if (value === null || value === undefined) {
    return { display: "—", isNA: true };
  }

  switch (value.kind) {
    case "na":
      return { display: value.label ?? "—", isNA: true };
    
    case "number":
      return { 
        display: value.format ? value.format(value.value) : String(value.value),
        isNA: false 
      };
    
    case "percent":
      const pct = formatPercent01(value.value);
      return { display: pct ?? "—", isNA: pct === null };
    
    case "duration":
      const dur = formatDuration(value.seconds);
      return { display: dur ?? "—", isNA: dur === null };
    
    default:
      return { display: "—", isNA: true };
  }
}

/**
 * MetricCard Component
 * Displays a metric with proper N/A handling and beautiful styling
 * 
 * @param {string} title - Metric title
 * @param {Object} value - Metric value object with kind and value
 * @param {string} subtitle - Optional subtitle/description
 * @param {string} icon - Optional icon component
 * @param {string} color - Color theme (green, blue, purple, orange, red, pink)
 * @param {string} tooltip - Optional tooltip text to explain the metric
 */
export default function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon,
  color = "blue",
  tooltip 
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { display, isNA } = renderMetric(value);

  // Color themes
  const colorClasses = {
    green: {
      bg: "bg-gradient-to-br from-emerald-50 to-green-50",
      border: "border-emerald-200",
      icon: "text-emerald-600",
      text: "text-emerald-900",
      subtitle: "text-emerald-600"
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
      border: "border-blue-200",
      icon: "text-blue-600",
      text: "text-blue-900",
      subtitle: "text-blue-600"
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-50 to-pink-50",
      border: "border-purple-200",
      icon: "text-purple-600",
      text: "text-purple-900",
      subtitle: "text-purple-600"
    },
    orange: {
      bg: "bg-gradient-to-br from-orange-50 to-amber-50",
      border: "border-orange-200",
      icon: "text-orange-600",
      text: "text-orange-900",
      subtitle: "text-orange-600"
    },
    red: {
      bg: "bg-gradient-to-br from-red-50 to-rose-50",
      border: "border-red-200",
      icon: "text-red-600",
      text: "text-red-900",
      subtitle: "text-red-600"
    },
    pink: {
      bg: "bg-gradient-to-br from-pink-50 to-fuchsia-50",
      border: "border-pink-200",
      icon: "text-pink-600",
      text: "text-pink-900",
      subtitle: "text-pink-600"
    }
  };

  const theme = colorClasses[color] || colorClasses.blue;

  return (
    <Card className={`${theme.bg} ${theme.border} border-2 shadow-md hover:shadow-lg transition-shadow duration-200`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
              {title}
              {tooltip && (
                <div className="relative">
                  <HelpCircle 
                    className="w-4 h-4 text-gray-400 cursor-help"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  />
                  {showTooltip && (
                    <div className="absolute z-50 left-0 top-6 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl">
                      {tooltip}
                      <div className="absolute -top-1 left-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={`text-3xl font-bold ${theme.text} ${isNA ? 'text-gray-400' : ''}`}>
              {display}
            </div>
            {subtitle && (
              <div className={`mt-2 text-xs ${theme.subtitle}`}>
                {subtitle}
              </div>
            )}
          </div>
          {Icon && (
            <div className={`${theme.icon} opacity-80`}>
              <Icon className="w-8 h-8" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Helper functions to create metric value objects
 */
export const MetricValue = {
  number: (value, format) => ({ kind: "number", value, format }),
  percent: (value) => ({ kind: "percent", value }),
  duration: (seconds) => ({ kind: "duration", seconds }),
  na: (label) => ({ kind: "na", label })
};
