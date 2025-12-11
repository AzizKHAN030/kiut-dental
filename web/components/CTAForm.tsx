'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Mail, Phone, User, MapPin, MessageSquare, X } from 'lucide-react';

const countries = [
  'United States',
  'United Kingdom',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Canada',
  'Australia',
  'Netherlands',
  'Switzerland',
  'Austria',
  'Belgium',
  'Sweden',
  'Norway',
  'Denmark',
  'Other',
];

const treatments = [
  { value: 'implants', label: 'Dental Implants' },
  { value: 'veneers', label: 'Veneers' },
  { value: 'whitening', label: 'Teeth Whitening' },
  { value: 'crown', label: 'Dental Crown' },
  { value: 'root-canal', label: 'Root Canal' },
  { value: 'full-reconstruction', label: 'Full Mouth Reconstruction' },
  { value: 'other', label: 'Other' },
];

export function CTAForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    treatments: [] as string[],
    message: '',
  });

  const [isTreatmentDropdownOpen, setIsTreatmentDropdownOpen] = useState(false);
  const treatmentDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (treatmentDropdownRef.current && !treatmentDropdownRef.current.contains(event.target as Node)) {
        setIsTreatmentDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTreatmentToggle = (treatmentValue: string) => {
    setFormData(prev => {
      const isSelected = prev.treatments.includes(treatmentValue);
      return {
        ...prev,
        treatments: isSelected
          ? prev.treatments.filter(t => t !== treatmentValue)
          : [...prev.treatments, treatmentValue],
      };
    });
  };

  const handleRemoveTreatment = (treatmentValue: string) => {
    setFormData(prev => ({
      ...prev,
      treatments: prev.treatments.filter(t => t !== treatmentValue),
    }));
  };

  const getTreatmentLabel = (value: string) => {
    return treatments.find(t => t.value === value)?.label || value;
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <h3 className="text-gray-900 mb-6 text-2xl font-bold">Get Your Free Consultation</h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="John Smith"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none bg-white"
            >
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Treatment Interest - Multi-select with Chips */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Treatment of Interest
          </label>
          
          {/* Selected Chips */}
          {formData.treatments.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.treatments.map((treatment) => (
                <div
                  key={treatment}
                  className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  <span>{getTreatmentLabel(treatment)}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTreatment(treatment)}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                    aria-label={`Remove ${getTreatmentLabel(treatment)}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Dropdown */}
          <div className="relative" ref={treatmentDropdownRef}>
            <button
              type="button"
              onClick={() => setIsTreatmentDropdownOpen(!isTreatmentDropdownOpen)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors"
            >
              <span className={formData.treatments.length === 0 ? 'text-gray-500' : 'text-gray-900'}>
                {formData.treatments.length === 0
                  ? 'Select treatments (optional)'
                  : `${formData.treatments.length} treatment${formData.treatments.length > 1 ? 's' : ''} selected`}
              </span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${isTreatmentDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isTreatmentDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto">
                {treatments.map((treatment) => {
                  const isSelected = formData.treatments.includes(treatment.value);
                  return (
                    <button
                      key={treatment.value}
                      type="button"
                      onClick={() => handleTreatmentToggle(treatment.value)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                        isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                      }`}
                    >
                      <span>{treatment.label}</span>
                      {isSelected && (
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Information
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-none"
              placeholder="Tell us about your dental needs..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 font-semibold"
        >
          Send Request
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-xs text-gray-500 text-center">
          We'll respond within 24 hours with a personalized treatment plan and quote
        </p>
      </form>
    </div>
  );
}

