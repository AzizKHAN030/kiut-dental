import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { HeroButtons } from './HeroButtons';

interface HeroSlideImageLeftProps {
  tagline?: string;
  heading: string;
  body?: any[]; // Portable Text block content
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

export function HeroSlideImageLeft({
  tagline,
  heading,
  body,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  image,
  stats,
  badgeTitle,
  badgeSubtitle,
}: HeroSlideImageLeftProps) {
  const imageUrl = image?.asset?.url;
  const imageAlt = image?.alt || heading;

  return (
    <div className="container mx-auto px-6 py-6 lg:py-20 relative z-10 h-full flex items-center">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
        {/* Left content - Image with animated elements */}
        {imageUrl && (
          <div className="relative animate-fade-in-left">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-102 aspect-[4/3] lg:aspect-[4/5] lg:h-[600px]">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                fetchPriority="high"
              />
            </div>

            {/* Floating badge */}
            {(badgeTitle || badgeSubtitle) && (
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 animate-scale-in" style={{ animationDelay: '1200ms' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
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
                    {badgeSubtitle && <div className="text-sm text-gray-500">{badgeSubtitle}</div>}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Right content */}
        <div className="animate-fade-in-right">
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
            <div className="text-gray-600 mb-8 max-w-lg animate-fade-in-up prose prose-gray" style={{ animationDelay: '600ms' }}>
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
            <HeroButtons 
              primaryLabel={primaryCtaLabel}
              primaryHref={primaryCtaHref}
              secondaryLabel={secondaryCtaLabel}
              secondaryHref={secondaryCtaHref}
            />
          )}

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="hidden lg:grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
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
    </div>
  );
}

