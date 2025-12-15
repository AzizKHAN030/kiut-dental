import { CTAForm } from './CTAForm';
import { getTreatments } from '@/lib/sanity';
import { Phone, Mail, MessageCircle, Send, Facebook, MapPin } from 'lucide-react';

interface Treatment {
  _id: string;
  name: string;
  slug?: {
    current: string;
  };
}

interface FooterData {
  title?: string;
  subtitle?: string;
  phone?: {
    number?: string;
    href?: string;
    show?: boolean;
  };
  email?: {
    address?: string;
    show?: boolean;
  };
  whatsapp?: {
    number?: string;
    href?: string;
    show?: boolean;
  };
  telegram?: {
    username?: string;
    href?: string;
    show?: boolean;
  };
  facebook?: {
    url?: string;
    show?: boolean;
  };
  address?: {
    text?: string;
    show?: boolean;
  };
  googleMaps?: {
    show?: boolean;
    iframeCode?: string;
  };
}

interface CTAProps {
  footerData?: FooterData | null;
}

export async function CTA({ footerData }: CTAProps) {
  const treatments = await getTreatments();

  // Extract iframe src from the embed code
  const getMapsIframeSrc = () => {
    if (!footerData?.googleMaps?.iframeCode) return null;
    
    // Extract src attribute from iframe code
    const srcMatch = footerData.googleMaps.iframeCode.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      return srcMatch[1];
    }
    
    // If no src found, try to extract from full iframe tag
    const iframeMatch = footerData.googleMaps.iframeCode.match(/<iframe[^>]+src=["']([^"']+)["']/);
    if (iframeMatch && iframeMatch[1]) {
      return iframeMatch[1];
    }
    
    return null;
  };

  const mapsSrc = getMapsIframeSrc();

  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left content - Map and Contact Info */}
          <div className="animate-fade-in-left space-y-8">
            {/* Title and Subtitle */}
            {(footerData?.title || footerData?.subtitle) && (
              <div>
                {footerData.title && (
                  <h2 className="mb-4 text-white text-3xl font-bold">
                    {footerData.title}
                  </h2>
                )}
                {footerData.subtitle && (
                  <p className="text-blue-100 text-lg">
                    {footerData.subtitle}
                  </p>
                )}
              </div>
            )}

            {/* Contact Information */}
            <div className="space-y-4">
              {/* Phone */}
              {footerData?.phone?.show && footerData.phone?.number && (
                <a
                  href={footerData.phone.href || `tel:${footerData.phone.number.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-100">Call us</div>
                    <div className="text-lg font-semibold">{footerData.phone.number}</div>
                  </div>
                </a>
              )}

              {/* Email */}
              {footerData?.email?.show && footerData.email?.address && (
                <a
                  href={`mailto:${footerData.email.address}`}
                  className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-100">Email us</div>
                    <div className="text-lg font-semibold">{footerData.email.address}</div>
                  </div>
                </a>
              )}

              {/* WhatsApp */}
              {footerData?.whatsapp?.show && footerData.whatsapp?.number && (
                <a
                  href={footerData.whatsapp.href || `https://wa.me/${footerData.whatsapp.number.replace(/\s/g, '').replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-100">WhatsApp</div>
                    <div className="text-lg font-semibold">{footerData.whatsapp.number}</div>
                  </div>
                </a>
              )}

              {/* Telegram */}
              {footerData?.telegram?.show && footerData.telegram?.username && (
                <a
                  href={footerData.telegram.href || `https://t.me/${footerData.telegram.username.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-100">Telegram</div>
                    <div className="text-lg font-semibold">{footerData.telegram.username}</div>
                  </div>
                </a>
              )}

              {/* Facebook */}
              {footerData?.facebook?.show && footerData.facebook?.url && (
                <a
                  href={footerData.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-100">Facebook</div>
                    <div className="text-lg font-semibold">Facebook</div>
                  </div>
                </a>
              )}

              {/* Address */}
              {footerData?.address?.show && footerData.address?.text && (
                <div className="flex items-start gap-3 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-100 mb-1">Address</div>
                    <div className="text-lg font-semibold whitespace-pre-line">{footerData.address.text}</div>
                  </div>
                </div>
              )}

                          {/* Google Maps */}
            {footerData?.googleMaps?.show && footerData.googleMaps.iframeCode && (
              <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
                {mapsSrc ? (
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={mapsSrc}
                    title="Location Map"
                  />
                ) : (
                  <div className="w-full h-full bg-white/10 flex items-center justify-center">
                    <p className="text-white/70">Invalid iframe code. Please check your Google Maps embed code.</p>
                  </div>
                )}
              </div>
            )}
            </div>
          </div>

          {/* Right content - Contact Form */}
          <div className="animate-fade-in-right">
            <CTAForm treatments={treatments} />
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/70 text-sm">
          <p>&copy; {new Date().getFullYear()} {footerData?.title || 'KIUT Dental'}. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
