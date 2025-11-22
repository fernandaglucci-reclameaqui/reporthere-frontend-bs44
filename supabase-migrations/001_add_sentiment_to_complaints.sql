-- Migration: Add sentiment tracking fields to complaints table
-- Date: 2024-11-22
-- Description: Adds customer_sentiment, resolved_at, and first_response_at fields

-- Create sentiment enum type
CREATE TYPE customer_sentiment_type AS ENUM (
  'GREEN',    -- You Nailed It!
  'YELLOW',   -- It's Meh…
  'ORANGE',   -- Uh Oh… Could Be Better
  'RED',      -- Pretty Disappointing
  'PURPLE'    -- Feeling Ignored
);

-- Add new columns to complaints table
ALTER TABLE complaints
ADD COLUMN IF NOT EXISTS customer_sentiment customer_sentiment_type,
ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS first_response_at TIMESTAMP WITH TIME ZONE;

-- Create index on customer_sentiment for faster queries
CREATE INDEX IF NOT EXISTS idx_complaints_customer_sentiment 
ON complaints(customer_sentiment);

-- Create index on resolved_at for faster queries
CREATE INDEX IF NOT EXISTS idx_complaints_resolved_at 
ON complaints(resolved_at);

-- Create index on first_response_at for faster queries
CREATE INDEX IF NOT EXISTS idx_complaints_first_response_at 
ON complaints(first_response_at);

-- Create index on company_id + customer_sentiment for aggregation queries
CREATE INDEX IF NOT EXISTS idx_complaints_company_sentiment 
ON complaints(company_id, customer_sentiment);

-- Add comment explaining the sentiment field
COMMENT ON COLUMN complaints.customer_sentiment IS 
'Customer sentiment after interaction - represents how the customer FELT, not a judgment on the company';

COMMENT ON COLUMN complaints.resolved_at IS 
'Timestamp when the complaint was marked as resolved or closed';

COMMENT ON COLUMN complaints.first_response_at IS 
'Timestamp when the business first responded to the complaint';
