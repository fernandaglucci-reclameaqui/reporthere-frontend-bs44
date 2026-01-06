import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2, Copy, Check } from 'lucide-react';
import { AIService } from '@/services/aiService';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AIResponseWriter({ complaint, companyName, onUseResponse }) {
  const [loading, setLoading] = useState(false);
  const [suggestedResponse, setSuggestedResponse] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateResponse = async () => {
    setLoading(true);
    setError(null);
    setSuggestedResponse('');

    try {
      const response = await AIService.suggestResponse(complaint, companyName);
      setSuggestedResponse(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(suggestedResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const useResponse = () => {
    if (onUseResponse) {
      onUseResponse(suggestedResponse);
    }
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-900">
          <Sparkles className="w-5 h-5" />
          AI Response Writer
        </CardTitle>
        <CardDescription>
          Generate a professional, empathetic response using AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!suggestedResponse && !loading && (
          <Button
            onClick={generateResponse}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Response...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Response
              </>
            )}
          </Button>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {suggestedResponse && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <p className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                {suggestedResponse}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={useResponse}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Use This Response
              </Button>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="border-purple-300"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                onClick={generateResponse}
                variant="outline"
                className="border-purple-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              💡 Tip: You can edit the AI-generated response before sending
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
