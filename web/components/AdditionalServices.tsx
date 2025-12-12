import Image from 'next/image';

interface ServiceItem {
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
  iconBgColor?: {
    hex: string;
  };
  title: string;
  description?: string;
  included: boolean;
}

interface InfoCard {
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
  title: string;
  description?: string;
  bgColor?: {
    hex: string;
  };
}

interface AdditionalServicesData {
  _type: string;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  services?: ServiceItem[];
  infoCards?: InfoCard[];
}

interface AdditionalServicesProps {
  data?: AdditionalServicesData | null;
}

export function AdditionalServices({ data }: AdditionalServicesProps) {
  // Return null if no data
  if (!data || !data.services || data.services.length === 0) {
    return null;
  }

  const { title, subtitle, badgeText, services, infoCards } = data;
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse-slow" />

      <div className="container mx-auto px-6 relative z-10">
        {(title || subtitle || badgeText) && (
          <div className="text-center mb-16 animate-fade-in-up">
            {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
            {badgeText && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full mb-6">
                <span>{badgeText}</span>
              </div>
            )}
            {subtitle && (
              <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {services.map((service, index) => {
            const bgColor = service.iconBgColor?.hex || '#3B82F6';
            
            return (
              <div
                key={`${service.title}-${index}`}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 h-full hover:-translate-y-2 hover:scale-102">
                  {/* Icon */}
                  {service.icon?.asset?.url && (
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-12"
                      style={{ backgroundColor: bgColor }}
                    >
                      <Image
                        src={service.icon.asset.url}
                        alt={service.icon.alt || service.title || 'Service icon'}
                        width={28}
                        height={28}
                        className="object-contain brightness-0 invert"
                      />
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="mb-2 text-base">{service.title}</h3>
                  
                  {/* Description */}
                  {service.description && (
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  )}

                  {/* Badge */}
                  {service.included ? (
                    <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Included
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                      Available
                    </div>
                  )}

                  {/* Decorative gradient on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                    style={{ backgroundColor: bgColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Cards */}
        {infoCards && infoCards.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {infoCards.map((card, index) => {
              const bgColor = card.bgColor?.hex || '#2563EB';
              const animationClass = index === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right';
              
              return (
                <div 
                  key={`${card.title}-${index}`}
                  className={`rounded-2xl p-8 text-white shadow-xl ${animationClass}`}
                  style={{ 
                    background: `linear-gradient(to bottom right, ${bgColor}, ${bgColor}DD)`,
                    animationDelay: '600ms' 
                  }}
                >
                  <div className="flex items-start gap-4">
                    {card.icon?.asset?.url && (
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Image
                          src={card.icon.asset.url}
                          alt={card.icon.alt || card.title || 'Info icon'}
                          width={24}
                          height={24}
                          className="object-contain brightness-0 invert"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="mb-2 text-white">{card.title}</h3>
                      {card.description && (
                        <p className="text-white/90 text-sm">{card.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
