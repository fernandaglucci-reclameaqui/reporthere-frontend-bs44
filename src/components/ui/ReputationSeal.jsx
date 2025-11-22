import React from 'react';
import { getReputationSealConfig } from '@/constants/sentiment';

/**
 * ReputationSeal Component
 * Displays a company's system-generated reputation seal
 * 
 * @param {string} seal - The reputation seal type (from REPUTATION_SEAL_TYPES)
 * @param {string} variant - Display variant ('badge', 'full')
 * @param {string} className - Additional CSS classes
 */
export default function ReputationSeal({ seal, variant = 'badge', className = '' }) {
  const config = getReputationSealConfig(seal);
  
  if (!config) {
    return null;
  }

  if (variant === 'badge') {
    return (
      <div 
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${className}`}
        style={{ 
          backgroundColor: `${config.color}20`,
          color: config.color,
          border: `1px solid ${config.color}40`
        }}
      >
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div 
        className={`flex items-center gap-3 p-4 rounded-lg ${className}`}
        style={{ 
          backgroundColor: `${config.color}10`,
          border: `2px solid ${config.color}40`
        }}
      >
        <span className="text-3xl">{config.icon}</span>
        <div>
          <div className="font-semibold" style={{ color: config.color }}>
            {config.label}
          </div>
          {config.isDefault && (
            <div className="text-xs text-gray-600 mt-1">
              New profile - building reputation
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
