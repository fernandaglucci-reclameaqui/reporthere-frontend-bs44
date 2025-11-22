-- Migration: Create company_reputation_metrics table
-- Date: 2024-11-22
-- Description: Creates aggregated metrics table for company reputation tracking

-- Create reputation seal enum type
CREATE TYPE reputation_seal_type AS ENUM (
  'HIGHLY_RECOMMENDED',
  'RECOMMENDED',
  'NEEDS_IMPROVEMENT',
  'NOT_RECOMMENDED',
  'UNDER_REVIEW'
);

-- Create company_reputation_metrics table
CREATE TABLE IF NOT EXISTS company_reputation_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  
  -- Basic counts
  total_complaints INTEGER DEFAULT 0,
  resolved_complaints INTEGER DEFAULT 0,
  responded_complaints INTEGER DEFAULT 0,
  ignored_complaints INTEGER DEFAULT 0,
  
  -- Sentiment counts
  count_green INTEGER DEFAULT 0,
  count_yellow INTEGER DEFAULT 0,
  count_orange INTEGER DEFAULT 0,
  count_red INTEGER DEFAULT 0,
  count_purple INTEGER DEFAULT 0,
  
  -- Calculated metrics (0-1 scale)
  response_rate DECIMAL(5,4) DEFAULT 0,
  resolution_rate DECIMAL(5,4) DEFAULT 0,
  ignored_rate DECIMAL(5,4) DEFAULT 0,
  
  -- Customer Karma score (0-100 scale)
  customer_karma DECIMAL(5,2) DEFAULT 0,
  
  -- System-generated reputation seal
  reputation_seal reputation_seal_type DEFAULT 'UNDER_REVIEW',
  
  -- Metadata
  last_calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one row per company
  UNIQUE(company_id)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_reputation_metrics_company_id 
ON company_reputation_metrics(company_id);

CREATE INDEX IF NOT EXISTS idx_reputation_metrics_seal 
ON company_reputation_metrics(reputation_seal);

CREATE INDEX IF NOT EXISTS idx_reputation_metrics_karma 
ON company_reputation_metrics(customer_karma DESC);

-- Add comments
COMMENT ON TABLE company_reputation_metrics IS 
'Aggregated reputation metrics for companies - updated when complaints change';

COMMENT ON COLUMN company_reputation_metrics.customer_karma IS 
'Customer Karma score (0-100) - calculated from sentiment distribution';

COMMENT ON COLUMN company_reputation_metrics.reputation_seal IS 
'System-generated reputation badge - NOT chosen by users';

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_reputation_metrics_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER trigger_update_reputation_metrics_updated_at
BEFORE UPDATE ON company_reputation_metrics
FOR EACH ROW
EXECUTE FUNCTION update_reputation_metrics_updated_at();
