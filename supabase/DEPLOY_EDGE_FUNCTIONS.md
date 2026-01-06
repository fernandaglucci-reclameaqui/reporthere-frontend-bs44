# Deploy AI Edge Functions to Supabase

## Prerequisites
- Supabase CLI installed
- OpenAI API Key

## Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

## Step 2: Login to Supabase

```bash
supabase login
```

## Step 3: Link Your Project

```bash
cd /path/to/reporthere-frontend-bs44
supabase link --project-ref drvuhmipyzzlrwnzgdvq
```

## Step 4: Set OpenAI API Key as Secret

```bash
supabase secrets set OPENAI_API_KEY=your_openai_api_key_here
```

## Step 5: Deploy the Edge Function

```bash
supabase functions deploy ai-complaint-analysis
```

## Step 6: Verify Deployment

Go to your Supabase Dashboard:
1. Click "Edge Functions" in the sidebar
2. You should see `ai-complaint-analysis` listed
3. Click on it to see logs and test it

## Testing the Function

You can test it from the Supabase dashboard or using curl:

```bash
curl -i --location --request POST 'https://drvuhmipyzzlrwnzgdvq.supabase.co/functions/v1/ai-complaint-analysis' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"action":"generate_summary","complaint":{"title":"Test","description":"Test complaint description","category":"product_quality","sentiment":"disappointed"}}'
```

## Alternative: Manual Deployment via Supabase Dashboard

If you don't want to use CLI:

1. Go to Supabase Dashboard → Edge Functions
2. Click "New Function"
3. Name it: `ai-complaint-analysis`
4. Copy the code from `supabase/functions/ai-complaint-analysis/index.ts`
5. Paste it into the editor
6. Add `OPENAI_API_KEY` in the Secrets section
7. Click "Deploy"

## Troubleshooting

### Function not working?
- Check that `OPENAI_API_KEY` is set in Supabase secrets
- Check Edge Function logs in Supabase dashboard
- Verify your OpenAI API key is valid

### CORS errors?
- The function already includes CORS headers
- Make sure you're calling from an allowed origin

### Rate limits?
- OpenAI has rate limits based on your plan
- Consider caching results for frequently accessed complaints
