import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { HeroButtons } from './HeroButtons';

interface HeroSlideBackgroundProps {
  tagline?: string;
  heading: string;
  body?: any[]; // Portable Text block content
  contentPosition?: 'left' | 'center' | 'right';
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
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
  stats?: Array<{
    value: string;
    label: string;
  }>;
  badgeTitle?: string;
  badgeSubtitle?: string;
}

export function HeroSlideBackground({
  tagline,
  heading,
  body,
  contentPosition = 'left',
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  image,
  stats,
  badgeTitle,
  badgeSubtitle,
}: HeroSlideBackgroundProps) {
  const imageUrl = image?.asset?.url;
  const imageAlt = image?.alt || heading;

  // Determine positioning classes based on contentPosition
  const getContainerClasses = () => {
    switch (contentPosition) {
      case 'center':
        return 'flex justify-center items-center';
      case 'right':
        return 'flex justify-end items-center';
      case 'left':
      default:
        return 'flex justify-start items-center';
    }
  };

  const getContentClasses = () => {
    switch (contentPosition) {
      case 'center':
        return 'max-w-3xl text-center';
      case 'right':
        return 'max-w-2xl';
      case 'left':
      default:
        return 'max-w-2xl';
    }
  };

  return (
    <div className="relative w-full h-full min-h-[70vh] lg:min-h-full">
      {/* Background Image */}
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            fetchPriority="high"
          />
          {/* Subtle overlay for better contrast with light content box */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-cyan-900/10" />
        </div>
      )}

      {/* Content */}
      <div className={`container mx-auto px-6 py-6 lg:py-20 relative z-10 h-full ${getContainerClasses()}`}>
        <div className={getContentClasses()}>
          {/* Beautiful gradient background box for text content */}
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-blue-100/50 overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/50 to-cyan-50/50 pointer-events-none" />
            
            {/* Content with relative positioning to stay above gradient */}
            <div className="relative z-10">
              {tagline && (
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <Sparkles className="w-4 h-4" />
                  <span>{tagline}</span>
                </div>
              )}

              {heading && (
                <h1 className="mb-6 text-3xl font-bold text-gray-700 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                  {heading}
                </h1>
              )}

              {body && body.length > 0 && (
                <div className="text-gray-700 mb-8 text-lg animate-fade-in-up prose prose-gray" style={{ animationDelay: '600ms' }}>
                  <PortableText 
                    value={body}
                    components={{
                      marks: {
                        link: ({value, children}) => {
                          const href = value?.href || '#';
                          return (
                            <a href={href} className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">
                              {children}
                            </a>
                          );
                        },
                      },
                    }}
                  />
                </div>
              )}

              {(primaryCtaLabel || secondaryCtaLabel) && (
                <div className={contentPosition === 'center' ? 'flex justify-center' : ''}>
                  <HeroButtons 
                    primaryLabel={primaryCtaLabel}
                    primaryHref={primaryCtaHref}
                    secondaryLabel={secondaryCtaLabel}
                    secondaryHref={secondaryCtaHref}
                  />
                </div>
              )}

              {/* Stats */}
              {stats && stats.length > 0 && (
                <div className="hidden lg:grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-blue-200 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div className="text-blue-600 mb-1 text-2xl font-semibold">{stat.value}</div>
                      <div className="text-gray-600 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Badge - outside the main content box */}
          {(badgeTitle || badgeSubtitle) && (
            <div className={contentPosition === 'center' ? 'flex justify-center mt-8' : 'mt-8'}>
              <div className="inline-block bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-blue-100/50 animate-scale-in" style={{ animationDelay: '1200ms' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
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
                  </div>
                  <div>
                    {badgeTitle && <div className="text-gray-900 font-semibold">{badgeTitle}</div>}
                    {badgeSubtitle && <div className="text-sm text-gray-600">{badgeSubtitle}</div>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

