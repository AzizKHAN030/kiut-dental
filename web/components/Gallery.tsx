import { GalleryGrid } from './GalleryGrid';
import { GalleryLightbox } from './GalleryLightbox';

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

interface GalleryProps {
  data?: GalleryData | null;
}

export function Gallery({ data }: GalleryProps) {
  return (
    <>
      <GalleryGrid data={data} />
      <GalleryLightbox images={data?.images} />
    </>
  );
}
