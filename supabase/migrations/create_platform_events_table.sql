-- Wave 3A: Platform Events Table
-- Stores all important platform events for automation and analytics

CREATE TABLE IF NOT EXISTS platform_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB DEFAULT '{}',
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_platform_events_type ON platform_events(event_type);
CREATE INDEX IF NOT EXISTS idx_platform_events_created_at ON platform_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_platform_events_user ON platform_events(user_id);
CREATE INDEX IF NOT EXISTS idx_platform_events_type_created ON platform_events(event_type, created_at DESC);

-- Add comment
COMMENT ON TABLE platform_events IS 'Tracks all important platform events for automation triggers and analytics';

-- Enable Row Level Security
ALTER TABLE platform_events ENABLE ROW LEVEL SECURITY;

-- Create policy: Only admins can read events
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'platform_events' AND policyname = 'Admins can read platform events'
  ) THEN
    CREATE POLICY "Admins can read platform events"
      ON platform_events
      FOR SELECT
      USING (
        EXISTS (
          SELECT 1 FROM users
          WHERE users.id = auth.uid()
          AND users.user_type = 'admin'
        )
      );
  END IF;
END $$;

-- Create policy: System can insert events
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'platform_events' AND policyname = 'System can insert platform events'
  ) THEN
    CREATE POLICY "System can insert platform events"
      ON platform_events
      FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

-- Create function to clean up old events (optional, for maintenance)
CREATE OR REPLACE FUNCTION cleanup_old_events()
RETURNS void AS $$
BEGIN
  DELETE FROM platform_events
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Add comment
COMMENT ON FUNCTION cleanup_old_events IS 'Removes events older than 90 days to keep table size manageable';
