'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowRight, Search, Shapes } from 'lucide-react';

const tourSteps = [
  {
    title: 'Welcome to GameScape!',
    description: "Let's take a quick tour to see how you can find your next favorite game.",
    icon: Shapes,
  },
  {
    title: 'Filter by Category',
    description: 'Use the category buttons to browse games by genre. These categories are intelligently assigned by AI!',
    icon: Shapes,
    highlightId: 'filters',
  },
  {
    title: 'Smart Search',
    description: "Can't find what you're looking for? Use the search bar. Our AI-powered search can find games even with partial or misspelled names.",
    icon: Search,
    highlightId: 'filters',
  },
];

export function WelcomeTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const tourShown = localStorage.getItem('gameScapeTourShown');
    if (!tourShown) {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (step < tourSteps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    localStorage.setItem('gameScapeTourShown', 'true');
    setIsOpen(false);
  };

  const currentStep = tourSteps[step];
  const Icon = currentStep.icon;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-6 w-6 text-primary" />
            {currentStep.title}
          </DialogTitle>
          <DialogDescription>
            {currentStep.description}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-center text-muted-foreground">
            Step {step + 1} of {tourSteps.length}
          </p>
        </div>
        <DialogFooter>
          <Button onClick={handleNext}>
            {step < tourSteps.length - 1 ? 'Next' : 'Finish'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
