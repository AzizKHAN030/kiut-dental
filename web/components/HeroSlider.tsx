'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

interface HeroSliderProps {
  slides: HeroSlide[];
  autoplay?: boolean;
  autoplayInterval?: number;
}

export function HeroSlider({ slides, autoplay = false, autoplayInterval = 5 }: HeroSliderProps) {
  // Setup autoplay plugin - only if autoplay is enabled
  const options = { loop: true };
  const plugins = autoplay ? [
    Autoplay({
      delay: autoplayInterval * 1000,
      stopOnInteraction: false, // Don't stop on interaction, just reset
      stopOnMouseEnter: false, // Don't stop on hover
      stopOnLastSnap: false,
    })
  ] : [];
  
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      // Reset autoplay timer after user interaction
      const autoplayPlugin = emblaApi.plugins()?.autoplay;
      if (autoplayPlugin) {
        autoplayPlugin.reset();
      }
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      // Reset autoplay timer after user interaction
      const autoplayPlugin = emblaApi.plugins()?.autoplay;
      if (autoplayPlugin) {
        autoplayPlugin.reset();
      }
    }
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
      // Reset autoplay timer after user interaction
      const autoplayPlugin = emblaApi.plugins()?.autoplay;
      if (autoplayPlugin) {
        autoplayPlugin.reset();
      }
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const renderSlide = (slide: HeroSlide, index: number) => {
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

    switch (slide._type) {
      case 'heroSlideImageLeft':
        return <HeroSlideImageLeft key={index} {...slideProps} />;
      case 'heroSlideImageRight':
        return <HeroSlideImageRight key={index} {...slideProps} />;
      case 'heroSlideBackground':
        return <HeroSlideBackground key={index} {...slideProps} />;
      case 'heroSlideImageBanner':
        return <HeroSlideImageBanner key={index} {...slideProps} />;
      default:
        return <HeroSlideImageRight key={index} {...slideProps} />;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Embla Container */}
      <div className="w-full relative z-10" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              {renderSlide(slide, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <>
          {/* Arrow Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/40 hover:bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-50 hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/40 hover:bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-50 hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-blue-600'
                    : 'w-3 h-3 bg-gray-400 hover:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

