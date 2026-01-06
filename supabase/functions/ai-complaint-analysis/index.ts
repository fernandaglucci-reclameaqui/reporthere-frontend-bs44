// AI Complaint Analysis Edge Function
// Provides: Summary generation, response suggestions, risk flagging

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { action, complaint, companyName } = await req.json()
    
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    let result = {}

    switch (action) {
      case 'generate_summary':
        result = await generateSummary(complaint, openaiApiKey)
        break
      
      case 'suggest_response':
        result = await suggestResponse(complaint, companyName, openaiApiKey)
        break
      
      case 'flag_risk':
        result = await flagRisk(complaint, openaiApiKey)
        break
      
      default:
        throw new Error(`Unknown action: ${action}`)
    }

    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})

async function generateSummary(complaint: any, apiKey: string) {
  const prompt = `Analyze this customer complaint and generate a concise, professional summary (max 2-3 sentences):

Title: ${complaint.title}
Description: ${complaint.description}
Category: ${complaint.category}
Sentiment: ${complaint.sentiment}

Provide a neutral, factual summary that captures the key issue and desired outcome.`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional customer service analyst. Generate concise, neutral summaries of customer complaints.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 150
    })
  })

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.error?.message || 'OpenAI API error')
  }

  return {
    summary: data.choices[0].message.content.trim()
  }
}

async function suggestResponse(complaint: any, companyName: string, apiKey: string) {
  const prompt = `You are a professional customer service representative for ${companyName}. 

A customer has filed this complaint:
Title: ${complaint.title}
Description: ${complaint.description}
Category: ${complaint.category}
Desired Solution: ${complaint.desired_solution || 'Not specified'}

Generate a professional, empathetic response that:
1. Acknowledges the issue and apologizes sincerely
2. Shows understanding of their frustration
3. Explains what steps will be taken to resolve it
4. Provides a realistic timeline
5. Offers appropriate compensation if warranted
6. Maintains a professional, caring tone

Keep the response between 150-250 words.`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert customer service professional who writes empathetic, solution-oriented responses to customer complaints.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 400
    })
  })

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.error?.message || 'OpenAI API error')
  }

  return {
    suggested_response: data.choices[0].message.content.trim()
  }
}

async function flagRisk(complaint: any, apiKey: string) {
  const prompt = `Analyze this customer complaint for risk factors and severity:

Title: ${complaint.title}
Description: ${complaint.description}
Category: ${complaint.category}
Sentiment: ${complaint.sentiment}

Evaluate:
1. Severity level (low, medium, high, critical)
2. Potential legal risk (yes/no)
3. Potential PR risk (yes/no)
4. Urgency level (low, medium, high, urgent)
5. Key risk factors (list)

Respond in JSON format:
{
  "severity": "low|medium|high|critical",
  "legal_risk": true|false,
  "pr_risk": true|false,
  "urgency": "low|medium|high|urgent",
  "risk_factors": ["factor1", "factor2"],
  "recommended_action": "brief recommendation"
}`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a risk assessment expert analyzing customer complaints. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 300,
      response_format: { type: "json_object" }
    })
  })

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.error?.message || 'OpenAI API error')
  }

  const riskAnalysis = JSON.parse(data.choices[0].message.content)
  
  return riskAnalysis
}
