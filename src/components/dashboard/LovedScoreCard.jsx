import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, TrendingUp } from 'lucide-react';

/**
 * Loved Score™ Card Component
 * Displays the happiness distribution and Loved Company badge
 */
export default function LovedScoreCard({ lovedScore }) {
  const { happy, neutral, sad, isLovedCompany, total, counts } = lovedScore;

  if (total === 0) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-green-600" />
            Loved Score™
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No customer ratings yet</p>
            <p className="text-sm mt-2">Ratings appear when customers provide feedback after resolution</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`col-span-full ${isLovedCompany ? 'border-green-500 border-2' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-green-600" />
            Loved Score™
          </CardTitle>
          {isLovedCompany && (
            <Badge className="bg-green-600 text-white px-3 py-1 text-sm">
              💚 Loved Company
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Score Display */}
          <div className="text-center">
            <div className="text-6xl font-bold text-green-600 mb-2">
              {happy}%
            </div>
            <p className="text-gray-600">of customers are happy</p>
            <p className="text-sm text-gray-500 mt-1">Based on {total} ratings</p>
          </div>

          {/* Sentiment Bars */}
          <div className="space-y-4">
            {/* Happy */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium flex items-center gap-2">
                  <span className="text-2xl">😊</span>
                  Happy
                </span>
                <span className="text-sm font-semibold text-green-600">
                  {happy}% ({counts.happy})
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${happy}%` }}
                />
              </div>
            </div>

            {/* Neutral */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium flex items-center gap-2">
                  <span className="text-2xl">😐</span>
                  Neutral
                </span>
                <span className="text-sm font-semibold text-gray-600">
                  {neutral}% ({counts.neutral})
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gray-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${neutral}%` }}
                />
              </div>
            </div>

            {/* Sad */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium flex items-center gap-2">
                  <span className="text-2xl">😞</span>
                  Sad
                </span>
                <span className="text-sm font-semibold text-red-600">
                  {sad}% ({counts.sad})
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${sad}%` }}
                />
              </div>
            </div>
          </div>

          {/* Loved Company Badge Info */}
          {isLovedCompany ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-800 font-semibold mb-1">
                🎉 Congratulations! You've earned the Loved Company badge!
              </p>
              <p className="text-sm text-green-700">
                Companies with 85%+ happy ratings earn this prestigious badge
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-blue-800 font-semibold mb-1 flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Keep up the great work!
              </p>
              <p className="text-sm text-blue-700">
                Reach 85% happy ratings to earn the Loved Company badge
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
