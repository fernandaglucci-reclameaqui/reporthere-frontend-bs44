-- Dashboard Metrics RPC Function
-- Returns all dashboard metrics in one call with proper N/A handling

CREATE OR REPLACE FUNCTION public.get_company_dashboard_metrics(p_company_id TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_total INT;
  v_open INT;
  v_resolved_all INT;
  v_resolved_30d INT;
  v_resolution_rate NUMERIC;
  v_avg_first_response_seconds NUMERIC;
  v_rating_count INT;
  v_loved_score NUMERIC;
  v_sla_hours INT := 24; -- Default SLA (can be made configurable later)
  v_sla_eligible INT;
  v_sla_met INT;
  v_sla_met_rate NUMERIC;
BEGIN
  -- Total complaints
  SELECT COUNT(*)
  INTO v_total
  FROM public.company_complaints c
  WHERE c.company_id = p_company_id;

  -- Open complaints (not resolved)
  SELECT COUNT(*)
  INTO v_open
  FROM public.company_complaints c
  WHERE c.company_id = p_company_id
    AND COALESCE(c.status, '') <> 'resolved';

  -- Resolved (all time)
  SELECT COUNT(*)
  INTO v_resolved_all
  FROM public.company_complaints c
  WHERE c.company_id = p_company_id
    AND c.status = 'resolved';

  -- Resolved (last 30 days)
  SELECT COUNT(*)
  INTO v_resolved_30d
  FROM public.company_complaints c
  WHERE c.company_id = p_company_id
    AND c.status = 'resolved'
    AND c.resolved_at >= NOW() - INTERVAL '30 days';

  -- Safe resolution rate (NULL when total=0)
  IF v_total > 0 THEN
    v_resolution_rate := v_resolved_all::NUMERIC / v_total::NUMERIC;
  ELSE
    v_resolution_rate := NULL;
  END IF;

  -- Avg first response time (using business_response field or first_response_at)
  WITH response_times AS (
    SELECT 
      EXTRACT(EPOCH FROM (c.first_response_at - c.created_date)) AS seconds
    FROM public.company_complaints c
    WHERE c.company_id = p_company_id
      AND c.first_response_at IS NOT NULL
      AND c.first_response_at >= c.created_date
  )
  SELECT AVG(seconds)
  INTO v_avg_first_response_seconds
  FROM response_times;

  -- Loved Score (customer sentiment ratings)
  -- Using customer_sentiment field (green=5, yellow=4, orange=3, red=2, purple=1)
  WITH sentiment_scores AS (
    SELECT 
      CASE 
        WHEN customer_sentiment = 'GREEN' THEN 5
        WHEN customer_sentiment = 'YELLOW' THEN 4
        WHEN customer_sentiment = 'ORANGE' THEN 3
        WHEN customer_sentiment = 'RED' THEN 2
        WHEN customer_sentiment = 'PURPLE' THEN 1
        ELSE NULL
      END AS score
    FROM public.company_complaints c
    WHERE c.company_id = p_company_id
      AND c.customer_sentiment IS NOT NULL
      AND c.status = 'resolved' -- Only count resolved complaints
  )
  SELECT 
    COUNT(*),
    CASE 
      WHEN COUNT(*) > 0 THEN (SUM(score)::NUMERIC / (COUNT(*)::NUMERIC * 5.0))
      ELSE NULL
    END
  INTO v_rating_count, v_loved_score
  FROM sentiment_scores
  WHERE score IS NOT NULL;

  -- SLA Met (last 30 days)
  WITH eligible AS (
    SELECT
      c.id,
      c.created_date,
      c.first_response_at
    FROM public.company_complaints c
    WHERE c.company_id = p_company_id
      AND c.created_date >= NOW() - INTERVAL '30 days'
      AND c.first_response_at IS NOT NULL
      AND c.first_response_at >= c.created_date
  )
  SELECT 
    COUNT(*),
    COUNT(*) FILTER (WHERE EXTRACT(EPOCH FROM (first_response_at - created_date)) <= (v_sla_hours * 3600))
  INTO v_sla_eligible, v_sla_met
  FROM eligible;

  IF v_sla_eligible > 0 THEN
    v_sla_met_rate := v_sla_met::NUMERIC / v_sla_eligible::NUMERIC;
  ELSE
    v_sla_met_rate := NULL;
  END IF;

  RETURN jsonb_build_object(
    'totalComplaints', v_total,
    'openComplaints', v_open,
    'resolvedAll', v_resolved_all,
    'resolved30d', v_resolved_30d,
    'resolutionRate', v_resolution_rate,
    'avgFirstResponseSeconds', v_avg_first_response_seconds,
    'ratingCount', v_rating_count,
    'lovedScore', v_loved_score,
    'slaHours', v_sla_hours,
    'slaEligibleCount', v_sla_eligible,
    'slaMet', v_sla_met_rate
  );
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.get_company_dashboard_metrics(TEXT) TO authenticated;

COMMENT ON FUNCTION public.get_company_dashboard_metrics IS 'Returns all dashboard metrics for a company with proper N/A handling for zero-data states';
