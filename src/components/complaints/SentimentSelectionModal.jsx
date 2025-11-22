import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SENTIMENT_TYPES, SENTIMENT_CONFIG } from '@/constants/sentiment';
import { updateComplaintSentiment } from '@/services/reputationMetricsService';
import { toast } from 'sonner';

/**
 * SentimentSelectionModal Component
 * Shows 5 sentiment faces for user to select how they felt after the interaction
 * 
 * @param {boolean} isOpen - Whether the modal is open
 * @param {function} onClose - Callback when modal closes
 * @param {string} complaintId - ID of the complaint
 * @param {function} onSentimentSelected - Optional callback after sentiment is saved
 */
export default function SentimentSelectionModal({ 
  isOpen, 
  onClose, 
  complaintId,
  onSentimentSelected 
}) {
  const [selectedSentiment, setSelectedSentiment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSentimentClick = (sentimentType) => {
    setSelectedSentiment(sentimentType);
  };

  const handleSubmit = async () => {
    if (!selectedSentiment) {
      toast.error('Please select how you felt about this interaction');
      return;
    }

    setIsSubmitting(true);

    try {
      await updateComplaintSentiment(complaintId, selectedSentiment);
      
      toast.success('Thank you for your feedback!');
      
      if (onSentimentSelected) {
        onSentimentSelected(selectedSentiment);
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving sentiment:', error);
      toast.error('Failed to save your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            How Did You Feel?
          </DialogTitle>
          <DialogDescription className="text-center text-base mt-2">
            Your feedback helps others understand what to expect.<br />
            This represents how you <em>felt</em> — not a judgment on the business.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-5 gap-4 my-6">
          {Object.values(SENTIMENT_TYPES).map((sentimentType) => {
            const config = SENTIMENT_CONFIG[sentimentType];
            const isSelected = selectedSentiment === sentimentType;

            return (
              <button
                key={sentimentType}
                onClick={() => handleSentimentClick(sentimentType)}
                className={`
                  flex flex-col items-center p-4 rounded-lg border-2 transition-all
                  hover:scale-105 hover:shadow-md
                  ${isSelected 
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="w-16 h-16 mb-2">
                  <img 
                    src={config.icon} 
                    alt={config.label}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-xs font-medium text-center text-gray-700">
                  {config.label}
                </div>
              </button>
            );
          })}
        </div>

        {selectedSentiment && (
          <div className="text-center text-sm text-gray-600 mb-4">
            <strong>{SENTIMENT_CONFIG[selectedSentiment].label}</strong>
            <br />
            {SENTIMENT_CONFIG[selectedSentiment].description}
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={handleSkip}
            disabled={isSubmitting}
          >
            Skip for Now
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedSentiment || isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isSubmitting ? 'Saving...' : 'Submit Feedback'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
