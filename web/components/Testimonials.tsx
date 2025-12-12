import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  country: string;
  treatment?: {
    _id: string;
    name: string;
    slug?: {
      current: string;
    };
  };
  rating: number;
  text: string;
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

interface TestimonialsData {
  _type: string;
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

interface TestimonialsProps {
  data?: TestimonialsData | null;
}

export function Testimonials({ data }: TestimonialsProps) {
  // Return null if no data
  if (!data || !data.testimonials || data.testimonials.length === 0) {
    return null;
  }

  const { title, subtitle, testimonials } = data;
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50/30">
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
          <div className="text-center mb-16 animate-fade-in-up">
            {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
            {subtitle && (
              <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const hasImage = testimonial.image?.asset?.url;
            
            return (
              <div
                key={`${testimonial.name}-${index}`}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative animate-fade-in-up hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-blue-100 animate-rotate-slow">
                  <Quote className="w-12 h-12" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  {hasImage ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.image!.asset!.url}
                        alt={testimonial.image!.alt || testimonial.name || 'Patient photo'}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="text-gray-900 font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.country}</div>
                  </div>
                </div>

                {/* Treatment badge */}
                {testimonial.treatment && (
                  <div className="absolute top-6 left-6 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    {testimonial.treatment.name}
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
