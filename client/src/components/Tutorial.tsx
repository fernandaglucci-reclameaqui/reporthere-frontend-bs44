import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Step {
  title: string;
  content: string;
  target?: string; // CSS selector for highlighting
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const steps: Step[] = [
  {
    title: "Welcome to ReportHere!",
    content: "We're here to help you make better decisions and resolve issues. Let's take a quick tour.",
    position: 'center'
  },
  {
    title: "Search First",
    content: "Before you buy, search for a company to see their reputation score and read real reviews.",
    target: 'input[type="text"]', // Targeting search bar
    position: 'bottom'
  },
  {
    title: "Check the Score",
    content: "Our Reputation Score (0-10) tells you instantly if a company is trustworthy.",
    position: 'center'
  },
  {
    title: "File a Complaint",
    content: "If something goes wrong, file a complaint. We'll notify the company immediately.",
    target: 'button:contains("File a Complaint")',
    position: 'bottom'
  },
  {
    title: "Get Resolved",
    content: "Track your complaint status in your dashboard until it's resolved.",
    position: 'center'
  }
];

const Tutorial = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Check if user has seen tutorial
  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenTutorial');
    if (!hasSeen) {
      // Small delay to not overwhelm user immediately
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenTutorial', 'true');
  };

  if (!isOpen) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-green-600 p-6 text-white relative">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
          <div className="flex gap-1 mt-4">
            {steps.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full flex-1 transition-colors ${idx <= currentStep ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {step.content}
          </p>

          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={handlePrev} 
              disabled={currentStep === 0}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            
            <Button 
              onClick={handleNext}
              className="bg-green-600 hover:bg-green-700 text-white px-8 rounded-full"
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
              {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
