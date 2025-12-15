import Image from 'next/image';
import { HeroButtons } from './HeroButtons';

interface HeroSlideImageBannerProps {
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
  overlay?: 'none' | 'light' | 'medium' | 'dark';
  contentPosition?: 'top' | 'center' | 'bottom';
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export function HeroSlideImageBanner({
  image,
  overlay = 'none',
  contentPosition = 'center',
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: HeroSlideImageBannerProps) {
  const imageUrl = image?.asset?.url;
  const imageAlt = image?.alt || 'Hero banner';

  // Determine overlay opacity based on overlay setting
  const getOverlayClasses = () => {
    switch (overlay) {
      case 'light':
        return 'bg-black/10';
      case 'medium':
        return 'bg-black/30';
      case 'dark':
        return 'bg-black/50';
      case 'none':
      default:
        return '';
    }
  };

  // Determine content position classes
  const getContentPositionClasses = () => {
    switch (contentPosition) {
      case 'top':
        return 'items-start pt-32';
      case 'bottom':
        return 'items-end pb-32';
      case 'center':
      default:
        return 'items-center';
    }
  };

  return (
    <div className="relative w-full h-full min-h-[70vh] lg:min-h-full">
      {/* Banner Image */}
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
          {/* Overlay */}
          {overlay !== 'none' && (
            <div className={`absolute inset-0 ${getOverlayClasses()}`} />
          )}
        </div>
      )}

      {/* CTA Buttons */}
      {(primaryCtaLabel || secondaryCtaLabel) && (
        <div className={`container mx-auto px-6 py-6 lg:py-20 relative z-10 flex justify-center ${getContentPositionClasses()} h-full`}>
          <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <HeroButtons 
              primaryLabel={primaryCtaLabel}
              primaryHref={primaryCtaHref}
              secondaryLabel={secondaryCtaLabel}
              secondaryHref={secondaryCtaHref}
            />
          </div>
        </div>
      )}
    </div>
  );
}

