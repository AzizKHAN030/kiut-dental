import Image from 'next/image';

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

export function GalleryGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="mb-4">Our Dental Care Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a look at our modern facilities and the professional care we provide to every patient
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow-lg aspect-[4/3] gallery-item animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
              data-gallery-index={index}
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white mb-1 font-semibold">{image.title}</h3>
                  <p className="text-white/80 text-sm">{image.description}</p>
                </div>
              </div>

              {/* Number badge */}
              <div className="absolute top-4 left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg font-semibold">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

