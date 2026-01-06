import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Shield, TrendingUp, Clock, Loader2 } from 'lucide-react';
import { AIService } from '@/services/aiService';

export default function AIRiskFlag({ complaint, autoAnalyze = false }) {
  const [loading, setLoading] = useState(false);
  const [riskAnalysis, setRiskAnalysis] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (autoAnalyze && !riskAnalysis) {
      analyzeRisk();
    }
  }, [autoAnalyze]);

  const analyzeRisk = async () => {
    setLoading(true);
    setError(null);

    try {
      const analysis = await AIService.analyzeRisk(complaint);
      setRiskAnalysis(analysis);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!autoAnalyze && !riskAnalysis) {
    return null;
  }

  if (loading) {
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
            <span className="text-sm text-orange-900">Analyzing risk factors...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription className="text-xs">{error}</AlertDescription>
      </Alert>
    );
  }

  if (!riskAnalysis) {
    return null;
  }

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 border-red-300 text-red-900';
      case 'high':
        return 'bg-orange-100 border-orange-300 text-orange-900';
      case 'medium':
        return 'bg-yellow-100 border-yellow-300 text-yellow-900';
      case 'low':
        return 'bg-green-100 border-green-300 text-green-900';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-900';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'medium':
        return <TrendingUp className="w-4 h-4" />;
      case 'low':
        return <Shield className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <Card className={`border-2 ${getSeverityColor(riskAnalysis.severity)}`}>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getSeverityIcon(riskAnalysis.severity)}
              <h4 className="font-semibold text-sm">AI Risk Assessment</h4>
            </div>
            <Badge variant="outline" className="capitalize">
              {riskAnalysis.severity} Severity
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              <span>Legal Risk: {riskAnalysis.legal_risk ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>PR Risk: {riskAnalysis.pr_risk ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex items-center gap-1 col-span-2">
              <Clock className="w-3 h-3" />
              <span>Urgency: <span className="capitalize font-medium">{riskAnalysis.urgency}</span></span>
            </div>
          </div>

          {riskAnalysis.risk_factors && riskAnalysis.risk_factors.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium">Risk Factors:</p>
              <ul className="text-xs space-y-1">
                {riskAnalysis.risk_factors.map((factor, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-orange-600">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {riskAnalysis.recommended_action && (
            <div className="pt-2 border-t">
              <p className="text-xs font-medium mb-1">Recommended Action:</p>
              <p className="text-xs text-gray-700">{riskAnalysis.recommended_action}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
