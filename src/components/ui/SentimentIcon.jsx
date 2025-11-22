import React from 'react';
import { getSentimentConfig } from '@/constants/sentiment';

/**
 * SentimentIcon Component
 * Displays a sentiment face icon with consistent styling
 * 
 * @param {string} sentiment - The sentiment type (from SENTIMENT_TYPES)
 * @param {string} size - Size class (sm, md, lg, xl)
 * @param {string} className - Additional CSS classes
 */
export default function SentimentIcon({ sentiment, size = 'md', className = '' }) {
  const config = getSentimentConfig(sentiment);
  
  if (!config) {
    return null;
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src={config.icon} 
        alt={config.label} 
        className={`${sizeClasses[size]} object-contain`}
        title={config.label}
      />
    </div>
  );
}
