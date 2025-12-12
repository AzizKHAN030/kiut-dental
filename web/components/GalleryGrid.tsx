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

interface GalleryData {
  _type: string;
  title?: string;
  subtitle?: string;
  images?: GalleryImage[];
}

interface GalleryGridProps {
  data?: GalleryData | null;
}

export function GalleryGrid({ data }: GalleryGridProps) {
  // Return null if no data
  if (!data || !data.images || data.images.length === 0) {
    return null;
  }

  const { title, subtitle, images } = data;
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
          <div className="text-center mb-16 animate-fade-in-up">
            {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
            {subtitle && (
              <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item, index) => {
            const imageUrl = item.image?.asset?.url;
            
            if (!imageUrl) return null;

            return (
              <div
                key={`${item.title}-${index}`}
                className="relative group overflow-hidden rounded-2xl shadow-lg aspect-[4/3] gallery-item animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                data-gallery-index={index}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title} in lightbox`}
              >
                <Image
                  src={imageUrl}
                  alt={item.image.alt || item.title || 'Gallery image'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white mb-1 font-semibold">{item.title}</h3>
                    {item.description && (
                      <p className="text-white/80 text-sm">{item.description}</p>
                    )}
                  </div>
                  
                  {/* Click indicator */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg 
                        className="w-8 h-8 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Number badge */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg font-semibold transition-transform duration-300 group-hover:scale-110">
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

