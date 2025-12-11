import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';

export function CTAContent() {
  return (
    <div className="animate-fade-in-left">
      <h2 className="mb-6 text-white text-3xl font-bold">
        Ready for Your Dream Smile?
      </h2>

      <p className="text-blue-100 mb-8 text-lg">
        Get a free consultation and personalized treatment plan. Our team is ready to help you save money while getting the smile you deserve.
      </p>

      {/* Contact info */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm text-blue-100">Call us</div>
            <div className="text-lg font-semibold">+998 71 123 4567</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm text-blue-100">Email us</div>
            <div className="text-lg font-semibold">info@uzdental.com</div>
          </div>
        </div>
      </div>

      {/* Image for mobile */}
      <div className="lg:hidden mb-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
          <Image
            src="https://images.unsplash.com/photo-1677156811762-842312963ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1emJla2lzdGFuJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NTIxMjYyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Uzbekistan"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
}

