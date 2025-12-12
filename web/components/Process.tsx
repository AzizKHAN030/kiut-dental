import Image from 'next/image';

interface ProcessStep {
  title: string;
  description?: string;
  icon?: {
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

interface ProcessData {
  _type: string;
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
}

interface ProcessProps {
  data?: ProcessData | null;
}

export function Process({ data }: ProcessProps) {
  // Return null if no data
  if (!data || !data.steps || data.steps.length === 0) {
    return null;
  }

  const { title, subtitle, steps } = data;

  // Determine grid columns based on number of steps
  const getGridCols = () => {
    const count = steps.length;
    if (count <= 2) return 'md:grid-cols-2';
    if (count === 3) return 'md:grid-cols-3';
    if (count === 4) return 'md:grid-cols-2 lg:grid-cols-4';
    if (count === 5) return 'md:grid-cols-2 lg:grid-cols-5';
    return 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Animated background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl animate-pulse-slow" />

      <div className="container mx-auto px-6 relative z-10">
        {(title || subtitle) && (
          <div className="text-center mb-16 animate-fade-in-up">
            {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
            {subtitle && (
              <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        <div className={`grid ${getGridCols()} gap-8 relative`}>
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200" />

          {steps.map((step, index) => {
            // Generate step number with leading zero
            const stepNumber = String(index + 1).padStart(2, '0');
            
            return (
              <div
                key={`${step.title}-${index}`}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-center">
                  {/* Number badge */}
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl mb-6 relative z-10 shadow-lg animate-scale-in" 
                    style={{ animationDelay: `${index * 150 + 300}ms` }}
                  >
                    <span className="text-xl font-semibold">{stepNumber}</span>
                  </div>

                  {/* Icon */}
                  {step.icon?.asset?.url && (
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-4 transition-transform duration-300 hover:rotate-12 hover:scale-110">
                      <Image
                        src={step.icon.asset.url}
                        alt={step.icon.alt || step.title || 'Step icon'}
                        width={28}
                        height={28}
                        className="object-contain text-blue-600"
                      />
                    </div>
                  )}

                  <h3 className="mb-2">{step.title}</h3>
                  {step.description && (
                    <p className="text-gray-600">{step.description}</p>
                  )}
                </div>

                {/* Animated arrow (except for last item) */}
                {index < steps.length - 1 && (
                  <div 
                    className="hidden lg:block absolute top-1/4 -right-4 transform -translate-y-1/2 animate-fade-in-right" 
                    style={{ animationDelay: `${index * 150 + 500}ms` }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
