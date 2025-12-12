'use client';

import { ArrowRight } from 'lucide-react';

interface HeroButtonsProps {
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function HeroButtons({ 
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref
}: HeroButtonsProps) {
  const handlePrimaryClick = () => {
    if (!primaryHref) return;
    
    if (primaryHref.startsWith('#')) {
      const section = document.querySelector(primaryHref);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = primaryHref;
    }
  };

  const handleSecondaryClick = () => {
    if (!secondaryHref) return;
    
    if (secondaryHref.startsWith('#')) {
      const section = document.querySelector(secondaryHref);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    } else {
      window.location.href = secondaryHref;
    }
  };

  // Don't render anything if no buttons have labels
  if (!primaryLabel && !secondaryLabel) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
      {primaryLabel && (
      <button
          onClick={handlePrimaryClick}
        className="bg-blue-600 text-white px-8 py-4 rounded-full flex items-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300 hover:scale-105 active:scale-95"
      >
          {primaryLabel}
        <ArrowRight className="w-5 h-5" />
      </button>
      )}

      {secondaryLabel && (
      <button
          onClick={handleSecondaryClick}
        className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-gray-400 transition-all duration-300 hover:scale-105 active:scale-95"
      >
          {secondaryLabel}
      </button>
      )}
    </div>
  );
}

