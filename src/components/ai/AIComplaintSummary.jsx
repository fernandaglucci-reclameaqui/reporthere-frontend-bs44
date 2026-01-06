import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Loader2, FileText } from 'lucide-react';
import { AIService } from '@/services/aiService';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AIComplaintSummary({ complaint, autoGenerate = false }) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (autoGenerate && !summary) {
      generateSummary();
    }
  }, [autoGenerate]);

  const generateSummary = async () => {
    setLoading(true);
    setError(null);
    setShowSummary(true);

    try {
      const generatedSummary = await AIService.generateComplaintSummary(complaint);
      setSummary(generatedSummary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!showSummary && !autoGenerate) {
    return (
      <Button
        onClick={generateSummary}
        variant="outline"
        size="sm"
        className="border-purple-300 text-purple-700 hover:bg-purple-50"
      >
        <Sparkles className="w-3 h-3 mr-2" />
        Generate AI Summary
      </Button>
    );
  }

  return (
    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            {loading ? (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            ) : (
              <FileText className="w-4 h-4 text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-semibold text-purple-900">AI Summary</h4>
              <Sparkles className="w-3 h-3 text-purple-600" />
            </div>
            {loading ? (
              <div className="space-y-2">
                <div className="h-3 bg-purple-200 rounded animate-pulse w-full"></div>
                <div className="h-3 bg-purple-200 rounded animate-pulse w-5/6"></div>
              </div>
            ) : error ? (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            ) : summary ? (
              <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
