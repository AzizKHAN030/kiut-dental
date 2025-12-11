'use client';

import { ArrowRight } from 'lucide-react';

export function HeroButtons() {
  const handleGetConsultation = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewTreatments = () => {
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
      <button
        onClick={handleGetConsultation}
        className="bg-blue-600 text-white px-8 py-4 rounded-full flex items-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        Get Free Consultation
        <ArrowRight className="w-5 h-5" />
      </button>

      <button
        onClick={handleViewTreatments}
        className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-gray-400 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        View Treatments
      </button>
    </div>
  );
}

