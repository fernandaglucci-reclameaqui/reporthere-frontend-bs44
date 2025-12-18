import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';

/**
 * EmptyChartCard Component
 * Shows a beautiful empty state when there's no data for charts
 * 
 * @param {string} title - Chart title
 * @param {string} hint - Helpful message for empty state
 * @param {string} iconType - Type of icon (bar, line, pie)
 */
export default function EmptyChartCard({ title, hint, iconType = "bar" }) {
  const icons = {
    bar: BarChart3,
    line: TrendingUp,
    pie: PieChart
  };

  const Icon = icons[iconType] || BarChart3;

  return (
    <Card className="bg-white border-2 border-gray-100 shadow-sm">
      <CardContent className="p-6">
        <div className="text-sm font-medium text-gray-600 mb-4">{title}</div>
        <div className="flex flex-col items-center justify-center h-48 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-200">
          <Icon className="w-12 h-12 text-gray-300 mb-3" />
          <div className="text-sm text-gray-500 text-center px-4">
            {hint}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
