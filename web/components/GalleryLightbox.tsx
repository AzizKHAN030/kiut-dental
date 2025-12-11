'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1684607632313-ededff0c700e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc2NTIxMzM0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Initial Consultation',
    description: 'Comprehensive examination and treatment planning',
  },
  {
    url: 'https://images.unsplash.com/photo-1600721187850-c944924fd48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjB4cmF5JTIwc2NhbnxlbnwxfHx8fDE3NjUyMTMzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Digital Diagnostics',
    description: '3D scans and X-rays for precise treatment',
  },
  {
    url: 'https://images.unsplash.com/photo-1588776814601-a454a8e3a940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjB0cmVhdG1lbnQlMjBwcm9jZWR1cmV8ZW58MXx8fHwxNzY1MjEzMzUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Treatment Process',
    description: 'Expert care with modern technology',
  },
  {
    url: 'https://images.unsplash.com/photo-1643216503879-b2c604ce6cf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBpbXBsYW50JTIwc3VyZ2VyeXxlbnwxfHx8fDE3NjUyMTMzNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Advanced Procedures',
    description: 'Implant surgery with precision tools',
  },
  {
    url: 'https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZW50YWwlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY1MTg3OTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Modern Equipment',
    description: 'State-of-the-art dental technology',
  },
  {
    url: 'https://images.unsplash.com/photo-1630438994394-3deff7a591bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjBzbWlsZXxlbnwxfHx8fDE3NjUxMzQxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Happy Results',
    description: 'Satisfied patients with beautiful smiles',
  },
];

export function GalleryLightbox() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  if (selectedImage === null) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={() => setSelectedImage(null)}
    >
      {/* Close button */}
      <button
        onClick={() => setSelectedImage(null)}
        className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Previous button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        className="absolute left-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image */}
      <div
        className="max-w-5xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <ImageWithFallback
          src={galleryImages[selectedImage].url}
          alt={galleryImages[selectedImage].title}
          className="w-full h-full object-contain rounded-lg"
        />
        <div className="text-center mt-6">
          <h3 className="text-white mb-2">{galleryImages[selectedImage].title}</h3>
          <p className="text-white/70">{galleryImages[selectedImage].description}</p>
          <p className="text-white/50 text-sm mt-2">
            {selectedImage + 1} / {galleryImages.length}
          </p>
        </div>
      </div>
    </div>
  );
}

