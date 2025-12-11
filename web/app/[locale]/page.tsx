import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Benefits } from '@/components/Benefits';
import { Services } from '@/components/Services';
import { PriceComparison } from '@/components/PriceComparison';
import { AdditionalServices } from '@/components/AdditionalServices';
import { Process } from '@/components/Process';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { Blog } from '@/components/Blog';
import { CTA } from '@/components/CTA';
import { FloatingTooth } from '@/components/FloatingTooth';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> | { locale: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams?.locale;
  
  // Validate locale
  if (!locale || !isLocale(locale)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Navbar />
      <FloatingTooth />
      <div id="home">
        <Hero />
      </div>
      <div id="benefits">
        <Benefits />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="pricing">
        <PriceComparison />
      </div>
      <AdditionalServices />
      <div id="process">
        <Process />
      </div>
      <Gallery />
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="blog">
        <Blog />
      </div>
      <div id="contact">
        <CTA />
      </div>
    </div>
  );
}
