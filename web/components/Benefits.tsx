import Image from 'next/image';

interface FeatureCard {
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
  badge?: string;
}

interface BenefitsData {
  _type: string;
  title?: string;
  subtitle?: string;
  items?: FeatureCard[];
}

interface BenefitsProps {
  data?: BenefitsData | null;
}

export function Benefits({ data }: BenefitsProps) {
  // Return null if no data
  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  const { title, subtitle, items } = data;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
        <div className="text-center mb-16 animate-fade-in-up">
            {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
            {subtitle && (
              <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
        </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const bgColor = item.iconBgColor?.hex || '#3B82F6';
            
            return (
            <div
                key={`${item.title}-${index}`}
              className="relative group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                        {item.badge}
                      </span>
                    </div>
                  )}

                {/* Icon */}
                  {item.icon?.asset?.url && (
                <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 relative overflow-hidden"
                      style={{ backgroundColor: bgColor }}
                >
                      <Image
                        src={item.icon.asset.url}
                        alt={item.icon.alt || item.title || 'Feature icon'}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                </div>
                  )}

                  <h3 className="mb-3">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-600">{item.description}</p>
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
      </div>
    </section>
  );
}
