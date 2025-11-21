import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, CheckCircle, Heart } from 'lucide-react';

/**
 * Reputation Snapshot Component
 * Displays key metrics in a clean, professional layout
 */
export default function ReputationSnapshot({ metrics }) {
  const { lovedScore, resolutionRate, responseTime, totalComplaints } = metrics;

  const cards = [
    {
      title: 'Loved Score™',
      value: `${lovedScore.happy}%`,
      subtitle: `${lovedScore.total} customer ratings`,
      icon: Heart,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      badge: lovedScore.isLovedCompany ? {
        text: 'Loved Company',
        color: 'bg-green-600 text-white'
      } : null,
      trend: lovedScore.happy >= 70 ? 'positive' : lovedScore.happy >= 50 ? 'neutral' : 'negative'
    },
    {
      title: 'Resolution Rate',
      value: `${resolutionRate.rate}%`,
      subtitle: `${resolutionRate.resolved} of ${resolutionRate.total} resolved`,
      icon: CheckCircle,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: resolutionRate.rate >= 80 ? 'positive' : resolutionRate.rate >= 60 ? 'neutral' : 'negative'
    },
    {
      title: 'Avg Response Time',
      value: responseTime.formatted,
      subtitle: `${responseTime.hours} hours average`,
      icon: Clock,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: responseTime.hours <= 24 ? 'positive' : responseTime.hours <= 48 ? 'neutral' : 'negative'
    },
    {
      title: 'Total Complaints',
      value: totalComplaints,
      subtitle: 'All time',
      icon: TrendingUp,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trend: 'neutral'
    }
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'positive') return '📈';
    if (trend === 'negative') return '📉';
    return '➡️';
  };

  const getTrendColor = (trend) => {
    if (trend === 'positive') return 'text-green-600';
    if (trend === 'negative') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Reputation Snapshot</h2>
        <span className="text-sm text-gray-500">Real-time metrics</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Badge if applicable */}
                {card.badge && (
                  <div className="absolute top-2 right-2">
                    <Badge className={`${card.badge.color} text-xs px-2 py-1`}>
                      {card.badge.text}
                    </Badge>
                  </div>
                )}

                {/* Icon */}
                <div className={`${card.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </h3>

                {/* Value */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {card.value}
                  </span>
                  <span className={`text-lg ${getTrendColor(card.trend)}`}>
                    {getTrendIcon(card.trend)}
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-xs text-gray-500">
                  {card.subtitle}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Insights */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-none">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Quick Insight</h4>
              <p className="text-sm text-gray-700">
                {lovedScore.isLovedCompany ? (
                  <>
                    <strong>Excellent work!</strong> Your Loved Score of {lovedScore.happy}% puts you in the top tier of companies. 
                    Keep maintaining this high level of customer satisfaction!
                  </>
                ) : lovedScore.happy >= 70 ? (
                  <>
                    <strong>Great progress!</strong> You're {85 - lovedScore.happy}% away from earning the Loved Company badge. 
                    Focus on resolving complaints quickly to boost satisfaction.
                  </>
                ) : lovedScore.happy >= 50 ? (
                  <>
                    <strong>Room for improvement.</strong> Consider responding faster and offering better resolutions to increase your Loved Score.
                  </>
                ) : (
                  <>
                    <strong>Action needed.</strong> Your satisfaction ratings need attention. Prioritize customer communication and swift resolutions.
                  </>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
