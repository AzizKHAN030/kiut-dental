'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface GalleryImage {
  image: {
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
}

interface GalleryLightboxProps {
  images?: GalleryImage[];
}

export function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Return null if no images
  if (!images || images.length === 0) return null;

  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const galleryItem = target.closest('.gallery-item');
      if (galleryItem) {
        const index = galleryItem.getAttribute('data-gallery-index');
        if (index !== null) {
          setSelectedImage(parseInt(index, 10));
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const handlePrevious = () => {
    if (selectedImage !== null && images) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null && images) {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  if (selectedImage === null || !images[selectedImage]) return null;

  const currentImage = images[selectedImage];
  const imageUrl = currentImage.image?.asset?.url;

  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
      onClick={() => setSelectedImage(null)}
    >
      {/* Close button */}
      <button
        onClick={() => setSelectedImage(null)}
        className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="absolute left-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-5xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[70vh]">
          <Image
            src={imageUrl}
            alt={currentImage.image.alt || currentImage.title || 'Gallery image'}
            fill
            className="object-contain rounded-lg"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>
        <div className="text-center mt-6">
          <h3 className="text-white text-2xl mb-2 font-semibold">{currentImage.title}</h3>
          {currentImage.description && (
            <p className="text-white/70 text-lg">{currentImage.description}</p>
          )}
          <p className="text-white/50 text-sm mt-4">
            {selectedImage + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}

