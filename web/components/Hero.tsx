import { HeroSlider } from './HeroSlider';
import { HeroSlideImageRight } from './HeroSlideImageRight';
import { HeroSlideImageLeft } from './HeroSlideImageLeft';
import { HeroSlideBackground } from './HeroSlideBackground';
import { HeroSlideImageBanner } from './HeroSlideImageBanner';

interface HeroSlide {
  _type: string;
  tagline?: string;
  heading: string;
  body?: any[]; // Portable Text block content
  contentPosition?: 'left' | 'center' | 'right' | 'top' | 'bottom';
  overlay?: 'none' | 'light' | 'medium' | 'dark';
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

interface HeroData {
  displayMode?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  slides?: HeroSlide[];
}

interface HeroProps {
  data?: HeroData | null;
}

export function Hero({ data }: HeroProps) {
  // Only render if we have data from Sanity
  if (!data || !data.slides || data.slides.length === 0) {
    return null;
  }

  const { displayMode, autoplay, autoplayInterval, slides } = data;

  // If slider mode, use the HeroSlider component
  if (displayMode === 'slider' && slides.length > 1) {
    return <HeroSlider slides={slides} autoplay={autoplay} autoplayInterval={autoplayInterval} />;
  }

  // Single mode - render just the first slide
  const slide = slides[0];

  const slideProps = {
    tagline: slide.tagline,
    heading: slide.heading,
    body: slide.body,
    contentPosition: slide.contentPosition,
    overlay: slide.overlay,
    primaryCtaLabel: slide.primaryCtaLabel,
    primaryCtaHref: slide.primaryCtaHref,
    secondaryCtaLabel: slide.secondaryCtaLabel,
    secondaryCtaHref: slide.secondaryCtaHref,
    image: slide.image,
    stats: slide.stats,
    badgeTitle: slide.badgeTitle,
    badgeSubtitle: slide.badgeSubtitle,
  };

  // Render based on slide type
  const renderSingleSlide = () => {
    switch (slide._type) {
      case 'heroSlideImageLeft':
        return <HeroSlideImageLeft {...slideProps} />;
      case 'heroSlideImageRight':
        return <HeroSlideImageRight {...slideProps} />;
      case 'heroSlideBackground':
        // Filter contentPosition to only valid values for HeroSlideBackground
        const backgroundProps = {
          ...slideProps,
          contentPosition: (slideProps.contentPosition === 'left' || 
                          slideProps.contentPosition === 'center' || 
                          slideProps.contentPosition === 'right')
            ? slideProps.contentPosition
            : 'left' as 'left' | 'center' | 'right',
        };
        return <HeroSlideBackground {...backgroundProps} />;
      case 'heroSlideImageBanner':
        // Filter contentPosition to only valid values for HeroSlideImageBanner
        const bannerProps = {
          ...slideProps,
          contentPosition: (slideProps.contentPosition === 'top' || 
                          slideProps.contentPosition === 'center' || 
                          slideProps.contentPosition === 'bottom')
            ? slideProps.contentPosition
            : 'center' as 'top' | 'center' | 'bottom',
        };
        return <HeroSlideImageBanner {...bannerProps} />;
      default:
        return <HeroSlideImageRight {...slideProps} />;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {renderSingleSlide()}
    </section>
  );
}
