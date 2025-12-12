import { Clock } from 'lucide-react';
import Image from 'next/image';

interface Treatment {
  nameSource?: 'predefined' | 'custom';
  treatment?: {
    _id: string;
    name: string;
    slug?: {
      current: string;
    };
  };
  customName?: string;
  shortDescription?: string;
  startingPrice?: string;
  duration?: string;
  badge?: string;
  image?: {
    asset?: {
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
}

interface ServicesData {
  _type: string;
  title?: string;
  subtitle?: string;
  treatments?: Treatment[];
}

interface ServicesProps {
  data?: ServicesData | null;
}

export function Services({ data }: ServicesProps) {
  // Return null if no data
  if (!data || !data.treatments || data.treatments.length === 0) {
    return null;
  }

  const { title, subtitle, treatments } = data;

  // Helper function to get treatment display name
  const getTreatmentName = (treatment: Treatment): string => {
    if (treatment.nameSource === 'predefined' && treatment.treatment?.name) {
      return treatment.treatment.name;
    }
    if (treatment.nameSource === 'custom' && treatment.customName) {
      return treatment.customName;
    }
    // Fallback for backward compatibility (if nameSource is not set)
    return treatment.treatment?.name || treatment.customName || 'Unnamed treatment';
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
        <div className="text-center mb-16 animate-fade-in-up">
            {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
            {subtitle && (
              <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
        </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.map((treatment, index) => {
            const treatmentName = getTreatmentName(treatment);
            
            return (
              <div
                key={`${treatmentName}-${index}`}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group animate-fade-in-up hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Icon */}
                  {treatment.image?.asset?.url && (
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-12">
                      <Image
                        src={treatment.image.asset.url}
                        alt={treatment.image.alt || treatmentName || 'Treatment icon'}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                  </div>
                  )}

                  <h3 className="mb-2">{treatmentName}</h3>
                  {treatment.shortDescription && (
                    <p className="text-gray-600 text-sm mb-4">{treatment.shortDescription}</p>
                  )}

                  {/* Price */}
                  {treatment.startingPrice && (
                  <div className="mb-3">
                      <span className="text-blue-600 font-semibold">{treatment.startingPrice}</span>
                    </div>
                  )}

                  {/* Duration */}
                  {treatment.duration && (
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                      {treatment.duration}
                  </div>
                  )}
                </div>

                {/* Badge */}
                {treatment.badge && (
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-scale-in">
                    {treatment.badge}
                </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
