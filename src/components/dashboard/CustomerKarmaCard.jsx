import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, TrendingUp } from 'lucide-react';
import { SentimentIcon } from '@/components/ui/SentimentIcon';
import { SENTIMENT_TYPES } from '@/constants/sentiment';

/**
 * Customer Karma Card Component
 * Displays the 5-sentiment distribution and Customer Karma score
 */
export default function CustomerKarmaCard({ karmaData }) {
  const { 
    customerKarma, // 0-100 score
    sentimentCounts, // { green, yellow, orange, red, purple }
    sentimentPercentages, // { green, yellow, orange, red, purple }
    total,
    reputationSeal
  } = karmaData;

  if (total === 0) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-green-600" />
            Customer Karma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No customer sentiment yet</p>
            <p className="text-sm mt-2">Sentiment appears when customers share how they felt after interactions</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isHighlyRated = customerKarma >= 80;

  return (
    <Card className={`col-span-full ${isHighlyRated ? 'border-green-500 border-2' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-green-600" />
            Customer Karma
          </CardTitle>
          {isHighlyRated && (
            <Badge className="bg-green-600 text-white px-3 py-1 text-sm">
              💚 Highly Recommended
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Score Display */}
          <div className="text-center">
            <div className="text-6xl font-bold text-green-600 mb-2">
              {customerKarma}
            </div>
            <p className="text-gray-600">Customer Karma Score</p>
            <p className="text-sm text-gray-500 mt-1">Based on {total} customer interactions</p>
          </div>

          {/* Sentiment Bars - 5 sentiments */}
          <div className="space-y-4">
            {/* Green - You Nailed It! */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium flex items-center gap-2">
                  <SentimentIcon type="GREEN" size="sm" />
                  <span>{SENTIMENT_TYPES.GREEN.label}</span>
                </span>
                <span className="text-sm font-semibold text-green-600">
                  {sentimentPercentages.green}% ({sentimentCounts.green})
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${sentimentPercentages.green}%` }}
                />
              </div>
            </div>

            {/* Yellow - It's Meh */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium flex items-center gap-2">
                  <SentimentIcon type="YELLOW" size="sm" />
                  <span>{SENTIMENT_TYPES.YELLOW.label}</span>
                </span>
                <span className="text-sm font-semibold text-yellow-600">
                  {sentimentPercentages.yellow}% ({sentimentCounts.yellow})
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${sentimentPercentages.yellow}%` }}
                />
              </div>
            </div>

            {/* Orange - Uh Oh */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium flex items-center gap-2">
                  <SentimentIcon type="ORANGE" size="sm" />
                  <span>{SENTIMENT_TYPES.ORANGE.label}</span>
                </span>
                <span className="text-sm font-semibold text-orange-600">
                  {sentimentPercentages.orange}% ({sentimentCounts.orange})
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${sentimentPercentages.orange}%` }}
                />
              </div>
            </div>

            {/* Red - Pretty Disappointing */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium flex items-center gap-2">
                  <SentimentIcon type="RED" size="sm" />
                  <span>{SENTIMENT_TYPES.RED.label}</span>
                </span>
                <span className="text-sm font-semibold text-red-600">
                  {sentimentPercentages.red}% ({sentimentCounts.red})
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${sentimentPercentages.red}%` }}
                />
              </div>
            </div>

            {/* Purple - Feeling Ignored */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium flex items-center gap-2">
                  <SentimentIcon type="PURPLE" size="sm" />
                  <span>{SENTIMENT_TYPES.PURPLE.label}</span>
                </span>
                <span className="text-sm font-semibold text-purple-600">
                  {sentimentPercentages.purple}% ({sentimentCounts.purple})
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${sentimentPercentages.purple}%` }}
                />
              </div>
            </div>
          </div>

          {/* Karma Score Info */}
          {isHighlyRated ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-800 font-semibold mb-1">
                🎉 Congratulations! Your Customer Karma is excellent!
              </p>
              <p className="text-sm text-green-700">
                Companies with 80+ Customer Karma earn the Highly Recommended badge
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-blue-800 font-semibold mb-1 flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Keep improving!
              </p>
              <p className="text-sm text-blue-700">
                Reach 80+ Customer Karma to earn the Highly Recommended badge
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
