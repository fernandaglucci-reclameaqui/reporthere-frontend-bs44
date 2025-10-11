import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';

export const getTrustScoreInfo = (score) => {
  if (score === null || score === undefined) {
    return {
      tier: 'No Data',
      color: 'bg-gray-200 text-gray-800',
      Icon: ShieldQuestion,
      description: 'Not enough data to calculate a score.',
    };
  }
  if (score >= 80) {
    return {
      tier: 'Excellent',
      color: 'bg-green-100 text-green-800',
      Icon: ShieldCheck,
      description: 'Consumers rarely report issues.',
    };
  }
  if (score >= 60) {
    return {
      tier: 'Good',
      color: 'bg-teal-100 text-teal-800',
      Icon: Shield,
      description: 'Most consumer issues are well-handled.',
    };
  }
  if (score >= 40) {
    return {
      tier: 'Warning',
      color: 'bg-yellow-100 text-yellow-800',
      Icon: ShieldAlert,
      description: 'Noticeable issues have been reported.',
    };
  }
  return {
    tier: 'Risky',
    color: 'bg-red-100 text-red-800',
    Icon: ShieldAlert,
    description: 'Many unresolved consumer problems.',
  };
};

export default function TrustScoreDisplay({ score }) {
  const { tier, color, Icon, description } = getTrustScoreInfo(score);

  return (
    <div className="flex items-center gap-3">
      <div className="text-center">
        <div className="text-3xl font-bold text-gray-800">{score ?? 'N/A'}</div>
        <div className="text-xs font-semibold text-gray-500">Trust Score</div>
      </div>
      <Badge className={`h-fit py-1 px-3 text-sm ${color}`}>
        <Icon className="w-4 h-4 mr-1.5" />
        {tier}
      </Badge>
    </div>
  );
}