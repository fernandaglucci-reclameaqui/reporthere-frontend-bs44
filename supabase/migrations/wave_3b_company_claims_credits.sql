-- Wave 3B: Company Claims and Credits Tables
-- This migration creates the infrastructure for company claiming and reply credits

-- 1. Create company_claims table
CREATE TABLE IF NOT EXISTS company_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL, -- Using company slug/name for now (can be UUID later)
  claimed_by_user_id UUID NOT NULL,
  claim_status VARCHAR(20) DEFAULT 'pending' CHECK (claim_status IN ('pending', 'verified', 'rejected')),
  verification_method VARCHAR(50) CHECK (verification_method IN ('email_domain', 'admin_manual', 'code_to_email')),
  verification_email TEXT,
  business_website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(company_id) -- Only one claim per company
);

-- 2. Create company_credits table
CREATE TABLE IF NOT EXISTS company_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL UNIQUE, -- One credits record per company
  reply_credits INTEGER DEFAULT 0 CHECK (reply_credits >= 0),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_company_claims_company_id ON company_claims(company_id);
CREATE INDEX IF NOT EXISTS idx_company_claims_user_id ON company_claims(claimed_by_user_id);
CREATE INDEX IF NOT EXISTS idx_company_claims_status ON company_claims(claim_status);
CREATE INDEX IF NOT EXISTS idx_company_credits_company_id ON company_credits(company_id);

-- 4. Enable RLS
ALTER TABLE company_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_credits ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view company claims" ON company_claims;
DROP POLICY IF EXISTS "Users can create claims" ON company_claims;
DROP POLICY IF EXISTS "Users can view their own claims" ON company_claims;
DROP POLICY IF EXISTS "Anyone can view company credits" ON company_credits;
DROP POLICY IF EXISTS "System can update credits" ON company_credits;

-- 6. Create RLS policies for company_claims

-- Anyone can view claims (to show verified status)
CREATE POLICY "Anyone can view company claims"
  ON company_claims FOR SELECT
  USING (true);

-- Authenticated users can create claims
CREATE POLICY "Users can create claims"
  ON company_claims FOR INSERT
  WITH CHECK (auth.uid() = claimed_by_user_id);

-- Users can view their own claims
CREATE POLICY "Users can view their own claims"
  ON company_claims FOR SELECT
  USING (auth.uid() = claimed_by_user_id);

-- 7. Create RLS policies for company_credits

-- Anyone can view credits (to show remaining credits)
CREATE POLICY "Anyone can view company credits"
  ON company_credits FOR SELECT
  USING (true);

-- System can insert/update credits (for admin panel and decrementing)
CREATE POLICY "System can update credits"
  ON company_credits FOR ALL
  USING (true)
  WITH CHECK (true);

-- 8. Create function to decrement reply credits safely
CREATE OR REPLACE FUNCTION decrement_reply_credit(p_company_id TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  -- Get current credits with row lock
  SELECT reply_credits INTO current_credits
  FROM company_credits
  WHERE company_id = p_company_id
  FOR UPDATE;
  
  -- Check if credits exist and are > 0
  IF current_credits IS NULL OR current_credits <= 0 THEN
    RETURN FALSE;
  END IF;
  
  -- Decrement credits
  UPDATE company_credits
  SET reply_credits = reply_credits - 1,
      updated_at = NOW()
  WHERE company_id = p_company_id;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Create function to initialize credits for a new company
CREATE OR REPLACE FUNCTION initialize_company_credits(p_company_id TEXT, p_initial_credits INTEGER DEFAULT 5)
RETURNS VOID AS $$
BEGIN
  INSERT INTO company_credits (company_id, reply_credits, updated_at)
  VALUES (p_company_id, p_initial_credits, NOW())
  ON CONFLICT (company_id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Create trigger to auto-initialize credits when company is verified
CREATE OR REPLACE FUNCTION auto_initialize_credits()
RETURNS TRIGGER AS $$
BEGIN
  -- When a claim is verified, initialize credits if they don't exist
  IF NEW.claim_status = 'verified' AND OLD.claim_status != 'verified' THEN
    PERFORM initialize_company_credits(NEW.company_id, 5); -- 5 free credits on verification
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_auto_initialize_credits ON company_claims;
CREATE TRIGGER trigger_auto_initialize_credits
  AFTER UPDATE ON company_claims
  FOR EACH ROW
  EXECUTE FUNCTION auto_initialize_credits();

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Wave 3B migration complete: company_claims and company_credits tables created';
END $$;
